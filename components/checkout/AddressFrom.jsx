import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Grid } from "@mui/material";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("  Name is required"),

  phoneNumber: Yup.string().required("Phone Number is required"),
  address1: Yup.string().required("Address Line 1 is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
});

const AddressForm = ({ onSave, formData, onCancel, isEditing, addresses }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const formik = useFormik({
    initialValues: formData, // Directly use the passed formData
    validationSchema,
    onSubmit: (values) => {
      const address = {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        address1: values.address1,
        address2: values.address2,
        street: values.street,
        city: values.city,
        state: values.state,
      };
      onSave(address);
    },
  });

  return (
    <div className="my-4 p-4">
      <h2 className="text-lg font-semibold mb-2">
        {isEditing ? "Edit" : "Add"} Address
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && formik.errors.fullName}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address1"
              name="address1"
              label="Address Line 1"
              value={formik.values.address1}
              onChange={formik.handleChange}
              error={formik.touched.address1 && formik.errors.address1}
              helperText={formik.touched.address1 && formik.errors.address1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address2"
              name="address2"
              label="Address Line 2"
              value={formik.values.address2}
              onChange={formik.handleChange}
              error={formik.touched.address2 && formik.errors.address2}
              helperText={formik.touched.address2 && formik.errors.address2}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="street"
              name="street"
              label="Street"
              value={formik.values.street}
              onChange={formik.handleChange}
              error={formik.touched.street && formik.errors.street}
              helperText={formik.touched.street && formik.errors.street}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && formik.errors.city}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="state"
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && formik.errors.state}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>

          <Grid item xs={12}>
            <div className="flex text-white">
              <button className="mr-2 bg-gray-950 px-4 py-2" type="submit">
                Save Address
              </button>

              {addresses.length > 0 && (
                <button onClick={onCancel} className="bg-gray-500 px-4 py-2">
                  Cancel
                </button>
              )}
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddressForm;
