import { HTTPException } from "hono/http-exception";
import type { PostRepository } from "./post.repository";
import type {
	TypeCreatePost,
	TypeDeletePost,
	TypeGetPost,
	TypeUpdatePost,
} from "./post.types";

export class PostService {
	postRepository: PostRepository;

	constructor(postRepository: PostRepository) {
		this.postRepository = postRepository;
	}

	createPost = async (userId: string, postValues: TypeCreatePost) => {
		if (!userId)
			throw new HTTPException(400, { message: "Missing userId field" });

		const post = await this.postRepository.createPost(userId, postValues);
		return post;
	};

	updatePost = async (userId: string, postValues: TypeUpdatePost) => {
		if (!userId)
			throw new HTTPException(400, { message: "Missing userId field" });

		const post = await this.postRepository.updatePost(userId, postValues);

		if (!post) throw new HTTPException(404, { message: "Post not found" });

		return post;
	};

	deletePost = async (userId: string, postValues: TypeDeletePost) => {
		if (!userId)
			throw new HTTPException(400, { message: "Missing userId field" });

		const post = await this.postRepository.deletePost(userId, postValues);

		if (!post) throw new HTTPException(404, { message: "Post not found" });

		return post;
	};

	getPublicPost = async (postId: TypeGetPost) => {
		return await this.postRepository.getPublicPost(postId);
	};

	getAllPublicPosts = async () => {
		return await this.postRepository.getAllPublicPosts();
	};

	getPost = async (postId: TypeGetPost) => {
		return await this.postRepository.getPost(postId);
	};

	getAllPosts = async () => {
		return await this.postRepository.getAllPosts();
	};
}
