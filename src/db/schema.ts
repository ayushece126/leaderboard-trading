import {
  pgTable,
  serial,
  varchar,
  timestamp,
  numeric,
  boolean,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    walletAddress: varchar("wallet_address", { length: 44 }).unique().notNull(),
    username: varchar("username", { length: 32 }),
    registeredAt: timestamp("registered_at").defaultNow(),
    lastActive: timestamp("last_active").defaultNow(),
  },
  (table) => ({
    walletIdx: index("wallet_idx").on(table.walletAddress),
  })
);

export const trades = pgTable(
  "trades",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    tokenSymbol: varchar("token_symbol", { length: 16 }).notNull(),
    solAmount: numeric("sol_amount").notNull(),
    usdValue: numeric("usd_value").notNull(),
    actionType: varchar("action_type", { length: 4 }).notNull(),
    success: boolean("success").default(true),
    timestamp: timestamp("timestamp").defaultNow(),
    signature: varchar("signature", { length: 88 }).notNull(),
  },
  (table) => ({
    userIdx: index("user_idx").on(table.userId),
  })
);
