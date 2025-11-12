import { cacheLife } from "next/cache";
import { Suspense } from "react";
import Dashboard from "@/components/layout/dashboard/Dashboard";
import LoadingPage from "@/components/ui/loadingPage";

export default async function Page() {
	"use cache";

	cacheLife("minutes");

	return (
		<Suspense fallback={<LoadingPage />}>
			<Dashboard />
		</Suspense>
	);
}
