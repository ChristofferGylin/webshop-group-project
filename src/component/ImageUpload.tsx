import { type ProductImage } from "@prisma/client";
import {
  type ChangeEvent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

type ImageProps = {
  imgType: "products" | "brands";
  parentId: string;
  callback: (newImg: ProductImage) => void;
};

const ImageUpload = ({ imgType, parentId, callback }: ImageProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [userMessage, setUserMessage] = useState("");
  const fileInput = useRef<HTMLInputElement | null>(null);

  const uploadToClient = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const uploadedImage = event.target.files?.[0];

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
    }
  };

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
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
      if (response.ok) {
        const data = (await response.json()) as ProductImage;
        callback(data);
        setImage(null);
      } else {
        // do other stuff
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!image) return;

    void uploadToServer();
  }, [image]);

  return (
    <div className="aspect-square h-full">
      <input
        type="file"
        name="imgUpload"
        onChange={uploadToClient}
        ref={fileInput}
        className="hidden"
      />
      <button
        type="submit"
        onClick={handleClick}
        className="group flex h-full w-full items-center justify-center rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200"
      >
        <AiOutlineCloudUpload className="text-3xl text-slate-500 group-hover:text-slate-700" />
      </button>
      <p>{userMessage}</p>
    </div>
  );
};

export default ImageUpload;
