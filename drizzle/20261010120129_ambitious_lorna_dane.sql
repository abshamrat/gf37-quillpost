CREATE TABLE "gf_notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" serial NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"createdOn" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "gf_notes" ADD CONSTRAINT "gf_notes_userId_gf_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."gf_user"("id") ON DELETE cascade ON UPDATE no action;