import Editor from "@/components/editor/editor";
import { serverUrl } from "@/constants";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const res = await fetch(`${serverUrl}/public/post?id=${slug}`, {
		next: { revalidate: 120, tags: ["post"] },
	});

	const post = await res.json();

	if (!post) return;

	return <Editor content={post.content} post={post} />;
}
