import { z } from "zod";

// NewsFeedPicture schema
const newsFeedPictureSchema = z.object({
  id: z.number().optional(),
  thumb: z.string().optional(),
  url: z.string().optional(),
  uploaded_at: z.string().optional(),
  owner: z.string().optional(),
});

export const activitySchema = z.enum([
  "HI",
  "SO",
  "BO",
  "CL",
  "SK",
  "SB",
  "SS",
]);
export const citySchema = z.object({
  name: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
});
// Create event schema (all fields optional except organizer_id)
export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  start: z.string(), // Accept ISO datetime strings
  meeting_point: z.string(),
  city: citySchema.optional(),
  activity: activitySchema,
  activity_name: z.string().optional(),
  // NO organizer_id, it is set by the backend!
  route_id: z.number().int().positive(),
  cover_picture_url: z
    .string()
    .optional()
    .refine((val) => !val || val === "" || z.url().safeParse(val).success, {
      message: "Must be a valid URL or empty string",
    }),
  pictures_uploaded: z.array(newsFeedPictureSchema).optional(),
  num_of_days: z.number().int().nonnegative().optional(),
  max_participants: z.number().int().positive().optional(),
});

// Update event schema (all fields optional)
export const updateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  start: z.string().optional(), // Accept ISO datetime strings
  meeting_point: z.string().optional(),
  city: citySchema.optional(),
  activity: activitySchema.optional(),
  activity_name: z.string().optional(),
  organizer_id: z.number().int().positive().optional(),
  route_id: z.number().int().positive().optional(),
  cover_picture_url: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || z.string().url().safeParse(val).success,
      { message: "Must be a valid URL or empty string" }
    ),
  pictures_uploaded: z.array(newsFeedPictureSchema).optional(),
  num_of_days: z.number().int().nonnegative().optional(),
  max_participants: z.number().int().positive().optional(),
});

// Type exports for TypeScript
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type Activity = z.infer<typeof activitySchema>;
