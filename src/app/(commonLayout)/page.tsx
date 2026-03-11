
import { CategorySection } from "@/components/modules/Home/category/CategorySection";
import { FeaturedCategories } from "@/components/modules/Home/category/FeaturedCategories";
import HomeSlider from "@/components/modules/Home/category/HomeSlider";
import { EidCollectionSlider } from "@/components/modules/Home/collection/EidCollectionSlider";
import { DiscoverSection } from "@/components/modules/Home/DiscoverProduct/DiscoverSection";
import { HeroSlider } from "@/components/modules/Home/hero/HeroSlider";
import ProductDetails from "@/components/modules/ProductDetails/ProductDetails";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tugi Bugi - Trendy Fashion & Lifestyle Products Online</title>
        <meta
          name="description"
          content="Shop the latest fashion trends at Tugi Bugi. Discover stylish clothing, accessories, and lifestyle products at great prices with fast and secure online shopping."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSlider />
        <CategorySection/>
        <FeaturedCategories/>
        <HomeSlider/>
        <EidCollectionSlider/>
        <DiscoverSection/>
        <ProductDetails/>
      </main>
    </>
  );
}


