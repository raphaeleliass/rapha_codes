"use client";

import type { Editor } from "@tiptap/react";
import axios, { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { serverUrl } from "@/constants";
import { usePostStore } from "@/store/usePostStore";

export default function ActionButton({ editor }: { editor: Editor | null }) {
	const { currentPost, setCurrentPost, updatePost } = usePostStore();

	const form = useForm({
		defaultValues: {
			draft: false,
		},
	});

	async function onSubmit({ draft }: { draft: boolean }) {
		const currentContent = editor?.getHTML();

		if (currentContent === currentPost?.content && draft === currentPost?.draft)
			return toast.error("Não houve mudança no conteúdo");

		const response = await axios.patch(
			`${serverUrl}/posts/post/update`,
			{ id: currentPost?.id, content: currentContent, draft },
			{ withCredentials: true },
		);

		if (response instanceof AxiosError) return toast.error(response.message);

		setCurrentPost(response.data);

		updatePost({ ...response.data });

		toast.success("Post atualizado!");
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
							<div className="size-12 animate-spin bg-red-500" />
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
