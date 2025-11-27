"use client";
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";

export default function Footer() {
	const social = [
		{
			title: "Github",
			icon: SiGithub,
			href: "https://github.com/raphaeleliass",
		},
		{
			title: "Instagram",
			icon: SiInstagram,
			href: "https://instagram.com/raphaeleliass",
		},
		{
			title: "Linkedin",
			icon: Linkedin,
			href: "https://linkedin.com/in/raphaeleliass",
		},
	];

	function getYear() {
		const date = new Date().getFullYear();

		return date;
	}

	return (
		<footer className="custom-container flex flex-col items-center justify-between md:flex-row">
			<p className="text-muted-foreground text-xs">
				{getYear()} &copy; Desenvolvido por{" "}
				<a
					href="https://github.com/raphaeleliass"
					target="_blank"
					rel="noreferrer noopener"
					className="py-8 underline-offset-2 hover:text-foreground hover:underline"
				>
					Raphael Elias
				</a>
				.
			</p>

			<div>
				<ul className="flex flex-row gap-2">
					{social.map((media) => {
						const Icon = media.icon;

						return (
							<li key={media.title}>
								<a
									href={media.href}
									target="_blank"
									rel="noreferrer noopener"
									title={media.title}
									className="text-muted-foreground hover:text-foreground"
								>
									<Icon size={20} />
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</footer>
	);
}
