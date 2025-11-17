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
import { useState } from "react";
import BubbleMenu from "@/components/editor/ui/bubble-menu";
import "@/components/editor/styles/code-highlight.css";
import ActionButton from "@/components/editor/ui/action-button";
import FloatingBar from "@/components/editor/ui/floating-bar";
import FloatingMenu from "@/components/editor/ui/floating-menu";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";

const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export default function CreatePost() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useUserStore();
	const [title, setTitle] = useState<string>("");

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
		content: "",
		editable: true,
		immediatelyRender: false,
	});

	return (
		<section className="custom-container min-h-dvh py-20">
			<article className="font-sans">
				<div className="mx-auto flex w-full flex-col gap-8 md:max-w-2/3">
					<Input
						className="text-balance bg-transparent text-5xl outline-none"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className="relative">
						{editor && user && <FloatingBar editor={editor} />}

						<EditorContent editor={editor} />

						{editor && user && (
							<BubbleMenu
								setIsLoading={setIsLoading}
								isLoading={isLoading}
								editor={editor}
							/>
						)}

						{editor && user && <FloatingMenu editor={editor} />}
						{editor && user && <ActionButton editor={editor} title={title} />}
					</div>
				</div>
			</article>
		</section>
	);
}
