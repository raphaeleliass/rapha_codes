import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import type { Editor } from "@tiptap/react";
import { BubbleMenu as Menu } from "@tiptap/react/menus";
import {
	ArrowDownWideNarrowIcon,
	ArrowUpNarrowWide,
	MessageCircleHeart,
	SparklesIcon,
	SpellCheck,
} from "lucide-react";
import { toast } from "sonner";
import { fetchGeminiResponse } from "@/actions/fetchGemini";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	PROMPT_AUMENTAR_PALAVRAS,
	PROMPT_CORRIGIR_GRAMATICA,
	PROMPT_DIMINUIR_PALAVRAS,
	PROMPT_MELHORAR_ESTILO,
} from "@/lib/gemini-instructions";

interface BubbleMenuProps {
	editor: Editor | null;
	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;
}

export default function BubbleMenu({
	editor,
	isLoading,
	setIsLoading,
}: BubbleMenuProps) {
	if (!editor) return null;

	const aiOptions = [
		{
			title: "Estender texto",
			instruction: PROMPT_AUMENTAR_PALAVRAS,
			Icon: ArrowDownWideNarrowIcon,
		},
		{
			title: "Diminuir texto",
			instruction: PROMPT_DIMINUIR_PALAVRAS,
			Icon: ArrowUpNarrowWide,
		},
		{
			title: "Corrigir texto",
			instruction: PROMPT_CORRIGIR_GRAMATICA,
			Icon: SpellCheck,
		},
		{
			title: "Melhorar linguagem",
			instruction: PROMPT_MELHORAR_ESTILO,
			Icon: MessageCircleHeart,
		},
	];

	async function handleGenerateContent({
		editor,
		instruction,
	}: {
		editor: Editor | null;
		instruction: string;
	}) {
		if (!editor) return;

		const { from, to } = editor.state.selection;
		const selectedText = editor.state.doc.textBetween(from, to).trim();

		if (selectedText.length <= 60)
			return toast.error("Selecione ao menos 60 caracteres!");

		if (selectedText.length >= 1000)
			return toast.error("Muitos caracteres! selecione um texto menor.");

		if (!/[a-zA-Z0-9]/.test(selectedText))
			return toast.error("Seleções vazias não são aceitas!");

		setIsLoading(true);

		const response = await fetchGeminiResponse({
			content: selectedText,
			instruction,
		});

		editor.chain().focus().insertContentAt({ from, to }, response.text).run();

		setIsLoading(false);
	}

	return (
		<Menu
			className="border"
			editor={editor}
			options={{ placement: "bottom", offset: 8, flip: true }}
		>
			<DropdownMenu>
				<DropdownMenuTrigger asChild className="bg-background">
					<Button title="Gerar conteúdo por IA">
						<SparklesIcon />
						<p>Gerar conteúdo</p>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="z-50 border">
					{aiOptions.map(({ title, instruction, Icon }) => (
						<DropdownMenuItem key={title} className="bg-background">
							<Button
								size={"sm"}
								disabled={isLoading}
								className="w-full justify-start"
								variant={"ghost"}
								onClick={() => handleGenerateContent({ editor, instruction })}
							>
								<Icon />
								{title}
							</Button>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</Menu>
	);
}
