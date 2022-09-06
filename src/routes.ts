import { Request, Response, Router } from "express";
import { Readable } from "stream";
import readline from "readline";

import multer from "multer";
import { client } from "./database/client";

const multerConfig = multer();

const router = Router();

interface Universities {
  sigla: string;
  name: string;
  city: string;
  state: string;
}

router.post("/universities", multerConfig.single("file"), async (request:Request, response:Response) => {
  const { file } = request;
  const { buffer }:any = file;

  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);
  //console.log(request.file?.buffer.toString('utf-8'));

  const universitiesLine = readline.createInterface({
    input: readableFile
  });

  const universities: Universities[] = []

  for await(let line of universitiesLine) {
      const universitiesLineSplit = line.split(";");
    
    universities.push({
      sigla: universitiesLineSplit[1],
      name: universitiesLineSplit[2],
      city: universitiesLineSplit[31],
      state: universitiesLineSplit[32],
    })
    //console.log(universitiesLineSplit[2]);
  }

  for await ( let { sigla , name, city, state } of universities.slice(1)) {
    await client.universities.create({
      data: {
        sigla,
        name,
        city,
        state,
      },
    });
  }

    return response.json(universities.slice(1));
  }
);

export { router };