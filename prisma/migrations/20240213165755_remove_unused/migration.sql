/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "updatedAt",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Client_id_seq";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "type" SET DATA TYPE CHAR;
