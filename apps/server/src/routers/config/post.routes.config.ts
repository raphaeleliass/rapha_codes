import { createRoute, z } from "@hono/zod-openapi";
import {
	createPostSchema,
	deletePostSchema,
	getPostSchema,
	postSchema,
	updatePostSchema,
} from "@/modules/post/post.schema";

export const createPostRoute = createRoute({
	method: "post",
	path: "/post/create",
	tags: ["Posts"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: createPostSchema,
				},
			},
			description: "Create a new post",
			required: true,
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: postSchema,
				},
			},
			description: "Retrieve created post",
		},
		400: {
			description: "Bad request",
		},
		401: {
			description: "Unauthorized",
		},
	},
});

export const updatePostRoute = createRoute({
	method: "patch",
	path: "/post/update",
	tags: ["Posts"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: updatePostSchema,
				},
			},
			description: "Update an existing post",
			required: true,
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: postSchema,
				},
			},
			description: "Retrieve updated post",
		},
		400: {
			description: "Bad request",
		},
		401: {
			description: "Unauthorized",
		},
	},
});

export const deletePostRoute = createRoute({
	method: "delete",
	path: "/post/delete",
	tags: ["Posts"],
	request: {
		query: deletePostSchema,
	},
	responses: {
		200: {
			description: "Retrieve deleted post",
			content: {
				"application/json": {
					schema: postSchema,
				},
			},
		},
		400: {
			description: "Bad request",
		},
		401: {
			description: "Unauthorized",
		},
	},
});

export const getPostRoute = createRoute({
	method: "get",
	path: "/post",
	tags: ["Posts"],
	request: {
		query: getPostSchema,
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: postSchema,
				},
			},
			description: "Retrieve a post",
		},
		400: {
			description: "Bad request",
		},
		401: {
			description: "Unauthorized",
		},
	},
});

export const getAllPostsRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["Posts"],
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.array(postSchema),
				},
			},
			description: "Retrieve all private posts",
		},
		401: {
			description: "Unauthorized",
		},
	},
});

export const getPublicPostRoute = createRoute({
	method: "get",
	path: "/post",
	tags: ["Public Posts"],
	request: {
		query: getPostSchema,
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: postSchema,
				},
			},
			description: "Retrieve a public post",
		},
		400: {
			description: "Bad request",
		},
		404: {
			description: "Post not found",
		},
	},
});

export const getAllPublicPostRoute = createRoute({
	method: "get",
	path: "/posts",
	tags: ["Public Posts"],
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.array(postSchema),
				},
			},
			description: "Retrieve a public post",
		},
		400: {
			description: "Bad request",
		},
		404: {
			description: "Post not found",
		},
	},
});
