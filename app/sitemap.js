import Product from "../model/Product" 
import Store from "../model/Store";

export default async function sitemap() {
  const baseUrl = "https://b2betrade.com";

  // Get All products from CMS
  const products =  await Product.find()
  const productsUrls =
    products?.map((product) => {
      return {
        url: `${baseUrl}/product/${product._id}`,
        lastModified: new Date(),
      };
    }) ?? [];
  const suppliers =  await Store.find()
  const suppliersUrls =
    suppliers?.map((suplier) => {
      return {
        url: `${baseUrl}/store/${suplier._id}`,
        lastModified: new Date(),
      };
    }) ?? [];
  const route = ['about','browse','contact','list','partner','signin','store','terms','b2betrade/form',]
  const routesUrls =
  route?.map((name) => {
      return {
        url: `${baseUrl}/${name}/ `,
        lastModified: new Date(),
      };
    }) ?? [];

 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...productsUrls,
    ...suppliersUrls,
    ...routesUrls
   
  ];
}