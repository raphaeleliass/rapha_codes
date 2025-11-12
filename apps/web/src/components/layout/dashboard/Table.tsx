import { Check, MoreHorizontal, Trash, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { PostType } from "@/store/usePostStore";

interface PostsTableProps {
	posts: PostType[];
	deletePost: (id: string) => void;
	updatePost: (data: { id: string; draft: boolean }) => void;
	isDeleting: boolean;
	isUpdating: boolean;
}

export default function PostsTable({
	posts,
	deletePost,
	updatePost,
	isDeleting,
	isUpdating,
}: PostsTableProps) {
	function formatDate(data: string) {
		return new Date(data);
	}

	return (
		<Table>
			<TableCaption>Posts</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Título</TableHead>
					<TableHead>Criado em</TableHead>
					<TableHead className="text-center">Publicado</TableHead>
					<TableHead className="text-right">Ações</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{posts
					.sort(
						(newest, oldest) =>
							formatDate(oldest.createdAt).getTime() -
							formatDate(newest.createdAt).getTime(),
					)
					.map((post) => (
						<TableRow key={post.id}>
							<TableCell className="overflow-hidden text-ellipsis max-sm:w-full max-sm:max-w-56">
								<Link
									href={`/private/post/${post.id}`}
									className="underline-offset-4 hover:underline"
								>
									{post.title}
								</Link>
							</TableCell>
							<TableCell>
								{formatDate(post.createdAt).toLocaleDateString("pt-BR", {
									day: "2-digit",
									month: "numeric",
									year: "2-digit",
									hour: "numeric",
									minute: "numeric",
								})}
							</TableCell>
							<TableCell className="flex justify-center">
								{post.draft === true ? (
									<X size={16} className="text-red-500" />
								) : (
									<Check size={16} className="text-green-500" />
								)}
							</TableCell>
							<TableCell className="ml-auto text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											className="h-8 w-8 p-0"
											disabled={isDeleting || isUpdating}
										>
											<span className="sr-only">Open menu</span>
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem
											onClick={() =>
												updatePost({ id: post.id, draft: !post.draft })
											}
										>
											{post.draft ? "Publicar" : "Despublicar"}
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => deletePost(post.id)}
											className="text-red-500"
										>
											<Trash size={16} className="mr-2" />
											Deletar
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
}
