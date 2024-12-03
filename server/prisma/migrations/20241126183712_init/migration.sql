-- CreateTable
CREATE TABLE "MonthlyBudget" (
    "monthlyBudgetId" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "budget" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "MonthlyBudget_pkey" PRIMARY KEY ("monthlyBudgetId")
);
