import Editor from "@/components/editor/editor";
import { serverUrl } from "@/constants";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const res = await fetch(`${serverUrl}/public/post/${slug}`, {
		next: { revalidate: 60 },
	});

	const post = await res.json();

	return <Editor content={post.content} post={post} />;
}
