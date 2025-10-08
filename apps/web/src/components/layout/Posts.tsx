"use client";

import Link from "next/link";
import { type PostType, usePostStore } from "@/store/usePostStore";
import { Button } from "../ui/button";

export default function Posts() {
	const { posts: postStore } = usePostStore();

	const postData = postStore.filter((post) => !post.draft);

	const postsByMonth = postData.reduce(
		(acc, post) => {
			const getDate = new Date(post.createdAt);
			const key = getDate.toLocaleString("pt-BR", {
				month: "long",
				year: "numeric",
			});

			if (!acc[key]) acc[key] = [];
			acc[key].push(post);

			return acc;
		},
		{} as Record<string, PostType[]>,
	);

	return (
		<section>
			<div className="custom-container relative flex min-h-dvh gap-4 md:flex-row">
				<div className="flex h-dvh w-2/3 flex-col max-sm:w-full md:pr-32">
					{Object.entries(postsByMonth).map(([month, posts]) => (
						<div className="w-full pt-12 md:pt-22" id={month} key={month}>
							<h2 className="font-light font-sans text-2xl text-foreground">
								{month.charAt(0).toUpperCase().concat(month.slice(1))}
							</h2>
							<div className="w-full max-w-xs md:max-w-2xl">
								{posts.map((post) => (
									<ul key={post.id} className="mt-4 list-inside list-disc">
										<li className="space-y-2">
											<Link
												href={`/post/${post.id}`}
												className="max-w-full p-0.5 text-muted-foreground text-sm underline-offset-2 hover:underline"
											>
												{post.title}
											</Link>
										</li>
									</ul>
								))}
							</div>
						</div>
					))}
				</div>

				<aside className="fixed top-37 right-0 h-1/2 w-1/3 border-muted border-l px-4 max-md:hidden">
					<h2 className="font-light font-sans text-lg text-muted-foreground italic">
						Nessa página
					</h2>

					<div className="custom-scrollbar mt-4 flex h-full flex-col overflow-y-scroll">
						{Object.entries(postsByMonth).map(([month]) => (
							<a href={`#${month}`} key={month}>
								<Button
									className="px-0 text-sky-600 underline hover:text-sky-500 dark:text-sky-500 hover:dark:text-sky-200"
									variant={"link"}
								>
									{month.charAt(0).toUpperCase().concat(month.slice(1))}
								</Button>
							</a>
						))}
					</div>
				</aside>
			</div>
		</section>
	);
}
