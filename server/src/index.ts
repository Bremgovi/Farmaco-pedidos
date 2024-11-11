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
app.use("/dashboard", authenticateToken(), dashboardRoutes) //http://localhost:8000/dashboard
app.use("/products", authenticateToken(),productRoutes) //http://localhost:8000/products
app.use("/product-types", authenticateToken(), productTypeRoutes) //http://localhost:8000/product-types
app.use("/suppliers", authenticateToken(), supplierRoutes) //http://localhost:8000/suppliers
app.use("/users", authenticateToken(1), userRoutes) //http://localhost:8000/users
app.use("/user-types", authenticateToken(), userTypeRoutes) //http://localhost:8000/user-types
app.use("/expenses", authenticateToken(), expenseRoutes) //http://localhost:8000/expenses
app.use("/purchases", authenticateToken(), purchaseRoutes) //http://localhost:8000/purchases
app.use("/purchase-details", authenticateToken(), purchaseDetailsRoutes) //http://localhost:8000/purchase-details
app.use("/sales", authenticateToken(), saleRoutes) //http://localhost:8000/sales
app.use("/sale-details", authenticateToken(), saleDetailsRoutes) //http://localhost:8000/sale-details
app.use("/clients", authenticateToken(), clientRoutes) //http://localhost:8000/clients
app.use("/login", loginRoutes) //http://localhost:8000/login

/* SERVER */
const port = process.env.PORT || 3001;
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})