"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
/* ROUTE IMPORTS */
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const productTypeRoutes_1 = __importDefault(require("./routes/productTypeRoutes"));
const supplierRoutes_1 = __importDefault(require("./routes/supplierRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const userTypeRoutes_1 = __importDefault(require("./routes/userTypeRoutes"));
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const authMiddleware_1 = __importDefault(require("./authMiddleware"));
const purchaseRoutes_1 = __importDefault(require("./routes/purchaseRoutes"));
const purchaseDetailsRoutes_1 = __importDefault(require("./routes/purchaseDetailsRoutes"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: false }));
app.use((0, cors_1.default)());
/* ROUTES */
app.use("/dashboard", (0, authMiddleware_1.default)(), dashboardRoutes_1.default); //http://localhost:8000/dashboard
app.use("/products", (0, authMiddleware_1.default)(), productRoutes_1.default); //http://localhost:8000/products
app.use("/product-types", (0, authMiddleware_1.default)(), productTypeRoutes_1.default); //http://localhost:8000/product-types
app.use("/suppliers", (0, authMiddleware_1.default)(), supplierRoutes_1.default); //http://localhost:8000/suppliers
app.use("/users", (0, authMiddleware_1.default)(1), userRoutes_1.default); //http://localhost:8000/users
app.use("/user-types", (0, authMiddleware_1.default)(), userTypeRoutes_1.default); //http://localhost:8000/user-types
app.use("/expenses", (0, authMiddleware_1.default)(), expenseRoutes_1.default); //http://localhost:8000/expenses
app.use("/purchases", (0, authMiddleware_1.default)(), purchaseRoutes_1.default); //http://localhost:8000/purchases
app.use("/purchase-details", (0, authMiddleware_1.default)(), purchaseDetailsRoutes_1.default); //http://localhost:8000/purchase-details
app.use("/login", loginRoutes_1.default); //http://localhost:8000/login
/* SERVER */
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
