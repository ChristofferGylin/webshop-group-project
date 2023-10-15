import formidable from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

type FormFile = {
  filepath: string;
  originalFilename: string;
};

const saveFile = async (file: FormFile) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.originalFilename}`, data);
  await fs.unlinkSync(file.filepath);
  return;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).send("You must be logged in to access this resource.");
      return;
    }

    if (session.user.role !== "admin") {
      res.status(403).send("You are not allowed to access this resource.");
      return;
    }

    if (req.method === "POST") {
      const form = formidable({});

      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log("Error:", err);
          res.status(500).send(err.message);
          return;
        }

        let fileExtension;

        if (files.file && files.file[0]) {
          if (files.file[0].size > 20971520) {
            res.status(413).send("File size may not exceed 20MB");
            return;
          }

          console.log("fields:", fields);
          console.log("files.file[0]:", files.file[0]);
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
              res
                .status(415)
                .send("Only jpeg, png and webp file formats are allowed");
              return;
          }

          saveFile(files.file[0]);
          res.json({ fields, files });
        }
      });
    } else {
      res.status(405).send("Method not allowed");
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
