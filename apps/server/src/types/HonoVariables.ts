import type { auth } from "@/lib/auth";

export type HonoVariables = {
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		userId: typeof auth.$Infer.Session.user.id | null;
		session: typeof auth.$Infer.Session.session | null;
	};
};
