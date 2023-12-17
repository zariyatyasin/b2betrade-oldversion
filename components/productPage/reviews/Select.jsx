import { useState } from "react";

export default function Select({ property, text, data, handleChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative mr-5">
      <div className="text-sm text-gray-600 mb-1">{text}:</div>
      <div
        className="relative flex items-center cursor-pointer"
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <span
          className="flex items-center space-x-2 p-2 rounded border border-gray-300"
          style={{
            background: text === "Style" && property?.color,
          }}
        >
          {text === "Size" ? (
            property || `Select ${text}`
          ) : text === "Style" && property?.image ? (
            <img src={property.image} alt="" className="w-6 h-6" />
          ) : text === "delivery" && property ? (
            property
          ) : !property && text === "delivery" ? (
            "delivery"
          ) : (
            "Select Style"
          )}
        </span>

        {visible && (
          <ul
            className="absolute top-full left-0 mt-1 py-2 px-3 bg-white border border-gray-300 rounded shadow-lg z-10"
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {data.map((item, i) => (
              <li
                key={i}
                onClick={() =>
                  handleChange(
                    text === "Size"
                      ? item.size
                      : text === "Style"
                      ? item
                      : text === "delivery"
                      ? item
                      : undefined
                  )
                }
                style={{
                  backgroundColor:
                    text === "Style" ? item.color : "transparent",
                }}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                {text === "Size" ? (
                  <span>{item.size}</span>
                ) : text === "Style" ? (
                  <img src={item.image} alt="" className="w-6 h-6" />
                ) : text === "delivery" ? (
                  <span>{item}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
