import React from "react";
import { Header } from "../../components/Header/Header";
import Profile from "../../components/profile/Profile";
import Layout from "../../components/profile/layout/Layout";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import { getCurrentUser } from "../../utils/session";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { redirect } from "next/navigation";import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
async function getData({ params, searchParams }) {
  const session = await getCurrentUser();
  if (!session) {
    redirect("/signin");
  }
  const tab = searchParams.tab || 0;
  return {
    session,
    tab,
  };
}
export default async function page({ searchParams }) {
  const { session, tab } = await getData({ searchParams });
 
  return (
    <div className="  ">
      <Header />

      <Layout
        data={{
          ...session,
          tab,
        }}
      >
    
        <div className=" flex gap-8 ">
        <div className="py-10 px-4 bg-white  flex-1  ">
          <h5 className="  font-semibold text-gray-950  text-xl">Hi, {session.name}</h5>

          <div className="flex justify-between mt-5">

          <div className=" flex justify-center  items-center flex-col">
            0

            <p className=" text-sm mt-2 text-gray-500">Coupons</p>
           </div>
           <div className="flex justify-center  items-center flex-col">
            <PaidOutlinedIcon sx={{fontSize:28}}/>
            <p className=" text-sm mt-2 text-gray-500">Points</p>
           </div>
           <div className="flex justify-center  items-center flex-col">
            <AccountBalanceWalletOutlinedIcon sx={{fontSize:28}}/>
            <p className=" text-sm mt-2 text-gray-500">Wallet</p>
           </div>
           <div className="flex justify-center  items-center flex-col">
            <InventoryOutlinedIcon sx={{fontSize:28}}/>
            <p className=" text-sm mt-2 text-gray-500">Requested product</p>
           </div>
           <div className="flex justify-center  items-center flex-col">
            <CardGiftcardOutlinedIcon sx={{fontSize:28}}/>
            <p className=" text-sm mt-2 text-gray-500">Gift Card</p>
           </div>
          </div>
        </div>
        <div className="py-10 px-4  bg-white flex justify-between w-64">
           <div className=" flex justify-center  items-center flex-col">
            <SmsOutlinedIcon sx={{fontSize:28}}/>

            <p className="  text-sm mt-2 text-gray-500">My Message</p>
           </div>
           <div className="flex justify-center  items-center flex-col">
            <FeedbackOutlinedIcon sx={{fontSize:28}}/>
            <p className=" text-sm mt-2 text-gray-500">FeedBack</p>
           </div>
        </div>


        </div>
        <div className="mt-5 py-10 px-4 bg-white">
        <h5 className="  font-semibold text-gray-950  text-xl">My Orders</h5>

        <div></div>
        </div>
      </Layout>
    </div>

    // <div>

    //kddkdkd
    //   <Header />
    //   <Layout2 />
    // </div>
  );
}
