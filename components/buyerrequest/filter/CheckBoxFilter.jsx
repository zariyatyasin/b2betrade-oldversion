import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
export default function CheckBoxFilter({
  data,

  handle,
  replaceQuery,
}) {
  const [show, setShow] = useState(true);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="  pt-4  ">
      <h3 className=" text-sm font-medium   flex justify-between mb-4">
        <div>
          Loaction <span>({data.length})</span>
        </div>

        <span className="ml-2" onClick={toggleShow}>
          {show ? (
            <KeyboardArrowUpOutlinedIcon sx={{ fontSize: 24 }} />
          ) : (
            <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 24 }} />
          )}
        </span>
      </h3>
      {show && (
        <div>
          {data.map((data, i) => {
            const check = replaceQuery("location", data);
            return (
              <label
                key={i}
                htmlFor={data}
                onClick={() => handle(check.result)}
                className="flex items-center   cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="data"
                  className=" border mr-2 h-4 w-4"
                  id={data}
                  checked={check.active}
                />
                <label htmlFor={data}>
                  {data.length > 12 ? `${data.substring(0, 12)}...` : data}
                </label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
