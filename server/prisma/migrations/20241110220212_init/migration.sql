/*
  Warnings:

  - You are about to drop the column `added_at` on the `PurchaseDetails` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseStateId` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `SaleDetails` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `SaleDetails` table. All the data in the column will be lost.
  - You are about to drop the `PurchaseStates` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionStatusId` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `SaleDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitCost` to the `SaleDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionStatusId` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_purchaseStateId_fkey";

-- DropIndex
DROP INDEX "purchases_purchasestateid_index";

-- AlterTable
ALTER TABLE "PurchaseDetails" DROP COLUMN "added_at",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Purchases" DROP COLUMN "purchaseStateId",
ADD COLUMN     "transactionStatusId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SaleDetails" DROP COLUMN "totalAmount",
DROP COLUMN "unitPrice",
ADD COLUMN     "totalCost" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "unitCost" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transactionStatusId" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "PurchaseStates";

-- CreateTable
CREATE TABLE "Clients" (
    "clientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paternalSurname" TEXT,
    "maternalSurname" TEXT,
    "email" TEXT,
    "phone" TEXT,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("clientId")
);

-- CreateTable
CREATE TABLE "TransactionStatus" (
    "transactionStatusId" SERIAL NOT NULL,
    "transactionStatus" TEXT NOT NULL,

    CONSTRAINT "TransactionStatus_pkey" PRIMARY KEY ("transactionStatusId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");

-- CreateIndex
CREATE INDEX "purchases_transactionStatusid_index" ON "Purchases"("transactionStatusId");

-- CreateIndex
CREATE INDEX "sales_transactionstatusid_index" ON "Sales"("transactionStatusId");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_transactionStatusId_fkey" FOREIGN KEY ("transactionStatusId") REFERENCES "TransactionStatus"("transactionStatusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_transactionStatusId_fkey" FOREIGN KEY ("transactionStatusId") REFERENCES "TransactionStatus"("transactionStatusId") ON DELETE RESTRICT ON UPDATE CASCADE;
