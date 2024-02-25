import ProductMain from "../../../components/productPage/ProductMain";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Category from "../../../model/Category";
import Product from "../../../model/Product";
import SubCategory from "../../../model/SubCategory";
import Store from "../../../model/Store";
import User from "../../../model/User";
import db from "../../../utils/db";
import Link from "next/link";
import MainpageLayout from "../../../components/layout/MainpageLayout";
import mongoose from "mongoose";
import Footer from "../../../components/Footer/Footer";
import Error from "../../../components/error/Error";
async function getData(url) {
  const ObjectId = mongoose.Types.ObjectId;

  const slug = url.slug[0];
  const style = parseInt(url.slug[1]) || 0;
  const size = parseInt(url.slug[2]) || 0;
  let query;
  if (ObjectId.isValid(slug)) {
    query = { _id: slug };
  } else {
    query = { slug: slug };
  }

  await db.connectDb();
  try {
    let product = await Product.findOne(query)
      .populate({ path: "category", model: Category })
      .populate({ path: "storeId", model: Store })
      .populate({ path: "subCategories", model: SubCategory })
      .populate({ path: "reviews.reviewBy", model: User })
      .lean();

    function calculatePercentage(num) {
      const totalReviews = product.reviews.length;
      const numReviews = product.reviews.filter(
        (review) =>
          review.rating === Number(num) || review.rating === Number(num) + 0.5
      ).length;

      // Check if numReviews is zero to prevent division by zero
      const percentage =
        totalReviews === 0 ? 0 : (numReviews / totalReviews) * 100;

      return isNaN(percentage) ? 0 : percentage.toFixed(1);
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
        ? `From $${(prices[0] - prices[0] / subProduct.discount).toFixed(
            2
          )} to $${(
            prices[prices.length - 1] -
            prices[prices.length - 1] / subProduct.discount
          ).toFixed(2)}`
        : `From $${prices[0]} to $${prices[prices.length - 1]}`,

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
        { percentage: calculatePercentage("5") },
        { percentage: calculatePercentage("4") },
        { percentage: calculatePercentage("3") },
        { percentage: calculatePercentage("2") },
        { percentage: calculatePercentage("1") },
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

    return { product: JSON.parse(JSON.stringify(newProduct)) };
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: `An error occurred while fetching the product.` };
  }

  // finally {
  //   db.disconnectDb();
  // }
}
export async function generateMetadata({ params }) {
  const { product } = await getData(params);
  return {
    title: product?.name,
    description: product?.description,
  };
}

export default async function Page({ params, searchParams }) {
  const { product, error } = await getData(params);
  if (error) {
    return (
      <>
        <MainpageLayout />
        <div className="pt-16 lg:pt-32 px-2 sm:px-4 lg:px-8  max-w-[1400px]  mx-auto ">
          <Error
            header={" No Product Found"}
            title={"Error occurred while fetching the product."}
          />
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <MainpageLayout />
      <div className="pt-16 lg:pt-32 px-2 sm:px-4 lg:px-8  max-w-[1400px]  mx-auto  ">
        <div className="flex items-center pb-4 ">
          <ol className="flex items-center w-full overflow-hidden">
            <li className="text-sm text-gray-500 text-body px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-heading">
              <Link href="/">
                <HomeOutlinedIcon />
              </Link>
            </li>
            <li className="text-base text-body mt-0.5 text-gray-500">/</li>
            <li className="text-sm text-body px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-heading">
              <Link
                className=" text-sm font-medium text-gray-500 hover:text-gray-700"
                href={`/browse?category=${product?.category._id}`}
              >
                {product?.category.name}
              </Link>
            </li>
            <li className="text-base text-body mt-0.5 hidden l ">/</li>
            <li className="text-sm text-body px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-heading">
              <div className=" text-sm hidden  font-medium text-gray-500 hover:text-gray-700">
                {product?.subCategories?.map((sub, id) => (
                  <Link key={id} href={`/browse?subCategories=${sub._id}`}>
                    <span>{sub.name}</span>
                  </Link>
                ))}
              </div>
            </li>
          </ol>
        </div>
        <ProductMain product={product} params={params} />
      </div>
      <Footer />
    </>
  );
}
