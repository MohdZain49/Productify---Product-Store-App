import express from "express";
import cors from "cors";

import { ENV } from "./configs/env";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(clerkMiddleware()); // auth obj will be attached to the req
app.use(express.json()); // parser JSON request bodies.
app.use(express.urlencoded({ extended: true })); // parses form data (like HTML forms)

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comment: "/api/commets",
    },
  });
});

const { PORT } = ENV;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
