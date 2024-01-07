// ViewDetailsModal.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";

const ViewDetailsModal = ({ data, onClose }) => {
  const renderValue = (key, value) => {
    if (key === "password") {
      return (
        <Typography variant="body1">
          {`${key}: ******** (Sensitive Information)`}
        </Typography>
      );
    } else if (typeof value === "object") {
      return (
        <React.Fragment>
          {Object.keys(value).map((nestedKey) => (
            <React.Fragment key={nestedKey}>
              {renderValue(nestedKey, value[nestedKey])}
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    } else {
      return (
        <tr>
          <td className="border px-4 py-2 font-bold">{key}</td>
          <td className="border px-4 py-2">{value}</td>
        </tr>
      );
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>View Details</DialogTitle>
      <DialogContent>
        <table className="min-w-full border-collapse">
          <tbody>
            {Object.keys(data).map((key) => (
              <React.Fragment key={key}>
                {key === "image" ? (
                  <CardMedia
                    component="img"
                    alt="Image"
                    width="80"
                    height="80"
                    image={data[key]}
                  />
                ) : (
                  <React.Fragment>{renderValue(key, data[key])}</React.Fragment>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDetailsModal;
