import { AnnouncementBar } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/AnnouncementBar";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { BannerCarousel } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/BannerCarousel";
import { Marquee } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Marquee";
import { CollectionBanner } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/CollectionBanner";
import { ProductTabHeading } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/ProductTabHeading";
import { ProductCarousel } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/ProductCarousel";
import { ImageCarousel } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/ImageCarousel";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { HellaSis } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSis";
import { TikTokFeed } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/TikTokFeed";
import { FactoryShowcase } from "@/components/sites/hellabeauty-vn-ba054dbc/factory/FactoryShowcase";
import { IngredientShowcase } from "@/components/sites/hellabeauty-vn-ba054dbc/ingredients/IngredientShowcase";
import { TransparencyStrip } from "@/components/sites/hellabeauty-vn-ba054dbc/ingredients/TransparencyStrip";
import {
  collectionList1,
  collectionList2,
  heroSlides,
  instagramSection,
  shopTheLook,
  slideshow2,
  vendorSection,
} from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/data";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <BannerCarousel slides={heroSlides} priority />
        <Marquee text="Hella Beauty" />
        <BannerCarousel slides={slideshow2} />
        <Marquee text="Free Shipping - Instant Delivery" duration={26} />

        <CollectionBanner />
        <ProductTabHeading />

        <ProductCarousel
          subtitle={collectionList1.subtitle}
          title={collectionList1.title}
          products={collectionList1.products}
        />
        <ProductCarousel
          subtitle={collectionList2.subtitle}
          title={collectionList2.title}
          products={collectionList2.products}
          showDots
        />

        <BannerCarousel
          slides={shopTheLook}
          heightClass="h-[420px] sm:h-[560px] lg:h-[675px]"
          controls="bottom-left"
        />

        <ImageCarousel
          subtitle={vendorSection.subtitle}
          title={vendorSection.title}
          images={vendorSection.images}
        />

        <FactoryShowcase />

        <IngredientShowcase />
        <TransparencyStrip />

        <HellaSis />

        <TikTokFeed />

        <ImageCarousel
          subtitle={instagramSection.subtitle}
          title={instagramSection.title}
          images={instagramSection.images}
        />
      </main>

      <Footer />
    </>
  );
}
