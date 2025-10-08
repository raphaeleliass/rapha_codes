import type { Editor } from "@tiptap/react";
import {
	Bold,
	Code,
	Italic,
	Quote,
	Redo2,
	RemoveFormatting,
	Strikethrough,
	Underline,
	Undo2,
} from "lucide-react";
import { Button } from "../../ui/button";
import DropdownMarkers from "./dropdown-marker";

export default function FloatingBar({ editor }: { editor: Editor | null }) {
	const buttons = [
		{
			name: "bold",
			Icon: Bold,
			action: () => editor?.chain().focus().toggleBold().run(),
		},
		{
			name: "italic",
			Icon: Italic,
			action: () => editor?.chain().focus().toggleItalic().run(),
		},
		{
			name: "underline",
			Icon: Underline,
			action: () => editor?.chain().focus().toggleUnderline().run(),
		},
		{
			name: "strike",
			Icon: Strikethrough,
			action: () => editor?.chain().focus().toggleStrike().run(),
		},
		{
			name: "code",
			Icon: Code,
			action: () => editor?.chain().focus().toggleCodeBlock().run(),
		},
		{
			name: "block-quote",
			Icon: Quote,
			action: () => editor?.chain().focus().toggleBlockquote().run(),
		},
		{
			name: "remove-formatting",
			Icon: RemoveFormatting,
			action: () => editor?.chain().focus().unsetAllMarks().run(),
		},
		{
			name: "undo",
			Icon: Undo2,
			action: () => editor?.chain().focus().undo().run(),
		},
		{
			name: "redo",
			Icon: Redo2,
			action: () => editor?.chain().focus().redo().run(),
		},
	];

	return (
		<div className="sticky top-20 z-50 mx-auto w-fit drop-shadow-2xl">
			<div className="flex flex-row items-center divide-x divide-muted border border-muted-foreground/20 bg-background py-0.5">
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
				<DropdownMarkers editor={editor} />
			</div>
		</div>
	);
}
