import { NextRequest, NextResponse } from "next/server";
import eventServiceProvider from "@/services/event-service";
import { updateEventSchema } from "@/services/event-service/validator";

// GET /api/events/[id] - Get a single event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id, 10);

    if (isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    const event = await eventServiceProvider.getEvent(eventId);
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] - Update an event
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id, 10);

    if (isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    const body = await request.json();

    // Validate request body
    const validationResult = updateEventSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Bad Request",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const event = await eventServiceProvider.updateEvent(
      eventId,
      validationResult.data
    );
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] - Delete an event
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id, 10);

    if (isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    await eventServiceProvider.deleteEvent(eventId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
