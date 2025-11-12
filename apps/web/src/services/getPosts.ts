import { serverUrl } from "@/constants";
import type { PostType } from "@/store/usePostStore";

export async function fetchPublicPost(postId: string) {
	const response = await fetch(`${serverUrl}/public/post/${postId}`, {
		next: { revalidate: 60, tags: ["public-post"] },
	});

	const data = await response.json();

	return data;
}

export async function fetchPublicPosts() {
	const response = await fetch(`${serverUrl}/public/all-posts`, {
		next: { revalidate: 60, tags: ["public-posts"] },
	});

	const data = await response.json();

	return data;
}

export async function fetchPrivatePost(postId: string): Promise<PostType> {
	const response = await fetch(`${serverUrl}/posts/post/${postId}`, {
		credentials: "include",
		next: {
			revalidate: 60,
			tags: ["private-post"],
		},
	});

	const data = await response.json();

	return data;
}

export async function fetchPrivatePosts() {
	const response = await fetch(`${serverUrl}/posts/all-private-posts`, {
		credentials: "include",
		next: {
			revalidate: 60,
			tags: ["private-posts"],
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch private posts: ${response.statusText}`);
	}
	return response.json();
}
