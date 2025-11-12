"use client";
import CodeBlockLowLight from "@tiptap/extension-code-block-lowlight";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import BubbleMenu from "./ui/bubble-menu";
import "../editor/styles/code-highlight.css";
import { type PostType, usePostStore } from "@/store/usePostStore";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ActionButton from "./ui/action-button";
import FloatingBar from "./ui/floating-bar";
import FloatingMenu from "./ui/floating-menu";

const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

interface EditorProps {
	content: string;

	post: PostType;
}

export default function Editor({ post, content }: EditorProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useUserStore();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(post.title);

	const { setCurrentPost } = usePostStore();

	function toggleEditMode() {
		if (!isEditing) {
			setCurrentPost(post);
		} else {
			setTitle(post.title);
		}
		setIsEditing((prev) => !prev);
		setEditable((prev) => !prev);
	}

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				codeBlock: false,
			}),
			Highlight.configure({
				multicolor: true,
			}),
			Image.configure({
				HTMLAttributes: {
					class:
						"w-full aspect-video object-cover object-center md:max-w-2/3 mx-auto",
				},
			}),
			CodeBlockLowLight.configure({
				lowlight,
			}),
			TaskList,
			TaskItem.configure({
				HTMLAttributes: {
					class: "flex flex-row items-center list-disc gap-2",
				},
			}),
		],

		editorProps: {
			attributes: {
				class:
					"outline-none border-t py-8 prose prose-theme w-full max-w-none dark:prose-invert",
			},
		},
		content,
		editable,
		immediatelyRender: false,
	});

	useEffect(() => {
		if (editor) {
			editor.setEditable(editable);
		}
	}, [editable, editor]);

	return (
		<>
			{isLoading === true ? (
				<div className="flex flex-col-reverse">
					{[...Array(10)].map((_, i) => (
						<Skeleton
							// biome-ignore lint: Skeletons are static, so doesn't have the risk to re-render
							key={i}
							className={"mt-3 h-5"}
						/>
					))}
				</div>
			) : (
				<section className="custom-container min-h-dvh py-20">
					<article className="font-sans">
						<div className="mx-auto flex w-full flex-col gap-8 md:max-w-2/3">
							<div className="mr-auto flex w-full flex-row items-center justify-between text-muted-foreground">
								<div>
									<p className="text-sm">{post.author}</p>
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

							{isEditing ? (
								<Input
									className="text-balance bg-transparent text-5xl outline-none"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							) : (
								<h1 className="text-balance text-5xl">{post.title}</h1>
							)}
							<div className="relative">
								{editor && user && editable && <FloatingBar editor={editor} />}

								<EditorContent editor={editor} />

								{editor && user && editable && (
									<BubbleMenu
										setIsLoading={setIsLoading}
										isLoading={isLoading}
										editor={editor}
									/>
								)}

								{editor && user && editable && <FloatingMenu editor={editor} />}
								{editor && user && editable && (
									<ActionButton editor={editor} title={title} />
								)}
							</div>
						</div>
					</article>
				</section>
			)}
		</>
	);
}
