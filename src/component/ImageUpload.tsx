import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";

type ImageProps = {
  imgType: string;
  parentId: string;
};

const ImageUpload = ({
  imgType = "products",
  parentId = "clnndf6ag0005nvtgv2xnuxsk",
}: ImageProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);

  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedImage = event.target.files[0];
      console.log("image:", uploadedImage);

      if (uploadedImage.size > 20971520) {
        // too big
        return;
      }

      let isTypeOk = false;

      switch (uploadedImage.type) {
        case "image/jpg":
        case "image/jpeg":
        case "image/png":
        case "image/webp":
          isTypeOk = true;
          break;
      }

      if (!isTypeOk) {
        // wrong file type
        return;
      }

      setImage(uploadedImage);
      setCreateObjectURL(URL.createObjectURL(uploadedImage));
    }
  };

  const uploadToServer = async () => {
    const body = new FormData();
    if (image) {
      body.append("file", image);
      body.append("imgType", imgType);
      body.append("parentId", parentId);
      const response = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      if (!response.ok) {
        // do stuff
      } else {
        // do other stuff
      }
    }
  };

  useEffect(() => {
    if (!image) return;

    uploadToServer();
  }, [image]);

  return (
    <div>
      <div>
        {createObjectURL && (
          <Image
            src={createObjectURL}
            height={400}
            width={400}
            alt="image preview"
          />
        )}
        <h4>Select Image</h4>
        <input type="file" name="imgUpload" onChange={uploadToClient} />
        <button type="submit" onClick={uploadToServer}>
          Send to server
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
