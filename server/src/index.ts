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

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());    

/* ROUTES */
app.use("/dashboard", authenticateToken, dashboardRoutes) //http://localhost:8000/dashboard
app.use("/products",  authenticateToken, productRoutes) //http://localhost:8000/products
app.use("/product-types",  authenticateToken, productTypeRoutes) //http://localhost:8000/product-types
app.use("/suppliers", authenticateToken, supplierRoutes) //http://localhost:8000/suppliers
app.use("/users", authenticateToken, userRoutes) //http://localhost:8000/users
app.use("/user-types", authenticateToken, userTypeRoutes) //http://localhost:8000/user-types
app.use("/expenses",  authenticateToken, expenseRoutes) //http://localhost:8000/expenses
app.use("/login", loginRoutes) //http://localhost:8000/login

/* SERVER */
const port = process.env.PORT || 3001;
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})