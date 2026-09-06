import Image from "next/image";
import Link from "next/link";
import { CollectionProduct, formatVnd } from "./collectionsData";

export function ProductGridCard({ product }: { product: CollectionProduct }) {
  const onSale = product.compareAt && product.compareAt > product.price;
  return (
    <Link href={product.href} className="group block">
      <div className="relative aspect-square w-full overflow-hidden bg-[#f3efe8]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-hella-green px-2 py-0.5 text-[11px] font-medium text-white">
            Sale
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-black">{formatVnd(product.price)}</span>
          {onSale && (
            <span className="text-sm text-black/40 line-through">{formatVnd(product.compareAt!)}</span>
          )}
        </div>
        <p className="mt-1 text-xs text-black/50">Hella Beauty</p>
        <h3 className="mt-1 text-sm leading-snug text-black transition-colors group-hover:text-hella-green">
          {product.title}
        </h3>
      </div>
    </Link>
  );
}
