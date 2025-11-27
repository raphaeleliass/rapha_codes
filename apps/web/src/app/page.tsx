import Footer from "@/components/layout/Footer";
import Posts from "@/components/layout/Posts";
import { serverUrl } from "@/constants";

export default async function Page() {
	const res = await fetch(`${serverUrl}/public/posts`, {
		next: { revalidate: 120, tags: ["public-posts"] },
	});

	const posts = await res.json();

	return (
		<main>
			<Posts posts={posts} />

			<Footer />
		</main>
	);
}
