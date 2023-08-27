import React, { useEffect } from "react";
import { MinusIcon, PlusIcon, StarIcon } from "@heroicons/react/20/solid";
import { Disclosure } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getPlantById } from "../../features/plants/plantsActions";
import { useParams } from "react-router-dom";

const reviews = { href: "#", average: 4, totalCount: 117 };

const notify = () => toast.success("Blue Anthurium Plant added to cart!");
const notify2 = () => toast.success("Item added to favourites");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Plant = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { plantInfo, plantStatus } = useSelector((state) => state.plants);

  useEffect(() => {
    if (plantStatus === "idle") {
      dispatch(getPlantById(params.id));
    }
  }, [plantStatus, dispatch, params.id]);

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
              src={plantInfo && plantInfo.image}
              alt=""
              srcSet=""
            />
          </div>
          {/* Options */}
          <div className="mt-4 lg:mt-0">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                {plantInfo && plantInfo.name}
              </h1>
            </div>
            <h2 className="sr-only">Product information</h2>
            <p className="text-xl tracking-tight text-gray-900 mt-2">
              ${plantInfo && plantInfo.price}
            </p>

            <div className="mt-4 text-base text-gray-600">
              {plantInfo && plantInfo.description}
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
              <div className="flex items-center gap-5 mt-10">
                <button
                  type="button"
                  className="rounded-md border border-transparent bg-[#E86A33] px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={notify}
                >
                  Add to bag
                </button>
                <button
                  type="button"
                  onClick={notify2}
                  className="hover:bg-gray-100 p-3 rounded-lg text-gray-500 hover:text-black"
                >
                  <HeartIcon className="h-6 w-6" />
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
