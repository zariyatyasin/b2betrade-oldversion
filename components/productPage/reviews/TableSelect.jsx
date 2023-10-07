import { useState } from "react";

export default function TableSelect({
  property,
  text,
  data,
  handleChange,
  handleFilterChange,
}) {
  const [visible, setVisible] = useState(false);
  const handleOptionClick = (value) => {
    handleChange(value);
    handleFilterChange();
    setVisible(false);
  };
  return (
    <div className="relative">
      {text}:
      <div
        className="relative flex items-center cursor-pointer"
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <span
          className="flex items-center space-x-2 p-1 rounded"
          style={{
            background:
              text === "Style" && property?.color && `${property?.color}`,
          }}
        >
          {text === "Rating" || text === "Size" || text === "Order" ? (
            property || `Select ${text}`
          ) : text === "Style" && property?.image ? (
            <img src={property?.image} alt="" className="w-6 h-6" />
          ) : (
            "Select Style"
          )}
          ----
        </span>
        {visible && (
          <ul
            className="absolute top-full left-0 mt-1 py-2 px-3 bg-white border border-gray-300 rounded shadow-lg z-10"
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            style={{ width: text === "Order" && "200px" }}
          >
            {data.map((item, i) => {
              if (text === "Rating") {
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item.value)}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                  >
                    <span>{item.text}</span>
                  </li>
                );
              }
              if (text === "Size") {
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item.size)}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                  >
                    <span>{item.size}</span>
                  </li>
                );
              }
              if (text === "Style") {
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item)}
                    style={{ backgroundColor: `${item.color}` }}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                  >
                    <span>
                      {item.image ? (
                        <img src={item.image} alt="" className="w-6 h-6" />
                      ) : (
                        "All Styles"
                      )}
                    </span>
                  </li>
                );
              }
              if (text === "Order") {
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item.value)}
                    style={{ width: text === "Order" && "200px" }}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                  >
                    <span>{item.text}</span>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
