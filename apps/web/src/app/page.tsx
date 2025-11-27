import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import Footer from "@/components/layout/Footer";
import Posts from "@/components/layout/Posts";
import LoadingPage from "@/components/ui/loadingPage";
import { serverUrl } from "@/constants";

async function fetchPublicPosts() {
	const res = await fetch(`${serverUrl}/public/posts`, {
		next: { revalidate: 120, tags: ["public-posts"] },
	}).then((res) => res.json());

	return res;
}

export default async function Page() {
	const posts = await fetchPublicPosts();
	return (
		<main>
			<Suspense fallback={<LoadingPage />}>
				<Posts posts={posts} />
			</Suspense>

			<Suspense>
				<Footer />
			</Suspense>
		</main>
	);
}
