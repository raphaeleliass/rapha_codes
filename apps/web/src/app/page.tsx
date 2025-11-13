import { Suspense } from "react";
import Footer from "@/components/layout/Footer";
import Posts from "@/components/layout/Posts";
import LoadingPage from "@/components/ui/loadingPage";

export default async function Page() {
	return (
		<main>
			<Suspense fallback={<LoadingPage />}>
				<Posts />
			</Suspense>

			<Footer />
		</main>
	);
}
