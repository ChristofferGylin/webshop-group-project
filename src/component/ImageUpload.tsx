import Image from "next/image";
import { useState } from "react";

type ImageProps = {
  imgType: string;
  parentId: string;
};

const ImageUpload = ({
  imgType = "products",
  parentId = "clnndeni20004nvtgd7hnar51",
}: ImageProps) => {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
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

  const uploadToServer = async (event) => {
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
