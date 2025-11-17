"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import LoadingPage from "@/components/ui/loadingPage";
import { serverUrl } from "@/constants";
import type { PostType } from "@/store/usePostStore";
import { useUserStore } from "@/store/useUserStore";
import PostsTable from "./Table";

export default function Dashboard() {
	const { user, isAuthLoading } = useUserStore();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!isAuthLoading && !user) {
			return redirect("/");
		}
	}, [isAuthLoading, user]);

	const {
		data: posts = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["private-posts"],
		queryFn: async (): Promise<PostType[]> => {
			const res = await fetch(`${serverUrl}/posts/all-private-posts`, {
				credentials: "include",
			});

			if (!res.ok) throw new Error("Falha ao buscar posts");

			return res.json();
		},
		enabled: !isAuthLoading && !!user,
	});

	const { mutate: deletePost, isPending: isDeleting } = useMutation({
		mutationFn: async (id: string) => {
			const res = await fetch(`${serverUrl}/posts/post/delete/${id}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (!res.ok) {
				throw new Error("Falha ao deletar post");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["private-posts"] });
			toast.success("Post deletado com sucesso!");
		},
		onError: (error) => {
			console.error("Erro ao deletar post:", error);
			toast.error("Erro ao deletar post");
		},
	});

	const { mutate: updatePost, isPending: isUpdating } = useMutation({
		mutationFn: async (data: { id: string; draft: boolean }) => {
			const res = await fetch(`${serverUrl}/posts/post/update`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				throw new Error("Falha ao atualizar post");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["private-posts"] });
			toast.success("Post atualizado com sucesso!");
		},
		onError: (error) => {
			console.error("Erro ao atualizar post:", error);
			toast.error("Erro ao atualizar post");
		},
	});

	if (isAuthLoading || isLoading) {
		return <LoadingPage />;
	}

	if (isError) {
		console.error("Erro ao carregar posts:", error);
		return redirect("/");
	}

	const totalPosts = posts;
	const publishedPosts = posts.filter((post) => !post.draft);
	const draftPosts = posts.filter((post) => post.draft);

	const cardData = [
		{
			title: "Total de Posts",
			content: "Todos os posts",
			data: totalPosts.length,
		},
		{
			title: "Posts Publicados",
			content: "Posts publicados",
			data: publishedPosts.length,
		},
		{
			title: "Rascunhos",
			content: "Posts em rascunho",
			data: draftPosts.length,
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
				<Link href={"/private/post/create"} className="w-full md:max-w-1/3">
					<Card className="flex h-full w-full flex-col items-center justify-center transition-colors hover:bg-muted">
						<CardTitle>Criar novo post</CardTitle>
					</Card>
				</Link>
			</div>

			<PostsTable
				posts={posts}
				deletePost={deletePost}
				updatePost={updatePost}
				isDeleting={isDeleting}
				isUpdating={isUpdating}
			/>
		</div>
	);
}
