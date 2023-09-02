import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CreateSubCategoryForm({
  open,
  onClose,
  onSubmits,
  categories,
  editData,
}) {
  const initialValues = {
    name: editData && editData.name ? editData.name : "",
    parentName:
      editData && editData.parent && editData.parent.name
        ? editData.parent.name
        : "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Subcategory name is required")
      .matches(/^[a-zA-Z0-9\s]+$/, "Only alphanumeric characters are allowed"),
    parentName: Yup.string().required("Parent category is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const selectedCategoryObject = categories.find(
      (category) => category.name === values.parentName
    );

    if (selectedCategoryObject) {
      onSubmits({
        action: editData.action,
        id: editData._id,
        name: values.name,
        categoryId: selectedCategoryObject._id,
      });

      onClose();
    }

    setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} className="">
      <DialogContent>
        <div className="rounded-lg   bg-card text-card-foreground   w-[400px]">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Create Category
            </h3>
            <p className="text-sm text-muted-foreground">
              Deploy your new project in one-click.
            </p>
          </div>
          <div className="p-6 pt-0">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Subcategory Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm  "
                    placeholder="Name of your project"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="parentName"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Parent Category
                  </label>
                  <Field
                    as="select"
                    id="parentName"
                    name="parentName"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm  "
                  >
                    <option value="" disabled className="text-sm">
                      Select a category
                    </option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="parentName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="items-center  pt-6 flex justify-between">
                  <Button
                    variant="outlined"
                    style={{
                      color: "black",
                      borderColor: " rgb(209 213 219)",
                    }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    className=" border-gray-300"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      paddingInline: 24,
                    }}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
