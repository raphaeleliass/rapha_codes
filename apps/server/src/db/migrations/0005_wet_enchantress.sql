CREATE TABLE "ai_conversation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"instruction" text NOT NULL,
	"prompt" text NOT NULL,
	"response" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "author_img" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_conversation" ADD CONSTRAINT "ai_conversation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;