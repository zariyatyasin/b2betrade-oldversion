import React from "react";
import Layout from "../../../../components/admin/Layout/Layout";

import db from "../../../../utils/db";

import Contact from "../../../../model/Contact";
import MessageCard from "../../../../components/cards/MessageCard";
import { getCurrentUser } from "../../../../utils/session";
import { redirect } from "next/navigation";

export async function getData() {
  await db.connectDb();

  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }

  let messages = await Contact.find().sort({ createdAt: -1 });

  return {
    messages: JSON.parse(JSON.stringify(messages)),
  };
}
export default async function page() {
  const { messages } = await getData();
  console.log(messages);
  const componentKey = Date.now();
  return (
    <Layout>
      {messages.map((message) => (
        <MessageCard key={message._id} message={message} />
      ))}
    </Layout>
  );
}
