import { RequestHandler } from "express";
import { join } from "path";
import publicDir from "../config/publicDir";

const webRoute: RequestHandler = async (_, res) => {
  res.status(200).sendFile(join(publicDir, "index.html"));
};

export default webRoute;
