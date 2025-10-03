"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import type { PostType } from "@/store/usePostStore";
import Editor from "../editor";

export default function Post({ post }: { post: PostType }) {
	const [user, setUser] = useState<
		typeof authClient.$Infer.Session.user | null
	>(null);

	useEffect(() => {
		async function getUser() {
			const { data } = await authClient.getSession();

			if (!data || !data.user) return;

			setUser(data.user);
		}

		getUser();
	}, []);

	if (!user) return null;

	return (
		<section className="custom-container min-h-dvh py-20">
			<article className="font-sans">
				<div className="mx-auto flex w-full flex-col gap-8 md:max-w-2/3">
					<div className="mr-auto text-muted-foreground">
						<p className="text-sm"> {post.author}</p>
						<p className="font-light text-xs">
							{new Date(post.createdAt).toLocaleString("pt-BR", {
								day: "2-digit",
								month: "2-digit",
								year: "2-digit",
								hour: "2-digit",
								minute: "2-digit",
							})}
						</p>
					</div>
					<h1 className="text-balance text-5xl">{post.title}</h1>
					<Editor content={post.content} editable={!!user} />
				</div>
			</article>
		</section>
	);
}
