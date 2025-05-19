import { z } from "zod";

// Definition for the "Category" object
const categorySchema = z.object({
  id: z.number().int(),
  name: z.number().optional(), // Optional as per schema
  color: z.string()
});

// Definition for the "Tag" object
const tagSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  type: z.string()
});

// Definition for the "Pet" object
const petSchema = z.object({
  id: z.string().optional(), // Optional as per schema
  age: z.number().int(),
  category: categorySchema.optional(), // Optional as per schema
  name: z.number(), // Defined as integer in the schema
  photoUrls: z.array(z.string()).min(2), // Minimum of 2 items
  tags: z.array(tagSchema).min(1).optional(), // Optional as per schema, min 1 item.
  status: z.enum(["available", "sold"]) // Specified as enum
});

// Zod schema for the array response of GET `/pet/findByStatus` (status: 200)
export default z.array(petSchema);
