import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const DynamicFormModel = ({ data, fields, menuItem, onClose, onSave }) => {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the field is nested, update the state accordingly
    if (name.includes(".")) {
      const [nestedObj, nestedField] = name.split(".");
      setEditedData((prevData) => ({
        ...prevData,
        [nestedObj]: {
          ...prevData[nestedObj],
          [nestedField]: value,
        },
      }));
    } else {
      setEditedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Data</DialogTitle>
      <DialogContent>
        {fields.map((field) => {
          if (field.type === "text") {
            return (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={editedData[field.name]}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            );
          } else if (field.type === "select") {
            return (
              <FormControl key={field.name} fullWidth margin="normal">
                <InputLabel>{field.label}</InputLabel>
                <Select
                  name={field.name}
                  value={editedData[field.name]}
                  onChange={handleInputChange}
                >
                  {menuItem.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }
          // Add more conditions for other field types if needed
          return null;
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicFormModel;
