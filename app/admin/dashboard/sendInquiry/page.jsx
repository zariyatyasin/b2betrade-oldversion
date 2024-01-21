import React from "react";
import Layout from "../../../../components/admin/Layout/Layout";

import db from "../../../../utils/db";

import SendInquiry from "../../../../model/SendInquiry ";
import SendInquiryCard from "../../../../components/cards/SendInquiryCard";
import { getCurrentUser } from "../../../../utils/session";
import { redirect } from "next/navigation";
import User from "../../../../model/User";
import Store from "../../../../model/Store";

export async function getData() {
  await db.connectDb();

  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }

  let sendInquiry = await SendInquiry.find()
    .populate({
      path: "userId",
      model: User,
    })
    .populate({
      path: "storeId",
      model: Store,
    })
    .sort({ createdAt: -1 });

  return {
    sendInquiry: JSON.parse(JSON.stringify(sendInquiry)),
  };
}
export default async function page() {
  const { sendInquiry } = await getData();

  const componentKey = Date.now();
  return (
    <Layout>
      <div className=" flex flex-wrap">
        {sendInquiry.map((sendInquiry) => (
          <SendInquiryCard key={sendInquiry._id} data={sendInquiry} />
        ))}
      </div>
    </Layout>
  );
}
