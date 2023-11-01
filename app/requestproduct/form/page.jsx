import React from "react";
import RequestProductForm from "../../../components/form/RequestProductForm";
import { Header } from "../../../components/Header/Header";
import { redirect } from "next/navigation";
import db from "../../../utils/db";
import { getCurrentUser } from "../../../utils/session";
async function getData() {
  db.connectDb();
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }

  db.disconnectDb();

  return {
    session,
  };
}

export default async function page({}) {
  const { session } = await getData();
  return (
    <div>
      <Header />
      <RequestProductForm />
    </div>
  );
}
