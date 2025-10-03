"use client";

import type { Editor } from "@tiptap/react";
import { BubbleMenu as Menu } from "@tiptap/react/menus";
import { Bold, Code2, Italic, Strikethrough } from "lucide-react";
import { Button } from "./button";

export default function BubbleMenu({ editor }: { editor: Editor | null }) {
	if (!editor) return;

	const buttons = [
		{
			name: "bold",
			Icon: Bold,
			action: () => editor.chain().focus().toggleBold().run(),
		},
		{
			name: "italic",
			Icon: Italic,
			action: () => editor.chain().focus().toggleItalic().run(),
		},
		{
			name: "slash",
			Icon: Strikethrough,
			action: () => editor.chain().focus().toggleStrike().run(),
		},
		{
			name: "code",
			Icon: Code2,
			action: () => editor.chain().focus().toggleCode().run(),
		},
	];

	return (
		<Menu
			editor={editor}
			options={{ placement: "bottom", offset: 8, flip: true }}
		>
			<div className="border border-muted bg-background p-0.5">
				{buttons.map(({ Icon, action, name }) => (
					<Button
						variant={"ghost"}
						size={"icon"}
						key={name}
						onClick={action}
						title={name}
					>
						<Icon />
					</Button>
				))}
			</div>
		</Menu>
	);
}
