ALTER TABLE "posts" ADD COLUMN "author" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "draft" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;