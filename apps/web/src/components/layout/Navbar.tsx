"use client";

import { LucideExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ToggleTheme from "../toggleTheme";
import { Button } from "../ui/button";

export default function Navbar() {
	const { theme } = useTheme();
	const [logo, setLogo] = useState<"" | "light" | "dark">("");

	useEffect(() => {
		setLogo(theme === "light" ? "light" : "dark");
	}, [theme]);

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
				</ul>
			</nav>
		</header>
	);
}
