import { serverUrl } from "@/constants";

export default async function FetchAllPosts({
	revalidate,
}: {
	revalidate: number;
}) {
	const response = await fetch(`${serverUrl}/public/all-posts`, {
		next: { revalidate, tags: ["posts"] },
	});

	const data = await response.json();

	return data;
}
