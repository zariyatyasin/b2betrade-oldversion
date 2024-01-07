import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Make sure you have the appropriate Toast library installed

const useCategoryData = () => {
  const [getData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCategory = async (name) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/category", name);

      setData(data.categories);
      toast.success(data.message);
    } catch (error) {
      setError(error);
      console.error("Error:", error.response);
      toast.error("An error occurred while creating the category.");
    } finally {
      setLoading(false);
    }
  };

  return { getData, loading, error, createCategory };
};

export default useCategoryData;
