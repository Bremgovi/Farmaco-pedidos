/*
  Warnings:

  - Added the required column `clientId` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "clientId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "sales_clientid_index" ON "Sales"("clientId");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;
