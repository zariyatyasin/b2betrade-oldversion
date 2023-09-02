import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import FullScreenLoading from "../loading/FullScreenLoading";
export default function ViewCouponDetails({ open, onClose, couponId }) {
  const [couponData, setCouponData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (couponId !== null) {
      const fetchingCoupon = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(`/api/coupon/${couponId}`);

          setCouponData(data.coupon);
        } catch (error) {
          setError(error);
          console.error("Error:", error.response);
          toast.error(error.response.data);
        } finally {
          setLoading(false);
        }
      };
      fetchingCoupon();
    }
  }, [couponId]);

  if (loading) {
    return <FullScreenLoading />;
  }

  console.log(couponData);

  return (
    <Dialog open={open} onClose={onClose} className="">
      <DialogContent>
        <div className="rounded-lg bg-white text-black  w-[400px]">
          <div className="flex flex-col space-y-3 p-6">
            <h3 className="text-3xl font-semibold leading-tight">
              Coupon Details
            </h3>
          </div>
          <div className="p-6 pt-0">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-2 pr-4 font-semibold">Field</th>
                  <th className="text-left py-2 font-semibold">Value</th>
                </tr>
                <tr className="border ">
                  <td className="p-2">Coupon Code</td>
                  <td className="p-2">{couponData?.coupon}</td>
                </tr>
                <tr className="border">
                  <td className="p-2">Start Date</td>
                  <td className="p-2">{couponData?.startDate}</td>
                </tr>
                <tr className="border">
                  <td className="p-2">End Date</td>
                  <td className="p-2">{couponData?.endDate}</td>
                </tr>
                <tr className="border">
                  <td className="p-2">Discount</td>
                  <td className="p-2">{couponData?.discount}</td>
                </tr>
                <tr className="border">
                  <td className="p-2">Minimum Amount</td>
                  <td className="p-2">{couponData?.minAmount}</td>
                </tr>
                <tr className="border">
                  <td className="p-2">Max Uses Total</td>
                  <td className="p-2">
                    {couponData?.maxUsesTotal || "Unlimited"}
                  </td>
                </tr>
                <tr className="border">
                  <td className="p-2">Max Uses Per User</td>
                  <td className="p-2">
                    {couponData?.maxUsesPerUser || "Unlimited"}
                  </td>
                </tr>
                <tr className="border">
                  <td className="p-2">Applicable Categories</td>
                  <td className="p-2">
                    {couponData?.applicableCategories.map((category) => (
                      <p key={category._id}>{category.name}</p>
                    ))}
                  </td>
                </tr>
                <tr className="border">
                  <td className="p-2">Discount Type</td>
                  <td className="p-2">{couponData?.discountType}</td>
                </tr>
                <tr className="border">
                  <td className="p-2">Is Active</td>
                  <td className="p-2">{couponData?.isActive ? "Yes" : "No"}</td>
                </tr>
                <tr className="border">
                  <td className="p-2">Created At</td>
                  <td className="p-2">{couponData?.createdAt}</td>
                </tr>
                <tr className="border">
                  <td className="p-2">Updated At</td>
                  <td className="p-2">{couponData?.updatedAt}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end pt-6 space-x-4">
              <Button
                variant="outlined"
                style={{
                  color: "black",
                  borderColor: "rgb(209, 213, 219)",
                }}
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
