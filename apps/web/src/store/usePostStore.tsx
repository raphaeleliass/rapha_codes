import { create } from "zustand";

export type PostType = {
	id: string;
	author_img: string;
	author: string;
	title: string;
	content: string;
	draft: boolean;
	createdAt: string;
	updatedAt: string;
};

type PostStore = {
	posts: PostType[];
	setPosts: (posts: PostType[]) => void;
	addPost: (post: PostType) => void;
	updatePost: (post: PostType) => void;
	deletePost: (id: string) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
};

export const usePostStore = create<PostStore>((set) => ({
	posts: [],
	loading: false,
	setPosts: (posts) => set({ posts }),
	addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
	updatePost: (post) =>
		set((state) => ({
			posts: state.posts.map((updatedPost) =>
				updatedPost.id === post.id ? post : updatedPost,
			),
		})),
	deletePost: (id) =>
		set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
	setLoading: (loading) => set({ loading }),
}));
