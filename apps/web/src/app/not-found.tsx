import { House } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	async function backToHome() {
		"use server";
		redirect("/");
	}

	return (
		<div className="flex h-dvh flex-col place-content-center items-center justify-center justify-items-center overflow-hidden">
			<div className="flex max-w-xs flex-col items-center justify-center gap-4 text-center">
				<h1 className="bg-gradient-to-b from-foreground/20 to-foreground/50 bg-clip-text font-bold font-sans text-9xl text-transparent">
					404
				</h1>
				<p className="text-muted-foreground">Parece que você está perdido</p>
				<p className="text-muted-foreground text-xs">Volte para o inicio</p>

				<form action={backToHome}>
					<Button type="submit" size={"icon"} variant={"outline"}>
						<House />
					</Button>
				</form>
			</div>
		</div>
	);
}
