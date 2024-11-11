"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
function deleteAllData(orderedFileNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const modelNames = orderedFileNames.map((fileName) => {
            const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            return modelName.charAt(0).toUpperCase() + modelName.slice(1);
        });
        for (const modelName of modelNames) {
            const model = prisma[modelName];
            if (model) {
                yield model.deleteMany({});
                console.log(`Cleared data from ${modelName}`);
            }
            else {
                console.error(`Model ${modelName} not found. Please ensure the model name is correctly specified.`);
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataDirectory = path_1.default.join(__dirname, "seedData");
        // Deletion order
        const deletionOrder = [
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
        yield deleteAllData(deletionOrder);
        // Seeding data in the creation order
        for (const fileName of creationOrder) {
            const filePath = path_1.default.join(dataDirectory, fileName);
            let jsonData;
            try {
                jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
            }
            catch (error) {
                console.error(`Error parsing JSON from file ${fileName}:`);
                continue;
            }
            if (jsonData.length === 0) {
                console.log(`Skipping ${fileName} as it is empty.`);
                continue;
            }
            const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            const model = prisma[modelName];
            if (!model) {
                console.error(`No Prisma model matches the file name: ${fileName}`);
                continue;
            }
            for (const data of jsonData) {
                yield model.create({
                    data,
                });
            }
            console.log(`Seeded ${modelName} with data from ${fileName}`);
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
