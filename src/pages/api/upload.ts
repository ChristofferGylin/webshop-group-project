import formidable, { File } from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "~/server/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: File, path: string) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(path, data);
  await fs.unlinkSync(file.filepath);
  return;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).end();
      return;
    }

    if (session.user.role !== "admin") {
      res.status(403).end();
      return;
    }

    if (req.method === "POST") {
      const form = formidable({});

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log("Error:", err);
          res.status(500).send(err.message);
          return;
        }

        let fileExtension;

        if (files.file && files.file[0]) {
          if (files.file[0].size > 20971520) {
            res.status(413).end();
            return;
          }

          switch (files.file[0].mimetype) {
            case "image/jpg":
            case "image/jpeg":
              fileExtension = ".jpg";
              break;

            case "image/png":
              fileExtension = ".png";
              break;

            case "image/webp":
              fileExtension = ".webp";

            default:
              res.status(415).end();
              return;
          }
          const dbId = uuidv4();
          const path = `./public/images/${fields.imgType}/${dbId}${fileExtension}`;

          if (
            fields &&
            fields.parentId &&
            fields.parentId[0] &&
            fields.imgType &&
            fields.imgType[0]
          ) {
            let dbData;

            if (fields.imgType[0] === "products") {
              dbData = {
                id: dbId,
                url: path,
                Product: {
                  connect: { id: fields.parentId[0] },
                },
              };
            } else {
              dbData = {
                id: dbId,
                url: path,
                brand: {
                  connect: { id: fields.parentId[0] },
                },
              };
            }

            await db.productImage.create({
              data: dbData,
            });
          }

          saveFile(files.file[0], path);
          res.json({ id: dbId });
        }
      });
    } else {
      res.status(405).end();
    }
  } catch (e) {
    let message;

    if (e instanceof Error) {
      message = e.message;
    } else {
      message = String(e);
    }

    res.status(500).send(message);
  }
};

export default handler;
