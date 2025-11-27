import { cacheLife } from "next/cache";
import { Suspense } from "react";
import Editor from "@/components/editor/editor";
import LoadingPage from "@/components/ui/loadingPage";
import { serverUrl } from "@/constants";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	"use cache";

	cacheLife("minutes");

	const { slug } = await params;

	const res = await fetch(`${serverUrl}/public/post?id=${slug}`);

	const post = await res.json();

	return (
		<Suspense fallback={<LoadingPage />}>
			<Editor content={post.content} post={post} />
		</Suspense>
	);
}
