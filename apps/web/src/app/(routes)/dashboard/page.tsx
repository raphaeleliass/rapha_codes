"use client";

import { Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import { usePostStore } from "@/store/usePostStore";
import { useUserStore } from "@/store/useUserStore";

export default function Page() {
	const { user } = useUserStore();
	const { posts } = usePostStore();
	const router = useRouter();

	const allPosts = posts;
	const draftPosts = posts.filter((post) => !post.draft);
	const publishedPosts = posts.filter((post) => post.draft);

	const formatDate = (data: string) => new Date(data);

	//biome-ignore lint: unnecessary verification
	useEffect(() => {
		if (!user)
			(async () => {
				const cookie = await fetch("/api/get-cookie");

				if (!cookie.ok) return router.replace("/");

				const user = await authClient.getSession();

				if (!user.data) return router.replace("/");
			})();
	}, [user]);

	const cardData = [
		{
			title: "Posts",
			content: "Posts",
			data: allPosts.length,
		},
		{
			title: "Posts publicados",
			content: "Posts publicados",
			data: draftPosts.length,
		},
		{
			title: "Posts rascunho",
			content: "Posts em rascunho",
			data: publishedPosts.length,
		},
	];

	return (
		<div className="custom-container mt-4 flex flex-col gap-12">
			<div className="flex w-full flex-row gap-2 max-sm:flex-col">
				{cardData.map(({ title, content, data }) => (
					<Card
						className="w-full transition-colors hover:bg-muted md:max-w-1/3"
						key={title}
					>
						<CardContent className="flex flex-row items-end justify-start gap-4">
							<CardTitle className="rounded-full font-normal font-sans text-4xl">
								{data}
							</CardTitle>
							<CardDescription className="font-light text-md">
								{content}
							</CardDescription>
						</CardContent>
					</Card>
				))}
			</div>

			<div>
				<Table>
					<TableCaption>Posts</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Título</TableHead>
							<TableHead>Criado em</TableHead>
							<TableHead className="text-center">Rascunho</TableHead>
							<TableHead className="text-right">Ações</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{posts
							.sort(
								(newest, oldest) =>
									formatDate(oldest.createdAt).getTime() -
									formatDate(newest.createdAt).getTime(),
							)
							.map((post) => (
								<TableRow key={post.id}>
									<TableCell className="overflow-hidden text-ellipsis max-sm:w-full max-sm:max-w-56">
										<Link
											href={`/post/${post.id}`}
											className="underline-offset-4 hover:underline"
										>
											{post.title}
										</Link>
									</TableCell>
									<TableCell>
										{formatDate(post.createdAt).toLocaleDateString("pt-BR", {
											day: "2-digit",
											month: "numeric",
											year: "2-digit",
											hour: "numeric",
											minute: "numeric",
										})}
									</TableCell>
									<TableCell className="justify-items-center">
										{post.draft === true ? (
											<X size={16} className="text-red-500" />
										) : (
											<Check size={16} className="text-green-500" />
										)}
									</TableCell>
									<TableCell className="ml-auto text-right">teste</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
