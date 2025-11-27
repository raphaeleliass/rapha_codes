import type { Context } from "hono";
import type { HonoVariables } from "@/types/HonoVariables";
import type { PostService } from "./post.service";

export class PostController {
	postService: PostService;

	constructor(postService: PostService) {
		this.postService = postService;
	}

	createPost = async (c: Context<HonoVariables>) => {
		const userId = c.get("userId");
		const body = await c.req.json();

		if (!userId) return c.json({ message: "Missing userId header" });

		const post = await this.postService.createPost(userId, body);

		return c.json(post, 200);
	};

	updatePost = async (c: Context<HonoVariables>) => {
		const userId = c.get("userId");
		const body = await c.req.json();

		if (!userId) return c.json({ message: "Missing userId header" }, 400);

		const post = await this.postService.updatePost(userId, body);

		return c.json(post, 200);
	};

	deletePost = async (c: Context<HonoVariables>) => {
		const userId = c.get("userId");
		const id = c.req.query("id");

		if (!userId) return c.json({ message: "Missing userId header" }, 400);
		if (!id) return c.json({ message: "Missing id query" }, 400);

		const post = await this.postService.deletePost(userId, { id });

		if (!post) return c.json({ message: "Post not found" }, 404);

		return c.json(post, 200);
	};

	getPublicPost = async (c: Context<HonoVariables>) => {
		const id = c.req.query("id");

		if (!id) return c.json(null, 404);

		const post = await this.postService.getPublicPost({ id });
		if (!post) return c.json(null, 404);

		return c.json(post, 200);
	};

	getAllPublicPosts = async (c: Context<HonoVariables>) => {
		const post = await this.postService.getAllPublicPosts();

		return c.json(post, 200);
	};

	getPost = async (c: Context<HonoVariables>) => {
		const id = c.req.query("id");

		if (!id) return c.json({ message: "Missing id param" }, 400);

		const post = await this.postService.getPost({ id });

		if (!post) return c.json({ message: "Post not found" }, 404);

		return c.json(post, 200);
	};

	getAllPosts = async (c: Context<HonoVariables>) => {
		const post = await this.postService.getAllPosts();

		return c.json(post, 200);
	};
}
