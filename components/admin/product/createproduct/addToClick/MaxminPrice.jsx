import { useState } from "react";
import { Delete, Add } from "@mui/icons-material";

export default function MaxminPrice({ bulkPricing, product, setProduct }) {
  const [priceIncrease, setPriceIncrease] = useState(0);

  const handleBulkPricing = (i, e) => {
    const values = [...bulkPricing];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, bulkPricing: values });
  };

  const handleAdd = () => {
    const lastItem = bulkPricing[bulkPricing.length - 1];
    if (lastItem && lastItem.minQty !== "" && lastItem.maxQty !== "") {
      const minQty = parseInt(lastItem.maxQty) + 1;
      const maxQty =
        minQty + (parseInt(lastItem.maxQty) - parseInt(lastItem.minQty));
      const newPrice = parseInt(lastItem.price) - priceIncrease;
      setProduct({
        ...product,
        bulkPricing: [
          ...bulkPricing,
          {
            minQty: minQty,
            maxQty: maxQty,
            price: newPrice,
          },
        ],
      });
    }
  };

  const handleRemove = (i) => {
    if (bulkPricing.length > 0) {
      const values = [...bulkPricing];
      values.splice(i, 1);
      setProduct({ ...product, bulkPricing: values });
    }
  };

  return (
    <div>
      <div className=" mb-4">
        <div className="text-lg font-semibold"> Bulk Pricing</div>
        <div>
          <p>Price Reduce by</p>
          <input
            type="number"
            placeholder="Price Increase"
            value={priceIncrease}
            onChange={(e) => setPriceIncrease(parseInt(e.target.value))}
            className="    border rounded-md p-1"
          />
        </div>
        {bulkPricing.length === 0 && (
          <Add
            className="text-green-600  border rounded-full cursor-pointer"
            onClick={() => {
              setProduct({
                ...product,
                bulkPricing: [
                  ...bulkPricing,
                  {
                    minQty: 0,
                    maxQty: 0,
                    price: 0,
                  },
                ],
              });
            }}
          />
        )}
      </div>
      <div className=" flex flex-wrap">
        {bulkPricing
          ? bulkPricing.map((pricing, i) => (
              <div className="flex items-center space-x-2 mb-2" key={i}>
                <input
                  type="number"
                  name="minQty"
                  placeholder="Min Qty"
                  value={pricing.minQty}
                  onChange={(e) => handleBulkPricing(i, e)}
                  className="border rounded-md p-2  w-full "
                />
                <input
                  type="number"
                  name="maxQty"
                  placeholder="Max Qty"
                  value={pricing.maxQty}
                  onChange={(e) => handleBulkPricing(i, e)}
                  className="border rounded-md p-2  w-full "
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={pricing.price}
                  onChange={(e) => handleBulkPricing(i, e)}
                  className="border rounded-md p-2  w-full "
                />
                <>
                  <Delete
                    onClick={() => handleRemove(i)}
                    className="text-red-600 cursor-pointer"
                  />
                  {bulkPricing.length < 4 && i === bulkPricing.length - 1 && (
                    <div className="flex items-center space-x-2">
                      <Add
                        onClick={handleAdd}
                        className="text-green-600 cursor-pointer"
                      />
                    </div>
                  )}
                </>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
