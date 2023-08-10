import { NextResponse } from "next/server";
import Product from "../../../../model/Product";
import db from "../../../../utils/db";

export const GET = async (request , { params } ) => {
 
 
    try {
     db.connectDb()
       const id = params.id[0];
       const style = params.id[1];
       const size = params.id[2]
       const product = await Product.findById(id).lean();
       let discount = product.subProducts[style].discount
       let priceBefore = product.subProducts[style].sizes[size].price;
       let price = discount ? priceBefore - priceBefore / discount : priceBefore;
       db.disconnectDb()
      return NextResponse.json( {
        _id: product._id,
        style: Number(style),
        name: product.name,
        description: product.description,
        slug: product.slug,
        sku: product.subProducts[style].sku,
        brand: product.brand,
        category: product.category,
        subCategories: product.subCategories,
        shipping: product.shipping,
        images: product.subProducts[style].images,
        color: product.subProducts[style].color,
        size: product.subProducts[style].sizes[size].size,
        price,
        priceBefore,
        discount,
        quantity: product.subProducts[style].sizes[size].qty
      } ,{
        status: 201,
      })
    } catch (err) {
      return new NextResponse({message:err}, { status: 500 });
    }
  };