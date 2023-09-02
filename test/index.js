"use client";

import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { TextField, Button, Grid, Paper } from "@mui/material";
import * as Yup from "yup";
const initialValues = {
  name: "",
  description: "",
  brand: "",
  slug: "",
  category: "",
  subCategories: [""],
  details: [{ name: "", value: "" }],
  questions: [{ question: "", answer: "" }],
  reviews: [
    {
      reviewBy: "",
      rating: "",
      review: "",
      size: "",
      style: { color: "", image: "" },
      fit: "",
    },
  ],
  refundPolicy: "",
  rating: "",
  numReviews: "",
  shipping: "",
  // Add more initial values here based on your schema
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  brand: Yup.string(),
  slug: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  subCategories: Yup.array().of(Yup.string()),
  details: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      value: Yup.string().required("Required"),
    })
  ),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Required"),
      answer: Yup.string().required("Required"),
    })
  ),
  reviews: Yup.array().of(
    Yup.object().shape({
      reviewBy: Yup.string().required("Required"),
      rating: Yup.number().required("Required"),
      review: Yup.string().required("Required"),
      size: Yup.string(),
      style: Yup.object().shape({
        color: Yup.string(),
        image: Yup.string(),
      }),
      fit: Yup.string(),
      images: Yup.array(),
      likes: Yup.array(),
    })
  ),
  refundPolicy: Yup.string(),
  rating: Yup.number().required("Required"),
  numReviews: Yup.number().required("Required"),
  shipping: Yup.number().required("Required"),
  subProducts: Yup.array().of(
    Yup.object().shape({
      sku: Yup.string(),
      images: Yup.array(),
      description_images: Yup.array(),
      color: Yup.object().shape({
        color: Yup.string(),
        image: Yup.string(),
      }),
      sizes: Yup.array().of(
        Yup.object().shape({
          size: Yup.string(),
          qty: Yup.number(),
          price: Yup.number(),
        })
      ),
      discount: Yup.number(),
      sold: Yup.number(),
    })
  ),
});

const ProductForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
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
            <Grid item xs={12}>
              <Field component={TextField} name="slug" label="Slug" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="category"
                label="Category"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FieldArray name="subCategories">
                {(arrayHelpers) => (
                  <div>
                    {arrayHelpers.form.values.subCategories.map((_, index) => (
                      <Field
                        key={index}
                        component={TextField}
                        name={`subCategories.${index}`}
                        label={`Sub Category ${index + 1}`}
                        fullWidth
                      />
                    ))}
                    <Button
                      variant="outlined"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Add Sub Category
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Grid>
            <Grid item xs={12}>
              <FieldArray name="details">
                {(arrayHelpers) => (
                  <div>
                    {arrayHelpers.form.values.details.map((_, index) => (
                      <div key={index}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Field
                              component={TextField}
                              name={`details.${index}.name`}
                              label="Detail Name"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Field
                              component={TextField}
                              name={`details.${index}.value`}
                              label="Detail Value"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                    <Button
                      variant="outlined"
                      onClick={() => arrayHelpers.push({ name: "", value: "" })}
                    >
                      Add Detail
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Grid>
            <Grid item xs={12}>
              <FieldArray name="questions">
                {(arrayHelpers) => (
                  <div>
                    {arrayHelpers.form.values.questions.map((_, index) => (
                      <div key={index}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Field
                              component={TextField}
                              name={`questions.${index}.question`}
                              label="Question"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Field
                              component={TextField}
                              name={`questions.${index}.answer`}
                              label="Answer"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                    <Button
                      variant="outlined"
                      onClick={() =>
                        arrayHelpers.push({ question: "", answer: "" })
                      }
                    >
                      Add Question
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Grid>

         
            {/* Add more fields here based on your schema */}
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

export default ProductForm;
