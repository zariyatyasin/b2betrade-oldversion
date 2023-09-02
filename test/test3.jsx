"use client";
import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { TextField, Button, Grid, Paper } from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  // Add more validation rules here based on your schema
});

const CreateProductForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        brand: "",
        // Add more initial values here based on your schema
        subProducts: [{ sku: "", sizes: [{ size: "", qty: "", price: "" }] }],
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field component={TextField} name="name" label="Name" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="description"
                label="Description"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="brand"
                label="Brand"
                fullWidth
              />
            </Grid>
            {/* Add more fields here based on your schema */}
            <Grid item xs={12}>
              <h3>Sub Products</h3>
              <FieldArray name="subProducts">
                {(arrayHelpers) => (
                  <div>
                    {arrayHelpers.form.values.subProducts.map(
                      (subProduct, index) => (
                        <Paper
                          key={index}
                          elevation={3}
                          style={{ padding: "1rem", marginBottom: "1rem" }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Field
                                component={TextField}
                                name={`subProducts.${index}.sku`}
                                label="SKU"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <h4>Sizes</h4>
                              <FieldArray name={`subProducts.${index}.sizes`}>
                                {(arrayHelpers) => (
                                  <div>
                                    {subProduct.sizes.map((size, sizeIndex) => (
                                      <div key={sizeIndex}>
                                        <Grid container spacing={1}>
                                          <Grid item xs={4}>
                                            <Field
                                              component={TextField}
                                              name={`subProducts.${index}.sizes.${sizeIndex}.size`}
                                              label="Size"
                                              fullWidth
                                            />
                                          </Grid>
                                          <Grid item xs={4}>
                                            <Field
                                              component={TextField}
                                              name={`subProducts.${index}.sizes.${sizeIndex}.qty`}
                                              label="Quantity"
                                              fullWidth
                                            />
                                          </Grid>
                                          <Grid item xs={4}>
                                            <Field
                                              component={TextField}
                                              name={`subProducts.${index}.sizes.${sizeIndex}.price`}
                                              label="Price"
                                              fullWidth
                                            />
                                          </Grid>
                                        </Grid>
                                      </div>
                                    ))}
                                    <Button
                                      variant="outlined"
                                      onClick={() =>
                                        arrayHelpers.push({
                                          size: "",
                                          qty: "",
                                          price: "",
                                        })
                                      }
                                    >
                                      Add Size
                                    </Button>
                                  </div>
                                )}
                              </FieldArray>
                            </Grid>
                          </Grid>
                        </Paper>
                      )
                    )}
                    <Button
                      variant="outlined"
                      onClick={() =>
                        arrayHelpers.push({
                          sku: "",
                          sizes: [{ size: "", qty: "", price: "" }],
                        })
                      }
                    >
                      Add Sub Product
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProductForm;
