import { HTTPException } from "hono/http-exception";
import type { PostRepository } from "./post.repository";
import type {
	CreatePostType,
	DeletePostType,
	GetPostType,
	UpdatePostType,
} from "./post.types";

export class PostService {
	postRepository: PostRepository;

	constructor(postRepository: PostRepository) {
		this.postRepository = postRepository;
	}

	createPost = async (userId: string, postValues: CreatePostType) => {
		if (!userId)
			throw new HTTPException(400, { message: "Missing userId field" });

		const post = await this.postRepository.createPost(userId, postValues);
		return post;
	};

	updatePost = async (userId: string, postValues: UpdatePostType) => {
		if (!userId)
			throw new HTTPException(400, { message: "Missing userId field" });

		const post = await this.postRepository.updatePost(userId, postValues);

		if (!post) throw new HTTPException(404, { message: "Post not found" });

		return post;
	};

	deletePost = async (userId: string, postValues: DeletePostType) => {
		if (!userId)
			throw new HTTPException(400, { message: "Missing userId field" });

		const post = await this.postRepository.deletePost(userId, postValues);

		if (!post) throw new HTTPException(404, { message: "Post not found" });

		return post;
	};

	getPost = async (postValues: GetPostType) => {
		return await this.postRepository.getPost(postValues);
	};

	getAllPosts = async () => {
		return await this.postRepository.getAllPosts();
	};
}
