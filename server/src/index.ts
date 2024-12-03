import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/* ROUTE IMPORTS */
import dashboardRoutes from "./routes/dashboardRoutes"
import productRoutes from "./routes/productRoutes";
import productTypeRoutes from "./routes/productTypeRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import userRoutes from "./routes/userRoutes";
import userTypeRoutes from "./routes/userTypeRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import loginRoutes from "./routes/loginRoutes";
import authenticateToken from "./authMiddleware";
import purchaseRoutes from "./routes/purchaseRoutes";
import purchaseDetailsRoutes from "./routes/purchaseDetailsRoutes";
import clientRoutes from "./routes/clientRoutes";
import saleRoutes from "./routes/saleRoutes";
import saleDetailsRoutes from "./routes/saleDetailsRoutes";
import datasetRoutes from "./routes/datasetRoutes";
import datasetPredictionRoutes from "./routes/datasetPredictionRoutes";
import fetchJsonRoutes from "./routes/fetchJsonRoutes";
import monthlyBudgetRoutes from "./routes/monthlyBudgetRoutes";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
app.use(cors());    

/* ROUTES */
app.use("/dashboard", authenticateToken([1]), dashboardRoutes) //http://localhost:8000/dashboard
app.use("/products", authenticateToken([1,2]),productRoutes) //http://localhost:8000/products
app.use("/product-types", authenticateToken([1,2]), productTypeRoutes) //http://localhost:8000/product-types
app.use("/suppliers", authenticateToken([1,2]), supplierRoutes) //http://localhost:8000/suppliers
app.use("/users", authenticateToken([1]), userRoutes) //http://localhost:8000/users
app.use("/user-types", authenticateToken([1,2]), userTypeRoutes) //http://localhost:8000/user-types
app.use("/expenses", authenticateToken([1,2]), expenseRoutes) //http://localhost:8000/expenses
app.use("/purchases", authenticateToken([1,2]), purchaseRoutes) //http://localhost:8000/purchases
app.use("/purchase-details", authenticateToken([1,2]), purchaseDetailsRoutes) //http://localhost:8000/purchase-details
app.use("/sales", authenticateToken([1,2]), saleRoutes) //http://localhost:8000/sales
app.use("/sale-details", authenticateToken([1,2]), saleDetailsRoutes) //http://localhost:8000/sale-details
app.use("/clients", authenticateToken([1]), clientRoutes) //http://localhost:8000/clients
app.use("/login", loginRoutes) //http://localhost:8000/login
app.use("/dataset", datasetRoutes) //http://localhost:8000/dataset
app.use("/dataset-prediction", datasetPredictionRoutes) //http://localhost:8000/dataset-prediction
app.use("/fetch-json", fetchJsonRoutes) //http://localhost:8000/fetch-json
app.use("/monthly-budget", monthlyBudgetRoutes) //http://localhost:8000/monthly-budget

app.use(express.static('public'));

/* SERVER */
const port = process.env.PORT || 3001;
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})