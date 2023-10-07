import Example from "../../../components/Header/Example";
import { Header } from "../../../components/Header/Header";

import ProductMain from "../../../components/productPage/ProductMain";

import Category from "../../../model/Category";
import Product from "../../../model/Product";
import SubCategory from "../../../model/SubCategory";
import db from "../../../utils/db";

async function getData(url) {
  const slug = url.slug[0];
  const style = parseInt(url.slug[1]) || 0;
  const size = parseInt(url.slug[2]) || 0;
  console.log(style);
  await db.connectDb();
  try {
    let product = await Product.findOne({ slug: slug })
      .populate({ path: "category", model: Category })
      .populate({ path: "subCategories", model: SubCategory })
      .lean();

    function calculatePercentage(num) {
      const totalReviews = product.reviews.length;
      const numReviews = product.reviews.filter(
        (review) =>
          review.rating === Number(num) || review.rating === Number(num) + 0.5
      ).length;
      return ((numReviews / totalReviews) * 100).toFixed(1);
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
    return { error: "An error occurred while fetching the product." };
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

export default async function Page({ params }) {
  const { product } = await getData(params);

  return (
    <div>
      <Header />
      <Example />

      <div className="pt-8 px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto  ">
        <div className="flex items-center  ">
          <ol className="flex items-center w-full overflow-hidden">
            <li className="text-sm text-body px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-heading">
              <a href="/">Home</a>
            </li>
            <li className="text-base text-body mt-0.5">/</li>
            <li className="text-sm text-body px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-heading">
              <a className="capitalize" href="/products">
                {product?.category.name}
              </a>
            </li>
            <li className="text-base text-body mt-0.5">/</li>
            <li className="text-sm text-body px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-heading">
              <a
                className="capitalize"
                href="/products/polarised-wayfarer-sunglasses"
              >
                {product?.subCategories?.map((sub) => (
                  <span>/{sub.name}</span>
                ))}
              </a>
            </li>
          </ol>
        </div>
        <ProductMain product={product} params={params} />
      </div>
    </div>
  );
}
