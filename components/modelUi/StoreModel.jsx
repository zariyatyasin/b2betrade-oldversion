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

const StoreModel = ({ data, onClose, onSave }) => {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Data</DialogTitle>
      <DialogContent>
        {/* Add your form inputs here */}
        {/* Example: */}
        <TextField
          label="Store Name"
          name="storeName"
          value={editedData.storeName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        {/* Dropdown for storeAtive */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Store Active</InputLabel>
          <Select
            name="storeAtive"
            value={editedData.storeAtive}
            onChange={handleInputChange}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="ban">Ban</MenuItem>
            <MenuItem value="block">Block</MenuItem>
            <MenuItem value="active">Active</MenuItem>
          </Select>
        </FormControl>

        {/* Add more TextField components for other fields */}
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

export default StoreModel;
