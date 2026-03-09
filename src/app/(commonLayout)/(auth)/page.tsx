import { CategorySection } from "@/components/modules/home/category/CategorySection";
import HomeSlider from "@/components/modules/home/category/HomeSlider";
import { HeroSlider } from "@/components/modules/home/hero/HeroSlider";
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
        <HomeSlider/>
      </main>
    </>
  );
}


