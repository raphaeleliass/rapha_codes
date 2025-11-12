"use client";

import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { use } from "react";
import { toast } from "sonner";
import Editor from "@/components/editor/editor";
import LoadingPage from "@/components/ui/loadingPage";
import { serverUrl } from "@/constants";
import type { PostType } from "@/store/usePostStore";

export default function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = use(params);

	const { data, isLoading } = useQuery<PostType>({
		queryKey: ["private-post", slug],
		queryFn: async () => {
			const res = await fetch(`${serverUrl}/posts/post/${slug}`, {
				credentials: "include",
			});

			if (res.status === 404) {
				redirect("/not-found");
			}

			if (res.status === 401) {
				toast.error("Você precisa estar logado para acessar este post");
				redirect("/");
			}

			if (!res.ok) {
				throw new Error(`Erro ${res.status}: ${res.statusText}`);
			}

			const data = await res.json();
			return data;
		},
	});

	if (isLoading) {
		return <LoadingPage />;
	}

	if (!data) {
		redirect("/not-found");
		return null;
	}

	return <Editor post={data} content={data.content} />;
}
