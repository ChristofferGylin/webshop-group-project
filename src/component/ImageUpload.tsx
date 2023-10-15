import Image from "next/image";
import { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    body.append("pathName", "holabaloo");
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });
    if (!response.ok) {
      // do stuff
    } else {
      // do other stuff
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
