import { afterEach } from "node:test";
import { describe, expect, it, vi } from "vitest";
import type { DrizzleDB } from "@/db";
import { PostRepository } from "@/modules/post/post.repository";
import { PostService } from "@/modules/post/post.service";
import { samplePost, samplePosts, sampleUserId } from "./data";
import { mockDB } from "./mocks/db.mock";

describe("PostService", () => {
	const postRepository = new PostRepository(mockDB as unknown as DrizzleDB);
	const postService = new PostService(postRepository);

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should create a post", async () => {
		const spy = vi
			.spyOn(postRepository, "createPost")
			.mockResolvedValue(samplePost);
		const post = await postService.createPost(sampleUserId.userId, samplePost);

		expect(spy).toHaveBeenCalledWith(sampleUserId.userId, samplePost);

		expect(post).toEqual(samplePost);
	});

	it("should update a post", async () => {
		const spy = vi
			.spyOn(postRepository, "updatePost")
			.mockResolvedValue(samplePost);
		const post = await postService.updatePost(sampleUserId.userId, samplePost);

		expect(spy).toHaveBeenCalledWith(sampleUserId.userId, samplePost);
		expect(post).toEqual(samplePost);
	});

	it("should delete a post", async () => {
		const spy = vi
			.spyOn(postRepository, "deletePost")
			.mockResolvedValue(samplePost);
		const post = await postService.deletePost(sampleUserId.userId, {
			id: samplePost.id,
		});

		expect(spy).toHaveBeenCalledWith(sampleUserId.userId, {
			id: samplePost.id,
		});
		expect(post).toEqual(samplePost);
	});

	it("should get a post", async () => {
		const spy = vi
			.spyOn(postRepository, "getPost")
			.mockResolvedValue(samplePost);
		const post = await postService.getPost({ id: samplePost.id });

		expect(spy).toHaveBeenCalledWith({ id: samplePost.id });
		expect(post).toEqual(samplePost);
	});

	it("should get all posts", async () => {
		const spy = vi
			.spyOn(postRepository, "getAllPosts")
			.mockResolvedValue(samplePosts);
		const posts = await postService.getAllPosts();

		expect(spy).toHaveBeenCalled();
		expect(posts).toEqual(samplePosts);
	});
});
