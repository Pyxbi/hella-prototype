import type { Metadata } from "next";
import { CollectionPage } from "@/components/sites/hellabeauty-vn-ba054dbc/collections/CollectionPage";
import { collections } from "@/components/sites/hellabeauty-vn-ba054dbc/collections/collectionsData";

export const metadata: Metadata = { title: "Chăm Sóc Da Mặt – Hella Beauty" };

export default function Page() {
  return <CollectionPage data={collections["cham-soc-da-mat"]} />;
}
