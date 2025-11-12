import { Loader2 } from "lucide-react";

export default function LoadingPage() {
	return (
		<div className="h-dvh w-full place-content-center justify-items-center">
			<Loader2 className="animate-spin" />
		</div>
	);
}
