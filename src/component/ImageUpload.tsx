import Image from "next/image";
import { useState, useEffect, useRef, ChangeEvent } from "react";

type ImageProps = {
  imgType: string;
  parentId: string;
};

const ImageUpload = ({
  imgType = "brands",
  parentId = "clnt0onv70001nva4pccpczhu",
}: ImageProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);
  const [userMessage, setUserMessage] = useState("");
  const fileInput = useRef<HTMLInputElement | null>(null);

  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedImage = event.target.files[0];

      if (uploadedImage.size > 20971520) {
        setUserMessage("File too large, maximum file size is 20MB.");
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
        setUserMessage("Wrong file format. Only JPG, PNG and WEBP is allowed.");
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

  const handleClick = () => {
    if (fileInput && fileInput.current) {
      fileInput.current.click();
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

        <input
          type="file"
          name="imgUpload"
          onChange={uploadToClient}
          ref={fileInput}
          className="hidden"
        />
        <button type="submit" onClick={handleClick}>
          Send to server
        </button>
        <p>{userMessage}</p>
      </div>
    </div>
  );
};

export default ImageUpload;
