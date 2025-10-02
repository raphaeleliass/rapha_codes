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
			<article className="flex w-full flex-col gap-7 font-sans">
				<h1 className="mx-auto text-balance text-center font-bold text-3xl md:max-w-2/3 md:text-4xl">
					{post.title}
				</h1>

				<div className="mx-auto space-y-2 max-sm:max-w-1/2">
					<p className="text-center text-muted-foreground max-sm:mx-auto max-sm:text-xs">
						escrito por
					</p>
					<div className="flex flex-row-reverse items-center gap-4">
						<p className="text-sm">{post.author}</p>
						<Image
							src={post.author_img as string}
							alt={`foto de ${user?.name}`}
							height={30}
							width={30}
							quality={75}
							priority={false}
							className="h-auto w-auto rounded-full object-cover object-center"
						/>
					</div>
				</div>

				<Editor content={post.content} editable={!!user} />
			</article>
		</section>
	);
}
