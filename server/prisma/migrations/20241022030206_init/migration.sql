/*
  Warnings:

  - The primary key for the `UserTypes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userTypeintId` on the `UserTypes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_userTypeId_fkey";

-- AlterTable
ALTER TABLE "UserTypes" DROP CONSTRAINT "UserTypes_pkey",
DROP COLUMN "userTypeintId",
ADD COLUMN     "userTypeId" SERIAL NOT NULL,
ADD CONSTRAINT "UserTypes_pkey" PRIMARY KEY ("userTypeId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserTypes"("userTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;
