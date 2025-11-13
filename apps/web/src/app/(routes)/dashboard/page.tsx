import { Suspense } from "react";
import Dashboard from "@/components/layout/dashboard/Dashboard";
import LoadingPage from "@/components/ui/loadingPage";

export default async function Page() {
	return (
		<Suspense fallback={<LoadingPage />}>
			<Dashboard />
		</Suspense>
	);
}
