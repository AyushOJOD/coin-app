CREATE TABLE IF NOT EXISTS "blocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"block_number" bigint NOT NULL,
	"timestamp" timestamp NOT NULL
);
