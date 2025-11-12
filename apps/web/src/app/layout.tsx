import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import Providers from "@/components/providers";

const geist = Geist({
	subsets: ["latin", "latin-ext"],
	variable: "--font-geist",
	display: "swap",
});
const geistMono = Geist_Mono({
	subsets: ["latin", "latin-ext"],
	variable: "--font-geist-mono",
	display: "swap",
});

export const metadata: Metadata = {
	title: "RaphaCodes",
	description:
		"Meu blog pessoal sobre desenvolvimento web. Aqui compartilho ideias, aprendizados, soluções e os desafios reais do dia a dia como dev fullstack.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning>
			<body className={`${geist.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
