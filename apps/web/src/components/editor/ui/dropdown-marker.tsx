import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import type { Editor } from "@tiptap/react";
import { Highlighter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const markerColors = [
	{
		title: "bg-yellow-400",
		color: "var(--color-yellow-400)",
	},
	{
		title: "bg-orange-400",
		color: "var(--color-orange-400)",
	},
	{
		title: "bg-green-400",
		color: "var(--color-green-400)",
	},
	{
		title: "bg-rose-400",
		color: "var(--color-rose-400)",
	},
];

export default function DropdownMarkers({ editor }: { editor: Editor | null }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"} size={"icon"}>
					<Highlighter />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="border border-t-0 bg-background drop-shadow-2xl">
				{markerColors.map(({ color, title }) => (
					<DropdownMenuItem asChild key={title}>
						<Button
							variant={"ghost"}
							size={"icon"}
							onClick={() =>
								editor
									?.chain()
									.focus()
									.setHighlight({ color: `${color}` })
									.run()
							}
						>
							<div className={`size-3 rounded-full border ${title}`} />
						</Button>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
