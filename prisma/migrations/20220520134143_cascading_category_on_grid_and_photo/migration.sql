-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Grid" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "nodes" TEXT NOT NULL,
    CONSTRAINT "Grid_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Grid" ("categoryId", "id", "nodes") SELECT "categoryId", "id", "nodes" FROM "Grid";
DROP TABLE "Grid";
ALTER TABLE "new_Grid" RENAME TO "Grid";
CREATE UNIQUE INDEX "Grid_categoryId_key" ON "Grid"("categoryId");
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL DEFAULT -1,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "Photo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("categoryId", "description", "id", "price", "slug", "title", "url") SELECT "categoryId", "description", "id", "price", "slug", "title", "url" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
CREATE UNIQUE INDEX "Photo_slug_key" ON "Photo"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
