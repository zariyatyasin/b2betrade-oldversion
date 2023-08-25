import { NextResponse } from "next/server";
import Product from "../../../../model/Product";
import db from "../../../../utils/db";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";

export const GET = async (request, { params }) => {
  try {
    await db.connectDb(); // Connect to the database

    const id = params.id[0];
    const style = parseInt( params.id[1]) ||0;
 
    const size = parseInt(params.id[2]) ||0
  
    const product = await Product.findById(id)
      .populate({ path: "category", model: Category })
      .populate({ path: "subCategories", model: SubCategory })
      .lean();
      
    await db.disconnectDb(); // Disconnect from the database

    if (!product) {
      return new NextResponse({ message: "Product not found" }, { status: 404 });
    }
    let subProduct = product.subProducts[style];
    let prices = subProduct.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      });

    let newProduct = {
      ...product,
      style,
      images: subProduct.images,
      size: subProduct.sizes,
      discount: subProduct.discount,
      sku: subProduct.sku,
      colors: product.subProducts.map((p) => {
        return p.color;
      }),
      priceRange: subProduct.discount
        ? ` $${(prices[0] - prices[0] / subProduct.discount).toFixed(
            2
          )} - $${(
            prices[prices.length - 1] -
            prices[prices.length - 1] / subProduct.discount
          ).toFixed(2)}`
        : `  $${prices[0]} - $${prices[prices.length - 1]}`,

      price:
        subProduct.discount > 0
          ? (
              subProduct.sizes[size]?.price -
              subProduct.sizes[size]?.price / subProduct.discount
            ).toFixed(2)
          : subProduct.sizes[size].price,
      priceBefore: subProduct.sizes[size].price,
      quantity: subProduct.sizes[size].qty,
      ratings: [
        {
          percentage: 10,
        },

        {
          percentage: 75,
        },
        {
          percentage: 0,
        },
      ],

      allSizes: product.subProducts
        .map((item) => item.sizes)
        .flat()
        .sort((a, b) => a.size - b.size)
        .filter(
          (element, index, array) =>
            array.findIndex((e12) => e12.size === element.size) === index
        ),
    };
    return NextResponse.json( {
      product: newProduct

    } ,{
      status: 201,
    })
  } catch (err) {
    return new NextResponse({ message: err.message }, { status: 500 });
  }
};
