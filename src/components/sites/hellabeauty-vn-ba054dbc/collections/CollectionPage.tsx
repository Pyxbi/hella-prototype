"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { ChevronDownIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import { ProductGridCard } from "./ProductGridCard";
import {
  CollectionData,
  collectionBannerImage,
  priceRanges,
  sortOptions,
  type SortId,
} from "./collectionsData";
import { cn } from "@/lib/utils";

const promoOptions = [
  { id: "new", label: "Sản Phẩm Mới" },
  { id: "bestseller", label: "Sản Phẩm Bán Chạy" },
  { id: "sale", label: "Sản Phẩm Khuyến Mãi" },
];

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-black/10 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-heading text-base text-black">{title}</span>
        <ChevronDownIcon className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-black/80">
      <span
        onClick={onChange}
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center border transition-colors",
          checked ? "border-hella-green bg-hella-green text-white" : "border-black/30 bg-white",
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M2 6l3 3 5-6" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

export function CollectionPage({ data }: { data: CollectionData }) {
  const [promos, setPromos] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [sort, setSort] = useState<SortId>("featured");

  const toggle = (arr: string[], set: (v: string[]) => void, id: string) =>
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  const visible = useMemo(() => {
    let list = data.products.filter((p) => {
      if (promos.length) {
        const match =
          (promos.includes("new") && p.isNew) ||
          (promos.includes("bestseller") && p.isBestSeller) ||
          (promos.includes("sale") && p.compareAt && p.compareAt > p.price);
        if (!match) return false;
      }
      if (prices.length) {
        const inRange = prices.some((id) => {
          const r = priceRanges.find((x) => x.id === id);
          return r && p.price >= r.min && p.price <= r.max;
        });
        if (!inRange) return false;
      }
      return true;
    });
    const by = [...list];
    switch (sort) {
      case "bestselling":
        by.sort((a, b) => Number(b.isBestSeller ?? 0) - Number(a.isBestSeller ?? 0));
        break;
      case "name-asc":
        by.sort((a, b) => a.title.localeCompare(b.title, "vi"));
        break;
      case "name-desc":
        by.sort((a, b) => b.title.localeCompare(a.title, "vi"));
        break;
      case "price-asc":
        by.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        by.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        by.reverse();
        break;
      default:
        break;
    }
    list = by;
    return list;
  }, [data.products, promos, prices, sort]);

  return (
    <>
      <Header />

      {/* Cream banner */}
      <section className="flex items-center justify-center bg-[#fff4e4] px-5 py-16 lg:py-20">
        <Image
          src={collectionBannerImage}
          alt="Our line of haircare, facial and bodycare"
          width={760}
          height={40}
          className="h-auto w-full max-w-[760px]"
          priority
        />
      </section>

      <main className="mx-auto max-w-[1400px] flex-1 px-5 py-8 lg:px-10">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-black/50">
          <Link href="/" className="hover:text-hella-green">
            TRANG CHỦ
          </Link>{" "}
          › Danh mục › <span className="text-black/80">{data.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* Sidebar */}
          <aside>
            <h2 className="font-heading text-lg tracking-wide text-black">BỘ LỌC</h2>
            <FilterGroup title="Thương hiệu">
              <Check label="Hella Beauty" checked onChange={() => {}} />
            </FilterGroup>
            <FilterGroup title="Chương trình khuyến mãi">
              {promoOptions.map((o) => (
                <Check
                  key={o.id}
                  label={o.label}
                  checked={promos.includes(o.id)}
                  onChange={() => toggle(promos, setPromos, o.id)}
                />
              ))}
            </FilterGroup>
            <FilterGroup title="Giá sản phẩm">
              {priceRanges.map((r) => (
                <Check
                  key={r.id}
                  label={r.label}
                  checked={prices.includes(r.id)}
                  onChange={() => toggle(prices, setPrices, r.id)}
                />
              ))}
            </FilterGroup>
            <FilterGroup title="Loại sản phẩm">
              <Check label={data.productType} checked onChange={() => {}} />
            </FilterGroup>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-black/70">{visible.length} sản phẩm</p>
              <label className="flex items-center gap-2 text-sm text-black/70">
                <span>Lọc</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortId)}
                  className="border border-black/15 bg-white px-3 py-1.5 text-sm text-black outline-none focus:border-hella-green"
                >
                  {sortOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {visible.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
                {visible.map((p) => (
                  <ProductGridCard key={p.title} product={p} />
                ))}
              </div>
            ) : (
              <p className="py-20 text-center text-sm text-black/50">
                Không có sản phẩm phù hợp với bộ lọc.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
