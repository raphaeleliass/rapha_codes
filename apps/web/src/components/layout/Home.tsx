import { Loader } from "lucide-react";
import { Suspense } from "react";
import GetPosts from "@/app/actions/fetchAllPosts";
import Posts from "./Posts";

const PostsLoader = async () => {
	const postsData = await GetPosts({ revalidate: 60 });

	return <Posts posts={postsData} />;
};

export default function Home() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-dvh flex-col items-center justify-center">
					<Loader className="animate-spin" />
				</div>
			}
		>
			<PostsLoader />
		</Suspense>
	);
}
