import { NextResponse } from "next/server";
import Product from "../../../../model/Product";
import db from "../../../../utils/db";
import { getCurrentUser } from "../../../../utils/session";

export const GET = async (request , { params } ) => {
 
 
    try {
     db.connectDb()
       const id = params.id[0];
       const style = params.id[1] || 0;
       const size = params.id[2] || 0;
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
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  };





  
export const PUT = async (request, { params }) => {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json("You must be logged in", {
      status: 201,
    });
  }

  try {
   await db.connectDb();
    const { id } = params;
   
    const reviewData = await request.json();
 
   console.log(reviewData.images);
  
    const product = await Product.findById(id);
    if (product) {
      const exist = product.reviews.find(
        (x) => x.reviewBy.toString() == session.id
      );
      if (exist) {
        await Product.updateOne(
          {
            _id: id,
            "reviews._id": exist._id,
          },
          {
            $set: {
              "reviews.$.review": reviewData.review,
              "reviews.$.rating": reviewData.rating,
              "reviews.$.size": reviewData.size,
          
              "reviews.$.images": reviewData.images,
              "reviews.$.style": reviewData.style,
            },
          },
          {
            new: true,
          }
        );

        const updatedProduct = await Product.findById(id);
        updatedProduct.numReviews = updatedProduct.reviews.length;
        updatedProduct.rating =
          updatedProduct.reviews.reduce((a, r) => r.rating + a, 0) /
          updatedProduct.reviews.length;
        await updatedProduct.save();
        await updatedProduct.populate("reviews.reviewBy");
        await db.disconnectDb();
        return NextResponse.json({ reviews: updatedProduct.reviews.reverse() });
          ;
      } else {
        const review = {
          reviewBy: session.id,
          rating: reviewData.rating,
          review: reviewData.review,
          size: reviewData.size,
          fit: reviewData.fit,
          style: reviewData.style,
          images: reviewData.images,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, r) => r.rating + a, 0) /
          product.reviews.length;
        await product.save();
        await product.populate("reviews.reviewBy");
        await  db.disconnectDb()
        return NextResponse.json({ reviews: product.reviews.reverse() });
      }
    }
  } catch (error) {
 
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
