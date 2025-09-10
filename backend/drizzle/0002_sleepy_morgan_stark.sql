ALTER TABLE "blocks" ADD COLUMN "hash" varchar(128);--> statement-breakpoint
ALTER TABLE "blocks" ADD COLUMN "mix_digest" varchar(128);--> statement-breakpoint
ALTER TABLE "blocks" ADD COLUMN "base_fee" bigint;--> statement-breakpoint
ALTER TABLE "blocks" ADD COLUMN "coinbase" varchar(128);--> statement-breakpoint
ALTER TABLE "blocks" ADD COLUMN "latest_tx_hash" varchar(128);--> statement-breakpoint
ALTER TABLE "blocks" ADD COLUMN "tx_count" integer;