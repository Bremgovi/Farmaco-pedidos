import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  // Deletion order
  const deletionOrder = [
    "monthlyBudget.json",
    "purchaseDetails.json",
    "saleDetails.json",
    "predictionDetails.json",
    "products.json",
    "purchasePredictions.json",
    "purchases.json",
    "sales.json",
    "clients.json",
    "transactionStatus.json",
    "employees.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
    "expenseSummary.json",
    "salesSummary.json",
    "purchaseSummary.json",
    "productTypes.json",
    "suppliers.json",
    "shifts.json",
    "userTypes.json",
    "positions.json",
  ];

  // Creation order
  const creationOrder = [
    "monthlyBudget.json",
    "productTypes.json",
    "suppliers.json",
    "userTypes.json",
    "positions.json",
    "shifts.json",
    "users.json",
    "employees.json",
    "clients.json",
    "transactionStatus.json",
    "sales.json",
    "purchases.json",
    "purchasePredictions.json",
    "products.json",
    "predictionDetails.json",
    "saleDetails.json",
    "purchaseDetails.json",
    "expenses.json",
    "expenseSummary.json",
    "expenseByCategory.json",
    "salesSummary.json",
    "purchaseSummary.json",
  ];

  // Deleting data in the specified order
  await deleteAllData(deletionOrder);

  // Seeding data in the creation order
  for (const fileName of creationOrder) {
    const filePath = path.join(dataDirectory, fileName);
    let jsonData;

    try {
      jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (error) {
      console.error(`Error parsing JSON from file ${fileName}:`);
      continue;
    }

    if (jsonData.length === 0) {
      console.log(`Skipping ${fileName} as it is empty.`);
      continue;
    }
    
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
