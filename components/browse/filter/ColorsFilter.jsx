import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ColorsFilter({ colors, replaceQuery, colorHandle }) {
  const [show, setShow] = useState(true);
  return (
    <div>
      <h3>
        Colors <span>{show ? <RemoveIcon /> : <AddIcon />}</span>
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
