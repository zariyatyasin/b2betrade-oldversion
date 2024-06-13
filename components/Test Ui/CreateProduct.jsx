/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sgGQhgcQ2PU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function Component() {
  return (
    <div className="w-full">
      <header className="bg-white border-b p-4 md:px-6 md:py-4 flex items-center justify-between">
        <div className="flex items-center">
          <MicroscopeIcon className="w-5 h-5 text-gray-500" />
          <input
            className="ml-2 border-none focus:ring-0 w-full md:w-auto"
            placeholder="Search"
            type="search"
          />
        </div>
        <div className="flex items-center">
          <Button className="hidden md:inline-flex" size="sm" variant="primary">
            Upgrade
          </Button>
          <Avatar className="ml-4">
            <AvatarImage
              alt="Ahmed M."
              src="/placeholder.svg?height=32&width=32"
            />
            <AvatarFallback>A M</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="p-4 md:p-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Add New Product
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage product share on store
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-md p-6">
              <h2 className="text-lg font-semibold">General Information</h2>
              <p className="mt-1 text-sm text-gray-600">
                Set basic details about your product
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <img
                      alt="Product thumbnail"
                      className="border rounded-md"
                      height="64"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width="64"
                    />
                    <img
                      alt="Product thumbnail"
                      className="border rounded-md"
                      height="64"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width="64"
                    />
                    <img
                      alt="Product thumbnail"
                      className="border rounded-md"
                      height="64"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width="64"
                    />
                  </div>
                  <Button size="sm" variant="outline">
                    Upload Images
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    + English
                  </Button>
                  <Button size="sm" variant="outline">
                    + Arabic
                  </Button>
                </div>
                <div>
                  <Label htmlFor="product-name">Product name</Label>
                  <Input id="product-name" placeholder="E-Commerce 14%" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    className="min-h-[100px]"
                    id="description"
                    placeholder="Product description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="000002" />
                  </div>
                  <div>
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input id="barcode" placeholder="0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="weight">Weight, kg</Label>
                  <Input id="weight" placeholder="Weight in kg" />
                </div>
                <div className="flex items-center">
                  <Checkbox id="shipping" />
                  <Label className="ml-2" htmlFor="shipping">
                    Requires shipping or pickup
                  </Label>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md p-6">
              <h2 className="text-lg font-semibold">Product Publish</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Draft" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center">
                  <Checkbox id="schedule" />
                  <Label className="ml-2" htmlFor="schedule">
                    Schedule availability
                  </Label>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Pricing</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="price">Pricing</Label>
                      <Input id="price" placeholder="0.00" />
                    </div>
                    <div>
                      <Label htmlFor="cost-per-item">Cost per item</Label>
                      <Input id="cost-per-item" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="margin">Margin</Label>
                      <Input id="margin" placeholder="0" />
                    </div>
                    <div>
                      <Label htmlFor="profit">Profit</Label>
                      <Input id="profit" placeholder="0" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Discount</h3>
                  <div className="flex items-center mt-2">
                    <Switch id="discount" />
                    <Label className="ml-2" htmlFor="discount">
                      You want apply discount?
                    </Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="discount-type">Discount Type</Label>
                      <Select>
                        <SelectTrigger id="discount-type">
                          <SelectValue placeholder="%" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="%">%</SelectItem>
                          <SelectItem value="amount">Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="discount-value">10 %</Label>
                      <Input id="discount-value" placeholder="10" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="price-before">Price</Label>
                      <Input id="price-before" placeholder="100.00" />
                    </div>
                    <div>
                      <Label htmlFor="price-after">After Disc.</Label>
                      <Input id="price-after" placeholder="90.00" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Organization</h3>
                  <div className="mt-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MicroscopeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  );
}
