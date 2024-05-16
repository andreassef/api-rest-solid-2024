/*
  Warnings:

  - You are about to drop the column `phine` on the `gyms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "phine",
ADD COLUMN     "phone" TEXT;
