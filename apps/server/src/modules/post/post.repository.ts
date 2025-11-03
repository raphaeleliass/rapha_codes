import { desc, eq, sql } from "drizzle-orm";
import type { DrizzleDB } from "@/db";
import { post } from "@/db/schema/post";
import type {
	CreatePostType,
	DeletePostType,
	GetPostType,
	UpdatePostType,
} from "./post.types";

export class PostRepository {
	db: DrizzleDB;

	constructor(db: DrizzleDB) {
		this.db = db;
	}

	createPost = async (userId: string, postData: CreatePostType) => {
		const [newPost] = await this.db
			.insert(post)
			.values({ userId: userId, ...postData })
			.returning();

		return newPost;
	};

	updatePost = async (userId: string, postData: UpdatePostType) => {
		const [updatedPost] = await this.db
			.update(post)
			.set({
				title: postData.title,
				content: postData.content,
				draft: postData.draft,
			})
			.where(sql`id = ${postData.id} AND user_id = ${userId}`)
			.returning();

		return updatedPost;
	};

	deletePost = async (userId: string, id: DeletePostType) => {
		const [deletedPost] = await this.db
			.delete(post)
			.where(sql`id = ${id.id} and user_id = ${userId}`)
			.returning();

		return deletedPost;
	};

	getPost = async (id: GetPostType) => {
		const [selectedPost] = await this.db
			.select()
			.from(post)
			.where(eq(post.id, id.id));

		return selectedPost;
	};

	getAllPosts = async () => {
		const posts = await this.db
			.select({
				id: post.id,
				authorImg: post.authorImg,
				author: post.author,
				title: post.title,
				content: post.content,
				draft: post.draft,
				createdAt: post.createdAt,
				updatedAt: post.updatedAt,
			})
			.from(post)
			.where(eq(post.author, "Raphael Elias"))
			.orderBy(desc(post.createdAt));

		return posts;
	};
}
