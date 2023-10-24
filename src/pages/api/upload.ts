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

// Function that saves the image to the filesystem (in /public) using nodes built in fs module

const saveFile = async (file: File, path: string) => {
  // read the image data from memory using file.filepath and save in data variable

  const data = fs.readFileSync(file.filepath);

  // write image file to file system, using the path variable to build a sting for the filepath, including filename (where the file will be saved)
  fs.writeFileSync(`./public${path}`, data);
  //delete image from memory
  await fs.unlinkSync(file.filepath);
  return;
};

// route to handle image upload request

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // check auth, if user is not logged in and role is admin request is denied

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

    // if user is auth:ed, formidable is used to parse the image data

    if (req.method === "POST") {
      const form = formidable({});

      // parsed object will have the properties fields, which is an object and contain any text fields included in the request,
      // and files is an array, which in this case include the image file. The

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log("Error:", err);
          res.status(500).send(err.message);
          return;
        }

        let fileExtension;

        // deny request if image is too large

        if (files.file && files.file[0]) {
          if (files.file[0].size > 20971520) {
            res.status(413).end();
            return;
          }

          // determine file type, if not allowed deny request, if allowed type, set variable fileExtension to correct file ending (will be used to create image name and path in file system)

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

          // create id for database, and use the same for filename
          const dbId = uuidv4();
          const path = `/images/${fields.imgType}/${dbId}${fileExtension}`;
          let newImg;

          // write info to db

          if (
            fields &&
            fields.parentId &&
            fields.parentId[0] &&
            fields.imgType &&
            fields.imgType[0]
          ) {
            let dbData;

            // if image type from input fileds is "product" (different from file type on actual file!), make request for other images related to the same product,
            // use length of returned array to calculate sortOrder (index number for putting images in right order on frontend)

            if (fields.imgType[0] === "products") {
              const existingImages = await db.productImage.findMany({
                where: { productId: fields.parentId[0] },
              });

              dbData = {
                id: dbId,
                url: path,
                sortOrder: existingImages.length,
                Product: {
                  connect: { id: fields.parentId[0] },
                },
              };
            } else {
              // if image type is not "product", check database for existing images related to the same brand as input via form,
              // if exist, delete from database and filesystem

              const existingImages = await db.productImage.findMany({
                where: { brand: { id: fields.parentId[0] } },
              });

              if (existingImages.length > 0) {
                if (existingImages[0]) {
                  // delete image file from file system

                  fs.unlinkSync(existingImages[0]?.url);

                  // detete from db

                  await db.productImage.delete({
                    where: {
                      id: existingImages[0].id,
                    },
                  });
                }
              }

              dbData = {
                id: dbId,
                url: path,
                sortOrder: 0,
                brand: {
                  connect: { id: fields.parentId[0] },
                },
              };
            }

            // write to db

            newImg = await db.productImage.create({
              data: dbData,
            });
          }

          // save file to file system and end request.

          saveFile(files.file[0], path);
          res.json(newImg);
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
