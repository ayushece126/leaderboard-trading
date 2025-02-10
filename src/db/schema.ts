import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  doublePrecision,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Auth Service Schemas (auth.proto)

export const users = pgTable("users", {
  uuid: text("uuid").notNull().primaryKey(), // userUuid from auth.User
  telegramId: text("telegram_id").notNull(),
  username: text("username"),
  pfpUrl: text("pfp_url"),
  referralTag: text("referral_tag"),
  referrer: text("referrer"),
  primaryWalletPubKey: text("primary_wallet_pub_key"),
  xp: integer("xp"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  sessionUuid: text("session_uuid").notNull().primaryKey(),
  userUuid: text("user_uuid")
    .notNull()
    .references(() => users.uuid, { onDelete: "cascade" }),
  fingerprint: text("fingerprint").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  nonce: text("nonce").notNull(),
  sessionToken: text("session_token").notNull(),
  sessionInfo: text("session_info"),
  createdAt: timestamp("created_at")
    .default(sql`NOW()`) // Use NOW() for current timestamp
    .notNull(),
  lastActiveAt: timestamp("last_active_at")
    .default(sql`NOW()`) // Use NOW() for current timestamp
    .notNull(),
});

export const wallets = pgTable("wallets", {
  publicKey: text("public_key").notNull().primaryKey(), // publicKey from auth.Wallet and snapview.Wallet
  name: text("name").notNull(),
  balance: doublePrecision("balance"), // balance from auth.Wallet and snapview.Wallet
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Leaderboard and PNL Schemas (snap_ext.proto & snapview.proto for PNL)

export const leaderboardRegistrations = pgTable(
  "leaderboard_registrations",
  {
    id: serial("id").primaryKey(),
    userUuid: text("user_uuid")
      .notNull()
      .references(() => users.uuid, { onDelete: "cascade" }), // Foreign key to users table
    walletPublicKey: text("wallet_public_key")
      .notNull()
      .references(() => wallets.publicKey, { onDelete: "cascade" }), // Foreign key to wallets table
    registeredAt: timestamp("registered_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      // Ensure one user can only register a wallet once for the leaderboard (optional constraint)
      uniqueRegistration: uniqueIndex(
        "leaderboard_registration_unique_user_wallet"
      ).on(table.userUuid, table.walletPublicKey),
    };
  }
);

export const userPnlData = pgTable(
  "user_pnl_data",
  {
    id: serial("id").primaryKey(),
    userUuid: text("user_uuid")
      .notNull()
      .references(() => users.uuid, { onDelete: "cascade" }), // Foreign key to users table
    walletPublicKey: text("wallet_public_key")
      .notNull()
      .references(() => wallets.publicKey, { onDelete: "cascade" }), // Foreign key to wallets table
    period: text("period").notNull(), // e.g., 'daily', 'weekly', 'monthly', 'all_time'
    realizedPnl: doublePrecision("realized_pnl").notNull().default(0), // From MintWalletSnap.realizedPnl
    timestamp: timestamp("timestamp").defaultNow().notNull(),
  },
  (table) => {
    return {
      // Index for querying PNL data for a user and period efficiently
      userPeriodIndex: uniqueIndex("user_pnl_data_user_period_idx").on(
        table.userUuid,
        table.period
      ),
    };
  }
);
