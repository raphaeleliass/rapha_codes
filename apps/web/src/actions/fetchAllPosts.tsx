import { serverUrl } from "@/constants";

export default async function fetchAllPosts() {
	const response = await fetch(`${serverUrl}/public/all-posts`, {
		next: { revalidate: 10, tags: ["posts"] },
	});

	const data = await response.json();

	return data;
}
