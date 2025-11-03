import { vi } from "vitest";

export const mockDB = {
	insert: vi.fn(),
	update: vi.fn(),
	delete: vi.fn(),
	select: vi.fn(),
};
