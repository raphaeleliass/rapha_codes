import { Suspense } from "react";
import Editor from "@/components/editor/editor";
import LoadingPage from "@/components/ui/loadingPage";
import { fetchPublicPost } from "@/services/getPosts";

async function PostPage({
	paramsPromise,
}: {
	paramsPromise: Promise<{ slug: string }>;
}) {
	const { slug } = await paramsPromise;
	const post = await fetchPublicPost(slug);
	return <Editor content={post.content} post={post} />;
}

export default function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	return (
		<Suspense fallback={<LoadingPage />}>
			<PostPage paramsPromise={params} />
		</Suspense>
	);
}
