-- CreateTable
CREATE TABLE IF NOT EXISTS "Doctor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "photoUrl" TEXT,
    "education" TEXT NOT NULL,
    "career" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "HeroSlide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "buttonText" TEXT,
    "buttonLink" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- AlterTable (for PostgreSQL)
-- ALTER TABLE "Popup" ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;
-- ALTER TABLE "Treatment" ADD COLUMN IF NOT EXISTS "category" TEXT;
-- ALTER TABLE "Treatment" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;

-- For SQLite (if using SQLite in dev):
-- These columns might already exist or need to be added via ALTER TABLE
