<CreateProductImage
name="file"
header="Product Carousel Images"
text="Add images"
images={images}
setImages={setImages}
setColorImage={setColorImage}
/>

<div className="">
{product.color.image && (
  <img
    src={product.color.image}
    className={"h-24 w-24 mt-5"}
    alt=""
  />
)}
{product.color.color && (
  <div
    className={" h-8 w-8 rounded-full"}
    style={{ backgroundColor: `${product.color.color}` }}
  ></div>
)}
<AddImageColor
  name="color"
  product={product}
  setProduct={setProduct}
  colorImage={colorImage}
/>
<AddProductStyle
  name="styleInput"
  product={product}
  setProduct={setProduct}
  colorImage={colorImage}
/>

<SingularSelect
  name="category"
  value={product.category}
  placeholder="Category"
  data={categories}
  header="Select a Category"
  handleChange={handleChange}
  disabled={product.parent}
/>
{product.category && (
  <MultipleSelect
    value={product.subCategories}
    data={subs}
    header="Select SubCategories"
    name="subCategories"
    disabled={product.parent}
    handleChange={handleChange}
  />
)}
<div>
  <AdminInput
    type="text"
    label="Name"
    name="name"
    placholder="Product name"
    onChange={handleChange}
  />
  <AdminInput
    type="text"
    label="Description"
    name="description"
    placholder="Product description"
    onChange={handleChange}
  />
  <AdminInput
    type="text"
    label="Brand"
    name="brand"
    placholder="Product brand"
    onChange={handleChange}
  />
  <AdminInput
    type="text"
    label="Sku"
    name="sku"
    placholder="Product sku/ number"
    onChange={handleChange}
  />
  <AdminInput
    type="text"
    label="Discount"
    name="discount"
    placholder="Product discount"
    onChange={handleChange}
  />
  <Sizes
    sizes={product.sizes}
    product={product}
    setProduct={setProduct}
  />
  <Details
    details={product.details}
    product={product}
    setProduct={setProduct}
  />{" "}
  <Questions
    questions={product.questions}
    product={product}
    setProduct={setProduct}
  />
  {/*
<Images
name="imageDescInputFile"
header="Product Description Images"
text="Add images"
images={description_images}
setImages={setDescriptionImages}
setColorImage={setColorImage}
/>



*/}
</div>
</div>
<button
type="submit"
className="p-2 border bg-gray-950 text-white font-bold"
>
Create Product
</button>