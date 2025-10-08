import { Loader } from "lucide-react";
import { Suspense } from "react";
import GetPosts from "@/actions/fetchAllPosts";
import type { PostType } from "@/store/usePostStore";
import Posts from "./Posts";

const PostsLoader = async () => {
	return <Posts />;
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
