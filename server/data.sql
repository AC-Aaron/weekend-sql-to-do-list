CREATE TABLE "tasks"(
"id" SERIAL PRIMARY KEY,
"task" VARCHAR(50),
"complete" BOOLEAN DEFAULT FALSE,
"notes" VARCHAR(100)
);
     