import type { Metadata } from "next";
import { CollectionPage } from "@/components/sites/hellabeauty-vn-ba054dbc/collections/CollectionPage";
import { collections } from "@/components/sites/hellabeauty-vn-ba054dbc/collections/collectionsData";

export const metadata: Metadata = { title: "Bộ sưu tập Bodymist – Hella Beauty" };

export default function Page() {
  return <CollectionPage data={collections["bo-suu-tap-bodymist"]} />;
}
