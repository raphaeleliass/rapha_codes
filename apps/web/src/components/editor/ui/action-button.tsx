"use client";

import type { Editor } from "@tiptap/react";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { serverUrl } from "@/constants";
import { type TypePost, usePostStore } from "@/store/usePostStore";
import { useUserStore } from "@/store/useUserStore";

export default function ActionButton({
	editor,
	title,
}: {
	editor: Editor | null;
	title: string;
}) {
	const { addPost, currentPost, setCurrentPost, updatePost } = usePostStore();
	const { user } = useUserStore();
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			draft: false,
		},
	});

	async function onSubmit({ draft }: { draft: boolean }) {
		const currentContent = editor?.getHTML();

		if (
			currentPost &&
			currentContent === currentPost?.content &&
			draft === currentPost?.draft &&
			title === currentPost?.title
		) {
			return toast.error("Não houve mudança no conteúdo");
		}

		try {
			let postData: TypePost;
			if (currentPost) {
				const { data } = await axios.patch(
					`${serverUrl}/posts/post/update`,
					{ id: currentPost.id, content: currentContent, draft, title },
					{ withCredentials: true },
				);
				postData = data;
				updatePost(postData);
				toast.success("Post atualizado!");
			} else {
				const { data } = await axios.post(
					`${serverUrl}/posts/post/create`,
					{
						content: currentContent,
						draft,
						title,
						author: user?.name,
						authorImg: user?.image,
					},
					{ withCredentials: true },
				);
				postData = data;
				addPost(postData);
				toast.success("Post criado!");
				router.push("/dashboard");
			}

			setCurrentPost(postData);
		} catch (err) {
			if (err instanceof AxiosError) {
				return toast.error(err.message);
			}
		}
	}

	return (
		<div className="mt-4 flex flex-row items-center justify-end pt-2">
			<form onSubmit={form.handleSubmit(onSubmit)} id={"form"}>
				<Label className="px-2">
					<Controller
						name="draft"
						control={form.control}
						render={({ field }) => (
							<Checkbox
								defaultChecked={currentPost?.draft}
								onCheckedChange={field.onChange}
							/>
						)}
					/>
					rascunho
					{form.formState.isSubmitting && (
						<div className="absolute inset-0 place-content-center justify-items-center">
							<Loader2 className="animate-spin" />
						</div>
					)}
				</Label>
			</form>
			<Button className="bg-green-600" type="submit" form="form">
				salvar
			</Button>
		</div>
	);
}
