import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    date: z.coerce.date().transform(d => d.toISOString().split('T')[0]),
    author: z.string(),
    status: z.enum(['publish', 'draft', 'archived']),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { posts };