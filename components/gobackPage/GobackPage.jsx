"use client";
import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
export default function GobackPage() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="mb-8 mt-2" onClick={goBack}>
      <KeyboardBackspaceIcon sx={{ fontSize: 28 }} />
    </div>
  );
}
