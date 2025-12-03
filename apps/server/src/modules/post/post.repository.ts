import { and, desc, eq, sql } from "drizzle-orm";
import type { DrizzleDB } from "@/db";
import { post } from "@/db/schema/post";
import type {
	TypeCreatePost,
	TypeDeletePost,
	TypeGetPost,
	TypeUpdatePost,
} from "./post.types";

const returningPost = {
	id: post.id,
	authorImg: post.authorImg,
	author: post.author,
	title: post.title,
	content: post.content,
	draft: post.draft,
	createdAt: post.createdAt,
	updatedAt: post.updatedAt,
};

export class PostRepository {
	db: DrizzleDB;

	constructor(db: DrizzleDB) {
		this.db = db;
	}

	createPost = async (postData: TypeCreatePost) => {
		const [newPost] = await this.db
			.insert(post)
			.values({ ...postData })
			.returning(returningPost);

		return newPost;
	};

	updatePost = async (userId: string, postData: TypeUpdatePost) => {
		const [updatedPost] = await this.db
			.update(post)
			.set({
				title: postData.title,
				content: postData.content,
				draft: postData.draft,
			})
			.where(sql`id = ${postData.id} AND user_id = ${userId}`)
			.returning(returningPost);

		return updatedPost;
	};

	deletePost = async (userId: string, id: TypeDeletePost) => {
		const [deletedPost] = await this.db
			.delete(post)
			.where(sql`id = ${id.id} and user_id = ${userId}`)
			.returning(returningPost);

		return deletedPost;
	};

	getPublicPost = async (id: TypeGetPost) => {
		const [selectedPost] = await this.db
			.select(returningPost)
			.from(post)
			.where(and(eq(post.id, id.id), eq(post.draft, false)));

		return selectedPost;
	};

	getAllPublicPosts = async () => {
		const posts = await this.db
			.select(returningPost)
			.from(post)
			.where(eq(post.draft, false))
			.orderBy(desc(post.createdAt));

		return posts;
	};

	getPost = async (id: TypeGetPost) => {
		const [selectedPost] = await this.db
			.select(returningPost)
			.from(post)
			.where(eq(post.id, id.id));

		return selectedPost;
	};

	getAllPosts = async () => {
		const posts = await this.db
			.select(returningPost)
			.from(post)
			.orderBy(desc(post.createdAt));

		return posts;
	};
}
