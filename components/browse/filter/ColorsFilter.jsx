import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ColorsFilter({ colors, replaceQuery, colorHandle }) {
  const [show, setShow] = useState(true);
  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <div>
      <h3 className=" text-lg font-bold flex justify-between mb-4">
        <div>Color</div>
        <span className="ml-2" onClick={toggleShow}>
          {show ? <RemoveIcon sx={{ fontSize: 24 }} /> : <AddIcon />}
        </span>
      </h3>
      {show && (
        <div className="flex flex-wrap -mx-2">
          {colors?.map((color, i) => {
            const check = replaceQuery("color", color);
            return (
              <div key={i} className="w-1/5 p-2">
                <button
                  style={{ background: `${color}` }}
                  className="w-5 h-5 rounded-full border"
                  onClick={() => colorHandle(check.result)}
                ></button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
