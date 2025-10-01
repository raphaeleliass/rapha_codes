"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useEffect } from "react";

interface EditorProps {
	content: string;
	editable: boolean;
}

export default function Editor({ content, editable = false }: EditorProps) {
	const tiptap = useEditor({
		extensions: [StarterKit],
		content,
		editable,
		immediatelyRender: false,
	});

	useEffect(() => {
		if (tiptap) {
			tiptap.setEditable(editable);
		}
	}, [editable, tiptap]);

	return <EditorContent editor={tiptap} />;
}
