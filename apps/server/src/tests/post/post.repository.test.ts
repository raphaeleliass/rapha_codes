import { beforeEach, describe, expect, it, vi } from "vitest";
import type { DrizzleDB } from "@/db";
import { post } from "@/db/schema/post";
import { PostRepository } from "@/modules/post/post.repository";
import { samplePost, samplePosts, sampleUserId } from "./data";
import { mockDB } from "./mocks/db.mock";

describe("PostRepository", () => {
	let postRepository: PostRepository;

	beforeEach(() => {
		postRepository = new PostRepository(mockDB as unknown as DrizzleDB);
		vi.restoreAllMocks();
	});

	it("should create a post", async () => {
		const insertSpy = vi.spyOn(mockDB, "insert").mockReturnValue({
			values: vi.fn().mockReturnValue({
				returning: vi.fn().mockResolvedValue([samplePost]),
			}),
		});

		const result = await postRepository.createPost(
			sampleUserId.userId,
			samplePost,
		);

		expect(insertSpy).toHaveBeenCalledWith(post);
		expect(result).toEqual(samplePost);
	});

	it("should update a post", async () => {
		const updateSpy = vi.spyOn(mockDB, "update").mockReturnValue({
			set: vi.fn().mockReturnValue({
				where: vi.fn().mockReturnValue({
					returning: vi.fn().mockResolvedValue([samplePost]),
				}),
			}),
		});

		const result = await postRepository.updatePost(
			sampleUserId.userId,
			samplePost,
		);

		expect(updateSpy).toHaveBeenCalledWith(post);
		expect(result).toEqual(samplePost);
	});

	it("should delete a post", async () => {
		const deleteSpy = vi.spyOn(mockDB, "delete").mockReturnValue({
			where: vi.fn().mockReturnValue({
				returning: vi.fn().mockResolvedValue([samplePost]),
			}),
		});

		const result = await postRepository.deletePost(sampleUserId.userId, {
			id: samplePost.id,
		});

		expect(deleteSpy).toHaveBeenCalledWith(post);
		expect(result).toEqual(samplePost);
	});

	it("should get a post", async () => {
		const selectSpy = vi.spyOn(mockDB, "select").mockReturnValue({
			from: vi.fn().mockReturnValue({
				where: vi.fn().mockReturnValue([samplePost]),
			}),
		});

		const result = await postRepository.getPost({ id: samplePost.id });

		expect(selectSpy).toHaveBeenCalled();
		expect(result).toEqual(samplePost);
	});

	it("should get all posts", async () => {
		const selectSpy = vi.spyOn(mockDB, "select").mockReturnValue({
			from: vi.fn().mockReturnValue({
				where: vi.fn().mockReturnValue({
					orderBy: vi.fn().mockReturnValue(samplePosts),
				}),
			}),
		});

		const result = await postRepository.getAllPosts();

		expect(selectSpy).toHaveBeenCalled();
		expect(result).toEqual(samplePosts);
	});
});
