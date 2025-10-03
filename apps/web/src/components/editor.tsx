"use client";
import CodeBlockLowLight from "@tiptap/extension-code-block-lowlight";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { useEffect } from "react";

import "highlight.js/styles/tokyo-night-dark.css";
import BubbleMenu from "./ui/bubble-menu";
import { Button } from "./ui/button";

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
	const editor = useEditor({
		extensions: [
			StarterKit,
			CodeBlockLowLight.configure({
				lowlight,
			}),
		],
		editorProps: {
			attributes: {
				class: "outline-none border-t pt-8 prose prose-theme w-full max-w-none",
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
			<EditorContent editor={editor} />
			<BubbleMenu editor={editor} />

			<Button onClick={() => editor?.commands.setContent("teste")}>
				trocar o conteudo do editor para "teste"
			</Button>
			<Button onClick={() => editor?.commands.undo()}>desfazer</Button>
		</>
	);
}
