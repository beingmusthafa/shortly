import express, { Request, Response, NextFunction } from "express";
import connectToDb from "./config/database.js";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import LinksRepository from "./repositories/links.repository.js";
import customError from "./utils/error.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
connectToDb();
dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_BASE_URL,
    })
  );
}
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: process.env.MONGO_URL }),
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth", authRouter);
app.use("/api/", userRouter);

app.options("*", (req: Request, res: Response) => {
  res.end();
});

app.get(
  "/:shortLink",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const linksRepository = new LinksRepository();
      const { shortLink } = req.params;
      const link = (await linksRepository.findOne({ shortLink }))?.toObject();
      if (!link) {
        res.sendFile(path.join(__dirname, "../public", "notFound.html"));
        return;
      }
      res.redirect(link?.originalLink);
    } catch (error) {
      console.log(error);
      next(customError(error.message, 500));
    }
  }
);

app.use(errorMiddleware);
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server started");
});
//test #2
