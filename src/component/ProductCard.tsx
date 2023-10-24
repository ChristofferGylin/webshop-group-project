import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import { AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import subtractPercent from "~/utils/subtractPercent";

type ProductInput = {
  productName: string;
  brandName: string;
  price: number;
  image: string;
  tagline?: string;
  discount?: number;
  dbId: string;
};

const ProductCard = ({
  productName,
  brandName,
  price,
  image,
  tagline,
  discount = 0,
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
          <Image
            width={320}
            height={400}
            src={image}
            alt={`${productName} Product Image`}
            className="w-full"
          />
          {tagline && (
            <div className="absolute bottom-2 right-2 bg-slate-950 px-4 py-2 text-slate-100">
              {tagline}
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
            {showDiscount ? (
              <p className="flex gap-4 font-medium">
                <span className="text-red-500">
                  ${subtractPercent(price, discount).toFixed(2)}
                </span>
                <span className="line-through">${price.toFixed(2)}</span>
              </p>
            ) : (
              <p>${price.toFixed(2)}</p>
            )}
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
