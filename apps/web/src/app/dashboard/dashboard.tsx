"use client";

import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
	async function createPost() {
		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/post/create`,
				{
					author: "Raphael Elias",
					title: "Meu Post",
					content: "Post COntent",
					draft: false,
				},
				{ withCredentials: true },
			);

			console.log(data);
		} catch (err) {
			if (err instanceof AxiosError)
				console.log(err.response?.data.error.message, err.response?.status);
		}
	}

	async function updatePost() {
		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/post/update`,
			{
				id: "d49fa266-4e09-4c18-830e-7bc3af85bc83",
				content: "234234",
			},
			{ withCredentials: true },
		);

		console.log(data);
	}
	async function deletePost() {
		try {
			const response = await axios.delete(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/post/delete/3e831832-6d7b-4cb5-8441-a54dd9a01e42`,
				{ withCredentials: true },
			);

			console.log(response.data);
		} catch (err) {
			if (err instanceof AxiosError)
				console.log(err.response?.data, err.response?.status);
		}
	}

	async function getPost() {
		const result = await axios.get(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/post/8caebdd1-c19a-41ad-8932-c5eaa81feca2`,
			{ withCredentials: true },
		);

		console.log(result.data);
	}
	async function getAllPosts() {
		const result = await axios.get(
			`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/all`,
			{ withCredentials: true },
		);

		console.log(result.data);
	}

	return (
		<div>
			<Button onClick={createPost}>create post</Button>
			<Button onClick={updatePost}>update post</Button>
			<Button onClick={deletePost} variant={"destructive"}>
				delete post
			</Button>
			<Button onClick={getPost}>get post</Button>
			<Button onClick={getAllPosts}>get all</Button>
		</div>
	);
}
