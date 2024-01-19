import React from "react";
import Layout from "../../../../components/admin/Layout/Layout";
import HeroImageUploaderForm from "../../../../components/admin/hero/HeroImageUploaderForm";
import HomeHero from "../../../../model/HomeHero";
import db from "../../../../utils/db";
async function getData() {
  await db.connectDb();

  try {
    const homeHero = await HomeHero.find({}).sort({ updatedAt: -1 }).lean();
    db.disconnectDb();

    return {
      homeHero: JSON.parse(JSON.stringify(homeHero)),
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching the product." };
  }
}

export default async function page() {
  const { homeHero } = await getData();
  return (
    <Layout>
      <div className=" px-8">
        <HeroImageUploaderForm data={homeHero} />
      </div>
    </Layout>
  );
}
