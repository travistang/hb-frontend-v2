import { NextRequest, NextResponse } from "next/server";
import routeServiceProvider from "@/services/route-service";
import { RouteSearchQuery, SACScale } from "@/services/route-service/types";
import { routeSearchQuerySchema } from "@/services/route-service/validator";

// GET /api/routes - Search routes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // Parse query parameters
    const queryParams: Record<string, unknown> = {};

    if (searchParams.has("name")) {
      queryParams.name = searchParams.get("name");
    }
    if (searchParams.has("minDistance")) {
      queryParams.minDistance = parseFloat(searchParams.get("minDistance")!);
    }
    if (searchParams.has("maxDistance")) {
      queryParams.maxDistance = parseFloat(searchParams.get("maxDistance")!);
    }
    if (searchParams.has("minElevationGain")) {
      queryParams.minElevationGain = parseFloat(
        searchParams.get("minElevationGain")!
      );
    }
    if (searchParams.has("maxElevationGain")) {
      queryParams.maxElevationGain = parseFloat(
        searchParams.get("maxElevationGain")!
      );
    }
    if (searchParams.has("minDurationHours")) {
      queryParams.minDurationHours = parseInt(
        searchParams.get("minDurationHours")!,
        10
      );
    }
    if (searchParams.has("maxDurationHours")) {
      queryParams.maxDurationHours = parseInt(
        searchParams.get("maxDurationHours")!,
        10
      );
    }
    if (searchParams.has("difficulties")) {
      queryParams.difficulties = searchParams
        .get("difficulties")
        ?.split(",")
        .map(Number) as SACScale[];
    }

    // Parse bounding box if all four coordinates are provided
    if (
      searchParams.has("minLat") &&
      searchParams.has("maxLat") &&
      searchParams.has("minLng") &&
      searchParams.has("maxLng")
    ) {
      queryParams.boundingBox = {
        minLat: parseFloat(searchParams.get("minLat")!),
        maxLat: parseFloat(searchParams.get("maxLat")!),
        minLng: parseFloat(searchParams.get("minLng")!),
        maxLng: parseFloat(searchParams.get("maxLng")!),
      };
    }

    if (searchParams.has("sortBy")) {
      queryParams.sortBy = searchParams.get("sortBy");
    }
    if (searchParams.has("sortOrder")) {
      queryParams.sortOrder = searchParams.get("sortOrder");
    }

    // Validate query parameters
    const validationResult = routeSearchQuerySchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Bad Request",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const searchQuery = validationResult.data;

    const results = await routeServiceProvider.search(searchQuery);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error searching routes:", error);
    return NextResponse.json(
      { error: "Failed to search routes" },
      { status: 500 }
    );
  }
}

// POST /api/routes - Create a new route (multipart form)
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type");

    if (!contentType?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    // Validate required fields
    const name = formData.get("name");
    const description = formData.get("description");
    const gpxFile = formData.get("gpx");

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (
      !description ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return NextResponse.json(
        { error: "Description is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!gpxFile || !(gpxFile instanceof Blob)) {
      return NextResponse.json(
        { error: "GPX file is required" },
        { status: 400 }
      );
    }

    // Validate GPX file type
    if (gpxFile instanceof File) {
      const fileName = gpxFile.name.toLowerCase();
      if (!fileName.endsWith(".gpx")) {
        return NextResponse.json(
          { error: "GPX file must have .gpx extension" },
          { status: 400 }
        );
      }
    }

    // Collect image files
    const images: { name: string; file: Blob }[] = [];
    const imageEntries = formData.getAll("images");
    for (const entry of imageEntries) {
      if (entry instanceof File) {
        // Validate image file type
        const validImageTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!validImageTypes.includes(entry.type)) {
          return NextResponse.json(
            {
              error: `Invalid image type: ${entry.type}. Allowed types: jpeg, png, gif, webp`,
            },
            { status: 400 }
          );
        }
        images.push({ name: entry.name, file: entry });
      }
    }

    // For the mock service, we create a basic route
    // In a real implementation, the GPX would be parsed to extract waypoints, etc.
    const newRoute = await routeServiceProvider.create({
      id: 0, // Will be assigned by the service
      name: name.trim(),
      distance: 0, // Would be calculated from GPX
      elevationGain: 0, // Would be calculated from GPX
      rating: 0,
      duration: 0, // Would be calculated from GPX
      sacScale: 0,
      images: images.map((img) => ({
        url: URL.createObjectURL(img.file),
        filename: img.name,
      })),
    });

    return NextResponse.json(newRoute, { status: 201 });
  } catch (error) {
    console.error("Error creating route:", error);
    return NextResponse.json(
      { error: "Failed to create route" },
      { status: 500 }
    );
  }
}
