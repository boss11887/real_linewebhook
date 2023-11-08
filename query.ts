import { Request, Response } from "express";
import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_LINE_HOST,
  port: process.env.DB_LINE_PORT,
  database: process.env.DB_LINE_DATABASE,
  user: process.env.DB_LINE_USERNAME,
  password: process.env.DB_LINE_PASSWORD,
  ssl: true,
});

const getUsers = (req: Request, res: Response) => {
  pool.query("SELECT * FROM pgtest", (error: Error, result: QueryResult) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

export { getUsers };
