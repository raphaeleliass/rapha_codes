"use client";

import { LogOut, LucideExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useUserStore } from "@/store/useUserStore";
import ToggleTheme from "../toggleTheme";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
	const { user, setUser } = useUserStore();
	const { theme } = useTheme();
	const [logo, setLogo] = useState<"" | "light" | "dark">("");
	const router = useRouter();

	useEffect(() => {
		setLogo(theme === "light" ? "light" : "dark");
	}, [theme]);

	async function handleLogout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					setUser(null);
					router.push("/");
				},
			},
		});
	}

	return (
		<header className="custom-container sticky top-0 left-0 z-50 flex flex-row items-center justify-between bg-background py-4">
			<Link href={"/"}>
				<Image
					src={logo === "light" ? "/logo-black.png" : "/logo-white.png"}
					alt="Rapha Codes Logo"
					width={55}
					height={35}
					quality={100}
					priority={true}
					className="h-auto w-auto"
				/>
			</Link>

			<nav>
				<ul className="flex flex-row items-center gap-2">
					<li>
						<Link href={"/sobre"} className="max-sm:text-sm">
							<Button size={"sm"} variant={"ghost"}>
								sobre
							</Button>
						</Link>
					</li>
					<li>
						<Link
							href={"https://github.com/raphaeleliass"}
							target="_blank"
							rel="noreferrer noopener"
						>
							<Button size={"sm"} variant={"ghost"}>
								contato <LucideExternalLink />
							</Button>
						</Link>
					</li>

					<li>
						<ToggleTheme />
					</li>

					{user && (
						<DropdownMenu>
							<DropdownMenuTrigger
								asChild
								className="bg-transparent hover:bg-transparent"
							>
								<Button size={"icon"}>
									<Image
										src={user.image as string}
										alt={`${user.name}`}
										height={50}
										width={50}
										priority={false}
										className="h-auto w-auto rounded-full"
									/>
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								<DropdownMenuItem className="w-full">
									<Link href={"/dashboard"}>
										<Button className="w-full" variant={"ghost"}>
											Dashboard
										</Button>
									</Link>
								</DropdownMenuItem>

								<DropdownMenuItem>
									<Link href={"/dashboard"} className="w-full">
										<Button
											className="w-full"
											variant={"destructive"}
											onClick={handleLogout}
										>
											Sair
										</Button>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</ul>
			</nav>
		</header>
	);
}
