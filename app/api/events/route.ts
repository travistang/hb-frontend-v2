import { NextRequest, NextResponse } from "next/server";
import eventServiceProvider from "@/services/event-service";
import { createEventSchema } from "@/services/event-service/validator";

// GET /api/events - Get all events
export async function GET() {
  try {
    const events = await eventServiceProvider.getEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = createEventSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Bad Request",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const event = await eventServiceProvider.createEvent(validationResult.data);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
