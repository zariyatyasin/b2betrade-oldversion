import React from "react";
import Layout from "../../../../components/admin/Layout/Layout";
import HeroImageUploaderForm from "../../../../components/admin/hero/HeroImageUploaderForm";
export default function page() {
  return (
    <Layout>
      <div className=" px-8">
        <HeroImageUploaderForm />
      </div>
    </Layout>
  );
}
