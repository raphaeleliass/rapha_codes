import { cacheLife } from "next/cache";
import { Suspense, use } from "react";
import Editor from "@/components/editor/editor";
import LoadingPage from "@/components/ui/loadingPage";
import { serverUrl } from "@/constants";

async function fetchPost(slug: string) {
	const res = await fetch(`${serverUrl}/public/post?id=${slug}`, {
		next: { revalidate: 120, tags: ["post"] },
	});

	const post = await res.json();

	return post;
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = use(params);

	const post = await fetchPost(slug);

	return (
		<Suspense fallback={<LoadingPage />}>
			<Editor content={post.content} post={post} />
		</Suspense>
	);
}
