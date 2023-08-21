import React from "react";
import { useState } from "react";
import { MinusIcon, PlusIcon, StarIcon } from "@heroicons/react/20/solid";
import { Disclosure, RadioGroup } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Toaster, toast } from "react-hot-toast";

const product = {
  name: "Blue Anthurium Plant",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

const notify = () => toast.success("Blue Anthurium Plant added to cart!");
const notify2 = () => toast.success("Item added to favourites");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Plant = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <div className="bg-white">
      <Toaster />
      <div className="pt-6">
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:flex  lg:max-w-7xl  lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          {/* Images */}
          <div className="lg:basis-1/2 shrink-0">
            <img
              className="rounded-lg object-cover w-full h-auto"
              src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
              alt=""
              srcset=""
            />
          </div>
          {/* Options */}
          <div className="mt-4 lg:mt-0">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>
            <h2 className="sr-only">Product information</h2>
            <p className="text-xl tracking-tight text-gray-900 mt-2">
              {product.price}
            </p>

            <div className="mt-4 text-base text-gray-600">
              The Zip Tote Basket is the perfect midpoint between shopping tote
              and comfy backpack. With convertible straps, you can hand carry,
              should sling, or backpack this convenient and spacious bag. The
              zip top and durable canvas construction keeps your goods protected
              for all-day use.
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-[#E86A33] hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              {/* <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}

              <div className="flex items-center gap-3 mt-10">
                <button
                  type="button"
                  className="rounded-md border border-transparent bg-[#E86A33] px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={notify}
                >
                  Add to bag
                </button>
                <button type="button" onClick={notify2}>
                  <HeartIcon className="h-6 w-6  text-gray-500" />
                </button>
              </div>

              <div className="mt-8 text-base text-gray-500">
                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-4 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Shipping
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          <ul className="list-disc">
                            <li>Free shipping on orders over $300</li>
                            <li>International shipping available</li>
                            <li>No returns for live plants</li>
                            <li>Delivery confirmation for order security</li>
                          </ul>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-4 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Plant care
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          <ul className="list-disc">
                            <li>Wipe and Dust Leaves as Necessary</li>
                            <li>Gently Clean Leaves with Mild Soap</li>
                            <li>Rinse and Clean Interior Compartments</li>
                            <li>Nourish Wood with Plant-Safe Conditioner</li>
                          </ul>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plant;
