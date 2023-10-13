import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import { AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

type ProductInput = {
  productName: string;
  brandName: string;
  price: number;
  image?: string;
  tag?: string;
  discount?: number;
  dbId: string;
};

const ProductCard = ({
  productName,
  brandName,
  price,
  image,
  tag,
  discount,
  dbId,
}: ProductInput) => {
  let showDiscount = false;

  if (discount && discount > 0) {
    showDiscount = true;
  }

  const [isFavourite, setIsFavourite] = useState(false);

  let heartColor = "fill-slate-500";

  if (isFavourite) {
    heartColor = "fill-red-500";
  }

  const onClickHeart = () => {
    setIsFavourite((value) => !value);
  };

  return (
    <div className=" flex w-full flex-col gap-3 tracking-wide">
      <Link href={`/products/${dbId}`}>
        <div className="relative flex w-full justify-center bg-gray-500">
          {image ? (
            <Image
              width={311}
              height={389}
              src={image}
              alt={`${productName} Product Image`}
              className="w-full"
            />
          ) : (
            <div>No image</div>
          )}
          {tag && (
            <div className="absolute bottom-2 right-2 bg-slate-950 px-4 py-2 text-slate-100">
              {tag}
            </div>
          )}
          {showDiscount && (
            <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-slate-100">
              {`-${discount}%`}
            </div>
          )}
        </div>
      </Link>
      <div className="flex justify-between">
        <Link href={`/products/${dbId}`}>
          <div className="flex flex-col gap-0.5 font-light text-slate-900">
            <p>{brandName.toUpperCase()}</p>
            <p>{productName}</p>
            <p>{`$${price}`}</p>
          </div>
        </Link>
        <button className="h-fit w-fit" onClick={onClickHeart}>
          <AiOutlineHeart size={25} className={`mr-1 ${heartColor}`} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
