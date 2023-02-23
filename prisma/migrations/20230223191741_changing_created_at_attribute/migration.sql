/*
  Warnings:

  - You are about to drop the column `createAt` on the `expenses` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "price_hour" REAL NOT NULL DEFAULT 0.0,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME,
    "updatedAt" DATETIME
);
INSERT INTO "new_users" ("createdAt", "email", "id", "name", "password", "price_hour", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "price_hour", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_userStores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "decription" TEXT NOT NULL,
    "createdAt" DATETIME,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "userStores_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_userStores" ("createdAt", "decription", "id", "name", "projectId") SELECT "createdAt", "decription", "id", "name", "projectId" FROM "userStores";
DROP TABLE "userStores";
ALTER TABLE "new_userStores" RENAME TO "userStores";
CREATE TABLE "new_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER NOT NULL,
    "complexity" TEXT NOT NULL,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    "userStoreId" INTEGER NOT NULL,
    CONSTRAINT "tasks_userStoreId_fkey" FOREIGN KEY ("userStoreId") REFERENCES "userStores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("completed", "complexity", "createdAt", "description", "duration", "id", "name", "updatedAt", "userStoreId") SELECT "completed", "complexity", "createdAt", "description", "duration", "id", "name", "updatedAt", "userStoreId" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
CREATE TABLE "new_projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME,
    "updatedAt" DATETIME,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_projects" ("client", "cost", "createdAt", "description", "id", "name", "updatedAt", "userId") SELECT "client", "cost", "createdAt", "description", "id", "name", "updatedAt", "userId" FROM "projects";
DROP TABLE "projects";
ALTER TABLE "new_projects" RENAME TO "projects";
CREATE TABLE "new_expenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cost" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "expenses_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_expenses" ("cost", "id", "name", "projectId") SELECT "cost", "id", "name", "projectId" FROM "expenses";
DROP TABLE "expenses";
ALTER TABLE "new_expenses" RENAME TO "expenses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
