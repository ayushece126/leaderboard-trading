CREATE TABLE "leaderboard_registrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_uuid" text NOT NULL,
	"wallet_public_key" text NOT NULL,
	"registered_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_uuid" text PRIMARY KEY NOT NULL,
	"user_uuid" text NOT NULL,
	"fingerprint" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"nonce" text NOT NULL,
	"session_token" text NOT NULL,
	"session_info" text,
	"created_at" timestamp DEFAULT NOW() NOT NULL,
	"last_active_at" timestamp DEFAULT NOW() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_pnl_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_uuid" text NOT NULL,
	"wallet_public_key" text NOT NULL,
	"period" text NOT NULL,
	"realized_pnl" double precision DEFAULT 0 NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"uuid" text PRIMARY KEY NOT NULL,
	"telegram_id" text NOT NULL,
	"username" text,
	"pfp_url" text,
	"referral_tag" text,
	"referrer" text,
	"primary_wallet_pub_key" text,
	"xp" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"public_key" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"balance" double precision,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leaderboard_registrations" ADD CONSTRAINT "leaderboard_registrations_user_uuid_users_uuid_fk" FOREIGN KEY ("user_uuid") REFERENCES "public"."users"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leaderboard_registrations" ADD CONSTRAINT "leaderboard_registrations_wallet_public_key_wallets_public_key_fk" FOREIGN KEY ("wallet_public_key") REFERENCES "public"."wallets"("public_key") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_uuid_users_uuid_fk" FOREIGN KEY ("user_uuid") REFERENCES "public"."users"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_pnl_data" ADD CONSTRAINT "user_pnl_data_user_uuid_users_uuid_fk" FOREIGN KEY ("user_uuid") REFERENCES "public"."users"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_pnl_data" ADD CONSTRAINT "user_pnl_data_wallet_public_key_wallets_public_key_fk" FOREIGN KEY ("wallet_public_key") REFERENCES "public"."wallets"("public_key") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "leaderboard_registration_unique_user_wallet" ON "leaderboard_registrations" USING btree ("user_uuid","wallet_public_key");--> statement-breakpoint
CREATE UNIQUE INDEX "user_pnl_data_user_period_idx" ON "user_pnl_data" USING btree ("user_uuid","period");