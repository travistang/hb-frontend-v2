import { NextRequest, NextResponse } from "next/server";
import routeServiceProvider from "@/services/route-service";

// GET /api/routes/[id] - Get a single route
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const route = await routeServiceProvider.getOne(Number(id));

    if (!route) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    }

    return NextResponse.json(route);
  } catch (error) {
    console.error("Error fetching route:", error);
    return NextResponse.json(
      { error: "Failed to fetch route" },
      { status: 500 }
    );
  }
}

// PUT /api/routes/[id] - Update a route
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    // Basic validation for route update
    if (body.name !== undefined && typeof body.name !== "string") {
      return NextResponse.json(
        { error: "Name must be a string" },
        { status: 400 }
      );
    }

    if (body.distance !== undefined && typeof body.distance !== "number") {
      return NextResponse.json(
        { error: "Distance must be a number" },
        { status: 400 }
      );
    }

    if (
      body.elevationGain !== undefined &&
      typeof body.elevationGain !== "number"
    ) {
      return NextResponse.json(
        { error: "Elevation gain must be a number" },
        { status: 400 }
      );
    }

    if (body.duration !== undefined && typeof body.duration !== "number") {
      return NextResponse.json(
        { error: "Duration must be a number" },
        { status: 400 }
      );
    }

    if (body.sacScale !== undefined) {
      if (
        typeof body.sacScale !== "number" ||
        body.sacScale < 0 ||
        body.sacScale > 6
      ) {
        return NextResponse.json(
          { error: "SAC scale must be a number between 0 and 6" },
          { status: 400 }
        );
      }
    }

    const route = await routeServiceProvider.update(Number(id), body);
    return NextResponse.json(route);
  } catch (error) {
    console.error("Error updating route:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update route" },
      { status: 500 }
    );
  }
}

// DELETE /api/routes/[id] - Delete a route
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const routeId = parseInt(id, 10);

    if (isNaN(routeId)) {
      return NextResponse.json({ error: "Invalid route ID" }, { status: 400 });
    }

    await routeServiceProvider.delete(routeId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting route:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete route" },
      { status: 500 }
    );
  }
}
