import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";

import { encryptPassword } from "./utils";
import { db, initDB } from "../src/db/db";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRY: string = "24h";

const app = express();
initCors();
app.use(bodyParser.json());

//#region: Auth middleware
const register = async (req, res) => {
  const { username, password } = req.body;

  await db.read();
  const existingUser = db.data?.users.find(user => user.username === username);
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await encryptPassword(password);
  db.data?.users.push({ username, hashedPassword });
  await db.write();

  const token = jwt.sign({ username }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRY,
  });

  res.status(201).json({ message: "User registered successfully", token });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  await db.read();
  const user = db.data?.users.find(user => user.username === username);
  if (!user)
    return res.status(400).json({ message: "Invalid username or password" });

  const isValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isValid)
    return res.status(400).json({ message: "Invalid username or password" });

  const token = jwt.sign({ username }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRY,
  });

  res.status(200).json({ message: "Login successful", token });
};
//#endregion

//#region: API routes
app.get("/", (_, res) => {
  res.send("Welcome to Authy API!");
});
app.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.body.username}` });
});

app.post("/register", register);
app.post("/login", login);

app.listen(5000, async () => {
  await initDB();

  await db.read();
  const rootUser = db.data?.users.find(user => user.username === "root");
  if (!rootUser) {
    db.data?.users.push({
      username: "root",
      hashedPassword: await encryptPassword("admin1"),
    });
    await db.write();
    console.log("Root user created with password admin1");
  }

  console.log("API running at http://localhost:5000");
});
//#endregion

//#region Middlewares
// JWT Middleware
function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { username: string };
    req.body.username = decoded.username;
    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}
// CORS Middleware
function initCors() {
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );
}
//#endregion
