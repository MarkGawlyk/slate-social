import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			author: z.string(),
			authorImage: image(),
			heroImage: image(),
		}),
});

export const collections = { blog };
