CREATE TABLE "trades" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"token_symbol" varchar(16) NOT NULL,
	"sol_amount" numeric NOT NULL,
	"usd_value" numeric NOT NULL,
	"action_type" varchar(4) NOT NULL,
	"success" boolean DEFAULT true,
	"timestamp" timestamp DEFAULT now(),
	"signature" varchar(88) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"wallet_address" varchar(44) NOT NULL,
	"username" varchar(32),
	"registered_at" timestamp DEFAULT now(),
	"last_active" timestamp DEFAULT now(),
	CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address")
);
--> statement-breakpoint
ALTER TABLE "trades" ADD CONSTRAINT "trades_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_idx" ON "trades" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "wallet_idx" ON "users" USING btree ("wallet_address");