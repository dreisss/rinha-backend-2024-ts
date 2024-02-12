/*
  Warnings:

  - You are about to alter the column `type` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char`.
  - You are about to alter the column `description` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "type" SET DATA TYPE CHAR,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(10);
