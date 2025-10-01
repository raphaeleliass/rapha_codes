"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ToggleTheme() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	return (
		<Button
			onClick={toggleTheme}
			className="overflow-hidden"
			size={"sm"}
			variant={"outline"}
			aria-label="Mudar tema"
			title="Mudar o tema"
		>
			<AnimatePresence mode="wait" initial={false}>
				{theme === "light" ? (
					<motion.div
						key={"sun"}
						initial={{ x: -32, y: 32, opacity: 0 }}
						animate={{ x: 0, y: 0, opacity: 1 }}
						exit={{ x: 32, y: 12 }}
						transition={{ type: "spring", bounce: 0.4, duration: 0.2 }}
					>
						<Sun />
					</motion.div>
				) : (
					<motion.div
						key={"moon"}
						initial={{ x: -32, y: 32, opacity: 0 }}
						animate={{ x: 0, y: 0, opacity: 1 }}
						exit={{ x: 32, y: 12 }}
						transition={{ type: "spring", bounce: 0.4, duration: 0.2 }}
					>
						<Moon />
					</motion.div>
				)}
			</AnimatePresence>
		</Button>
	);
}
