"use client";
import { useState } from "react";
import { type PostType, usePostStore } from "@/store/usePostStore";
import { useUserStore } from "@/store/useUserStore";
import Editor from "../editor/editor";
import { Button } from "../ui/button";

export default function Post({ post }: { post: PostType }) {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { user } = useUserStore();
	const { setCurrentPost } = usePostStore();

	function toggleEditMode() {
		if (!isEditing) {
			setCurrentPost(post);
		}
		setIsEditing((prev) => !prev);
	}

	return (
		<section className="custom-container min-h-dvh py-20">
			<article className="font-sans">
				<div className="mx-auto flex w-full flex-col gap-8 md:max-w-2/3">
					<div className="mr-auto flex w-full flex-row items-center justify-between text-muted-foreground">
						<div>
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

						{user && (
							<Button onClick={toggleEditMode}>
								{isEditing ? "cancelar" : "editar"}
							</Button>
						)}
					</div>
					<h1 className="text-balance text-5xl">{post.title}</h1>
					<Editor content={post.content} editable={isEditing} />
				</div>
			</article>
		</section>
	);
}
