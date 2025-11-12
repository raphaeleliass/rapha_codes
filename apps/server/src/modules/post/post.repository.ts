import { and, desc, eq, sql } from "drizzle-orm";
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

	getPublicPost = async (id: GetPostType) => {
		const [selectedPost] = await this.db
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
			.where(and(eq(post.id, id.id), eq(post.draft, false)));

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
			.where(eq(post.draft, false))
			.orderBy(desc(post.createdAt));

		return posts;
	};

	getPrivatePost = async (id: GetPostType) => {
		const [selectedPost] = await this.db
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
			.where(eq(post.id, id.id));

		return selectedPost;
	};

	getAllPrivatePosts = async () => {
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
			.orderBy(desc(post.createdAt));

		return posts;
	};
}
