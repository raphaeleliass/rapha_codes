import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import FetchAllPosts from "@/app/actions/fetchAllPosts";
import Post from "@/components/layout/Post";
import type { PostType } from "@/store/usePostStore";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const data: PostType[] = await FetchAllPosts({
		revalidate: 60,
	});

	const post = data.find((post) => post.id === slug);

	if (!post) return notFound();

	return (
		<Suspense
			fallback={
				<p className="h-dvh place-content-center justify-items-center">
					<Loader2 className="animate-spin" />
				</p>
			}
		>
			<Post post={post} />
		</Suspense>
	);
}
