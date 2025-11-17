"use client";
import { redirect } from "next/navigation";
import CreatePost from "@/components/layout/create-post/CreatePost";
import { useUserStore } from "@/store/useUserStore";

export default function CreatePostPage() {
	const { user, isAuthLoading } = useUserStore();

	if (isAuthLoading) {
		return null;
	}

	if (!user) {
		redirect("/");
	}

	return <CreatePost />;
}
