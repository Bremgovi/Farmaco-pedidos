-- CreateTable
CREATE TABLE "PurchaseDetails" (
    "purchaseDetailsId" BIGSERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCost" DECIMAL(10,2) NOT NULL,
    "totalCost" DECIMAL(10,2) NOT NULL,
    "added_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "PurchaseDetails_pkey" PRIMARY KEY ("purchaseDetailsId")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "supplierId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("supplierId")
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL,
    "userTypeId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Sales" (
    "saleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleId")
);

-- CreateTable
CREATE TABLE "PurchasePredictions" (
    "purchasePredictionsId" BIGSERIAL NOT NULL,
    "predictionDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchasePredictions_pkey" PRIMARY KEY ("purchasePredictionsId")
);

-- CreateTable
CREATE TABLE "Purchases" (
    "purchaseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "purchaseStateId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("purchaseId")
);

-- CreateTable
CREATE TABLE "ProductTypes" (
    "productTypeId" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "ProductTypes_pkey" PRIMARY KEY ("productTypeId")
);

-- CreateTable
CREATE TABLE "SaleDetails" (
    "saleDetailsId" BIGSERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "SaleDetails_pkey" PRIMARY KEY ("saleDetailsId")
);

-- CreateTable
CREATE TABLE "Employees" (
    "employeeId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "paternalSurname" TEXT,
    "maternalSurname" TEXT,
    "email" TEXT,
    "phone" TEXT,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "PredictionDetails" (
    "predictionDetailsId" BIGSERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "purchasePredictionId" BIGINT NOT NULL,
    "predictedQuantity" INTEGER NOT NULL,

    CONSTRAINT "PredictionDetails_pkey" PRIMARY KEY ("predictionDetailsId")
);

-- CreateTable
CREATE TABLE "Products" (
    "productId" TEXT NOT NULL,
    "productTypeId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "rating" DECIMAL(2,1),
    "stockQuantity" INTEGER NOT NULL,
    "minimumStock" INTEGER NOT NULL,
    "maximumStock" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Shifts" (
    "shiftId" SERIAL NOT NULL,
    "startTime" TIME(0) NOT NULL,
    "endTime" TIME(0) NOT NULL,
    "shiftType" TEXT NOT NULL,

    CONSTRAINT "Shifts_pkey" PRIMARY KEY ("shiftId")
);

-- CreateTable
CREATE TABLE "PurchaseStates" (
    "purchaseStateId" SERIAL NOT NULL,
    "purchaseState" TEXT NOT NULL,

    CONSTRAINT "PurchaseStates_pkey" PRIMARY KEY ("purchaseStateId")
);

-- CreateTable
CREATE TABLE "Positions" (
    "positionId" SERIAL NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Positions_pkey" PRIMARY KEY ("positionId")
);

-- CreateTable
CREATE TABLE "UserTypes" (
    "userTypeintId" SERIAL NOT NULL,
    "userType" TEXT NOT NULL,

    CONSTRAINT "UserTypes_pkey" PRIMARY KEY ("userTypeintId")
);

-- CreateTable
CREATE TABLE "ExpenseByCategory" (
    "expenseByCategoryId" TEXT NOT NULL,
    "expenseSummaryId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" BIGINT NOT NULL,
    "amount" BIGINT NOT NULL,

    CONSTRAINT "ExpenseByCategory_pkey" PRIMARY KEY ("expenseByCategoryId")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "expenseId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("expenseId")
);

-- CreateTable
CREATE TABLE "SalesSummary" (
    "salesSummaryId" TEXT NOT NULL,
    "totalValue" DECIMAL(10,2) NOT NULL,
    "changePercentage" DECIMAL(5,2),
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalesSummary_pkey" PRIMARY KEY ("salesSummaryId")
);

-- CreateTable
CREATE TABLE "PurchaseSummary" (
    "purchaseSummaryId" TEXT NOT NULL,
    "totalPurchased" DECIMAL(10,2) NOT NULL,
    "changePercentage" DECIMAL(5,2),
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseSummary_pkey" PRIMARY KEY ("purchaseSummaryId")
);

-- CreateTable
CREATE TABLE "ExpenseSummary" (
    "expenseSummaryId" TEXT NOT NULL,
    "totalExpenses" DECIMAL(10,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("expenseSummaryId")
);

-- CreateIndex
CREATE INDEX "purchasedetails_productid_index" ON "PurchaseDetails"("productId");

-- CreateIndex
CREATE INDEX "purchasedetails_purchaseid_index" ON "PurchaseDetails"("purchaseId");

-- CreateIndex
CREATE INDEX "users_usertypeid_index" ON "Users"("userTypeId");

-- CreateIndex
CREATE INDEX "sales_userid_index" ON "Sales"("userId");

-- CreateIndex
CREATE INDEX "purchases_userid_index" ON "Purchases"("userId");

-- CreateIndex
CREATE INDEX "purchases_purchasestateid_index" ON "Purchases"("purchaseStateId");

-- CreateIndex
CREATE INDEX "saledetails_productid_index" ON "SaleDetails"("productId");

-- CreateIndex
CREATE INDEX "saledetails_saleid_index" ON "SaleDetails"("saleId");

-- CreateIndex
CREATE INDEX "employees_userid_index" ON "Employees"("userId");

-- CreateIndex
CREATE INDEX "employees_positionid_index" ON "Employees"("positionId");

-- CreateIndex
CREATE INDEX "employees_shiftid_index" ON "Employees"("shiftId");

-- CreateIndex
CREATE INDEX "predictiondetails_productid_index" ON "PredictionDetails"("productId");

-- CreateIndex
CREATE INDEX "predictiondetails_purchasepredictionid_index" ON "PredictionDetails"("purchasePredictionId");

-- CreateIndex
CREATE INDEX "products_producttypeid_index" ON "Products"("productTypeId");

-- CreateIndex
CREATE INDEX "products_supplierid_index" ON "Products"("supplierId");

-- CreateIndex
CREATE INDEX "expensebycategory_expensesummaryid_index" ON "ExpenseByCategory"("expenseSummaryId");

-- AddForeignKey
ALTER TABLE "PurchaseDetails" ADD CONSTRAINT "PurchaseDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetails" ADD CONSTRAINT "PurchaseDetails_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchases"("purchaseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserTypes"("userTypeintId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_purchaseStateId_fkey" FOREIGN KEY ("purchaseStateId") REFERENCES "PurchaseStates"("purchaseStateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetails" ADD CONSTRAINT "SaleDetails_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sales"("saleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Positions"("positionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shifts"("shiftId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionDetails" ADD CONSTRAINT "PredictionDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionDetails" ADD CONSTRAINT "PredictionDetails_purchasePredictionId_fkey" FOREIGN KEY ("purchasePredictionId") REFERENCES "PurchasePredictions"("purchasePredictionsId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("supplierId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductTypes"("productTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseByCategory" ADD CONSTRAINT "ExpenseByCategory_expenseSummaryId_fkey" FOREIGN KEY ("expenseSummaryId") REFERENCES "ExpenseSummary"("expenseSummaryId") ON DELETE RESTRICT ON UPDATE CASCADE;
