import type { Editor } from "@tiptap/react";
import { FloatingMenu as Menu } from "@tiptap/react/menus";
import {
	Heading1,
	Heading2,
	Heading3,
	List,
	ListOrdered,
	ListTodo,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingMenuProps {
	editor: Editor | null;
}

export default function FloatingMenu({ editor }: FloatingMenuProps) {
	const menuItems = [
		{
			title: "Heading1",
			description: "Título 1",
			Icon: Heading1,
			action: () =>
				editor
					?.chain()
					.focus()
					.deleteRange({
						from: editor.state.selection.from - 1,
						to: editor.state.selection.from,
					})
					.toggleHeading({ level: 1 })
					.run(),
		},
		{
			title: "Heading2",
			description: "Título 2",
			Icon: Heading2,
			action: () =>
				editor
					?.chain()
					.focus()
					.deleteRange({
						from: editor.state.selection.from - 1,
						to: editor.state.selection.from,
					})
					.toggleHeading({ level: 2 })
					.run(),
		},
		{
			title: "Heading3",
			description: "Título 3",
			Icon: Heading3,
			action: () =>
				editor
					?.chain()
					.focus()
					.deleteRange({
						from: editor.state.selection.from - 1,
						to: editor.state.selection.from,
					})
					.toggleHeading({ level: 3 })
					.run(),
		},
		{
			title: "BulletList",
			description: "Lista comum",
			Icon: List,
			action: () =>
				editor
					?.chain()
					.focus()
					.deleteRange({
						from: editor.state.selection.from - 1,
						to: editor.state.selection.from,
					})
					.toggleBulletList()
					.run(),
		},
		{
			title: "ToDoList",
			description: "Lista To Do",
			Icon: ListTodo,
			action: () =>
				editor
					?.chain()
					.focus()
					.deleteRange({
						from: editor.state.selection.from - 1,
						to: editor.state.selection.from,
					})
					.toggleTaskList()
					.run(),
		},
		{
			title: "OrderedList",
			description: "Lista numerada",
			Icon: ListOrdered,
			action: () =>
				editor
					?.chain()
					.focus()
					.deleteRange({
						from: editor.state.selection.from - 1,
						to: editor.state.selection.from,
					})
					.toggleOrderedList()
					.run(),
		},
	];

	return (
		<Menu
			className="flex max-w-44 flex-col items-center divide-y border bg-background"
			editor={editor}
			shouldShow={({ state }) => {
				const { $from } = state.selection;
				const currentLineText = $from.nodeBefore?.textContent;

				return currentLineText === "/";
			}}
		>
			{menuItems.map(({ title, description, Icon, action }) => (
				<Button
					key={title}
					onClick={action}
					variant={"ghost"}
					className="w-full justify-start"
				>
					<Icon />
					<p className="text-muted-foreground text-xs">{description}</p>
				</Button>
			))}
		</Menu>
	);
}
