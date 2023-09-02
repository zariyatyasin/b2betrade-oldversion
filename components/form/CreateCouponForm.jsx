import React from "react";
import { Dialog, DialogContent, Button, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CreateCouponForm({
  categories,
  open,
  onClose,
  onSubmits,
  editData,
}) {
  const initialValues = {
    coupon: editData && editData.coupon ? editData.coupon : "",
    startDate: editData && editData.startDate ? editData.startDate : "",
    endDate: editData && editData.endDate ? editData.endDate : "",
    discount: editData && editData.discount ? editData.discount : "",
    minAmount: editData && editData.minAmount ? editData.minAmount : "",
    maxUsesTotal:
      editData && editData.maxUsesTotal ? editData.maxUsesTotal : "",
    maxUsesPerUser:
      editData && editData.maxUsesPerUser ? editData.maxUsesPerUser : "",
    // maxUsers: editData && editData.maxUsers ? editData.maxUsers : "",
    applicableProducts:
      editData && editData.applicableProducts
        ? editData.applicableProducts
        : [],
    applicableCategories:
      editData && editData.applicableCategories
        ? editData.applicableCategories
        : [],
    discountType:
      editData && editData.discountType ? editData.discountType : "",
    isActive: editData && editData.isActive ? editData.isActive : true,
  };

  const validationSchema = Yup.object({
    coupon: Yup.string()
      .required("Coupon code is required")
      .matches(/^[a-zA-Z0-9\s]+$/, "Only alphanumeric characters are allowed"),
    startDate: Yup.string().when("endDate", (endDate, schema) => {
      return schema.required("Start date is required").test({
        test: function (startDate) {
          if (!startDate) return false; // Empty start date is already validated by required()
          const selectedStartDate = new Date(startDate);
          const selectedEndDate = new Date(endDate);

          return selectedStartDate <= selectedEndDate;
        },
        message: "Start date must be before or equal to the end date",
      });
    }),

    endDate: Yup.string()
      .required("End date is required")
      .test({
        test: function (endDate) {
          if (!endDate) return false; // Empty end date is already validated by required()
          const currentDate = new Date();
          return new Date(endDate) >= currentDate;
        },
        message: "End date must be a present or future date",
      })
      .test({
        test: function (endDate, context) {
          const startDate = context.parent.startDate;
          if (!startDate || !endDate) return true; // Continue if start or end date is not available
          const selectedStartDate = new Date(startDate);
          const selectedEndDate = new Date(endDate);
          return selectedEndDate >= selectedStartDate;
        },
        message: "End date must be after or equal to the start date",
      }),
    discount: Yup.number()
      .required("Discount is required")
      .min(0, "Discount must be at least 0"),
    minAmount: Yup.number()
      .required("Minimum amount is required")
      .min(0, "Minimum amount must be at least 0"),
    maxUsesTotal: Yup.number().min(1, "Maximum total uses must be at least 1"),
    maxUsesPerUser: Yup.number().min(
      1,
      "Maximum uses per user must be at least 1"
    ),
    maxUsers: Yup.number().min(1, "Maximum users must be at least 1"),
    discountType: Yup.string()
      .required("Discount type is required")
      .oneOf(["percentage", "fixed"], "Invalid discount type"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmits({ values, action: editData.action, editId: editData._id });
    onClose();
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} className="">
      <DialogContent>
        <div className="rounded-lg bg-card text-card-foreground w-[500px]">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Create Coupon
            </h3>
          </div>
          <div className="p-6 pt-0">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                  {/* Coupon Code */}
                  <Grid item xs={6}>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="coupon"
                        className="text-sm font-medium leading-none"
                      >
                        Coupon Code
                      </label>
                      <Field
                        type="text"
                        id="coupon"
                        name="coupon"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Coupon code"
                      />
                      <ErrorMessage
                        name="coupon"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </Grid>
                  {/* Discount */}
                  <Grid item xs={6}>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="discountType"
                        className="text-sm font-medium leading-none"
                      >
                        Discount Type
                      </label>
                      <Field
                        as="select"
                        id="discountType"
                        name="discountType"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="" label="Select Discount Type" />
                        <option value="percentage" label="Percentage" />
                        <option value="fixed" label="Fixed" />
                      </Field>
                      <ErrorMessage
                        name="discountType"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </Grid>

                  <Grid item xs={4}>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="startDate"
                        className="text-sm font-medium leading-none"
                      >
                        Start Date
                      </label>
                      <Field
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                      <ErrorMessage
                        name="startDate"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </Grid>
                  {/* End Date */}
                  <Grid item xs={4}>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="endDate"
                        className="text-sm font-medium leading-none"
                      >
                        End Date
                      </label>
                      <Field
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                      <ErrorMessage
                        name="endDate"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </Grid>
                  {/* Minimum Amount */}
                  <Grid item xs={4}>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="minAmount"
                        className="text-sm font-medium leading-none"
                      >
                        Minimum Amount
                      </label>
                      <Field
                        type="number"
                        id="minAmount"
                        name="minAmount"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Minimum amount"
                      />
                      <ErrorMessage
                        name="minAmount"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </Grid>
                  {/* Maximum Total Uses */}
                  <Grid item xs={6}>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="maxUsesTotal"
                        className="text-sm font-medium leading-none"
                      >
                        Maximum Total Uses
                      </label>
                      <Field
                        type="number"
                        id="maxUsesTotal"
                        name="maxUsesTotal"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Maximum total uses"
                      />
                      <ErrorMessage
                        name="maxUsesTotal"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </Grid>
                  {/* Maximum Uses Per User */}
                  <Grid item xs={6}>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="maxUsesPerUser"
                        className="text-sm font-medium leading-none"
                      >
                        Maximum Uses Per User
                      </label>
                      <Field
                        type="number"
                        id="maxUsesPerUser"
                        name="maxUsesPerUser"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Maximum uses per user"
                      />
                      <ErrorMessage
                        name="maxUsesPerUser"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </Grid>
                  {/* Maximum Users */}

                  {/* Discount Type */}
                  <Grid item xs={6}>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="discount"
                        className="text-sm font-medium leading-none"
                      >
                        Discount
                      </label>
                      <Field
                        type="number"
                        id="discount"
                        name="discount"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Discount"
                      />
                      <ErrorMessage
                        name="discount"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="applicableCategories"
                        className="text-sm font-medium leading-none"
                      >
                        Applicable Categories
                      </label>
                      <Field
                        as="select"
                        multiple
                        id="applicableCategories"
                        name="applicableCategories"
                        className="flex  w-full rounded-md border border-input bg-background px-3 py-2 text-sm  "
                      >
                        <option value="" label="Select an option" disabled />
                        {categories?.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div className="flex flex-col space-y-1.5">
                      <label
                        htmlFor="applicableProducts
                        "
                        className="text-sm font-medium leading-none"
                      >
                        product Id
                      </label>
                      <Field
                        type="text"
                        id="applicableProducts"
                        name="applicableProducts"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Product Id"
                      />
                      <ErrorMessage
                        name="applicableProducts
                        "
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </Grid>
                  {/* Other Fields */}
                  {/* ... */}
                  <Grid item xs={12}>
                    <div className="items-center pt-6 flex justify-between">
                      <Button
                        variant="outlined"
                        style={{
                          color: "black",
                          borderColor: "rgb(209 213 219)",
                        }}
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        className="border-gray-300"
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          paddingInline: 24,
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
