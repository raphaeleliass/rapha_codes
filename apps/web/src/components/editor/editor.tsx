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
import { useUserStore } from "@/store/useUserStore";
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
	editable: boolean;
}

export default function Editor({ content, editable = false }: EditorProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useUserStore();

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
					{editor && user && editable && <ActionButton editor={editor} />}
				</div>
			)}
		</>
	);
}
