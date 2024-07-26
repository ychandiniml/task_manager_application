-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "task_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'TODO',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("created_at", "description", "status", "task_id", "title", "updated_at", "user_id") SELECT "created_at", "description", "status", "task_id", "title", "updated_at", "user_id" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
