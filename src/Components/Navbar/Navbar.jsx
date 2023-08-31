import React, { useState } from "react";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
} from "../../features/cart/cartSlice";

const navigation = [
  { name: "Shop", href: "/", current: true },
  { name: "Plant Care", href: "#", current: false },
  { name: "About", href: "#", current: false },
  { name: "Contact Us", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const { isLogged, userInfo } = useSelector((state) => state.auth);
  const { cartItems, subTotal } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const toggleSearchBar = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Disclosure as="nav" className="bg-[#F2E3DB]">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-[4rem]">
              <div className="relative flex h-16 items-center justify-between">
                <NavLink to="/">
                  <strong className="text-[#41644A]">LEAF</strong> SERENITY
                </NavLink>

                <div className="hidden sm:ml-6 md:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={"rounded-md px-3 py-2 text-sm font-medium"}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div className="sm:flex items-center gap-3 pr-2 hidden sm:pr-0 text-sm">
                  {!isLogged ? (
                    <NavLink to="/login">Sign in</NavLink>
                  ) : (
                    <NavLink to="/profile">My Profile</NavLink>
                  )}
                  <Menu as="div" className="relative ml-3 hidden">
                    <div>
                      <Menu.Button className="relative flex rounded-full text-sm">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>

                        <UserIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#F2E3DB] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <button type="button" className="relative rounded-full">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Wishlist</span>
                    <HeartIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="relative rounded-full"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <div className="relative rounded-full flex gap-3">
                    {/* {expanded && (
                      <div className="transition-all duration-300 ease-in-out">
                        <input
                          type="text"
                          className="outline-none px-2 rounded-lg text-sm"
                        />
                      </div>
                    )} */}
                    <Transition
                      show={expanded}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="scale-0"
                      enterTo="scale-100"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="scale-100"
                      leaveTo="scale-0"
                    >
                      {(ref) => (
                        <div ref={ref} className="search-bar">
                          <input
                            type="text"
                            className="outline-none px-2 rounded-lg text-sm"
                          />
                        </div>
                      )}
                    </Transition>
                    <button
                      type="button"
                      className={`relative rounded-full ${
                        expanded ? "expanded" : ""
                      }`}
                      onClick={toggleSearchBar}
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Search bar</span>
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Profile dropdown */}

                  <div className=" inset-y-0  flex items-center md:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>

                <div className=" inset-y-0  flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={"block rounded-md px-3 py-2 text-sm font-medium"}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Shopping cart */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            {cartItems.length === 0 && (
                              <div className="mt-3 flex flex-col gap-7 items-center">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"
                                  alt=""
                                  className="h-auto mr-4 max-w-[40%]"
                                />
                                <span>No items in the cart!</span>
                              </div>
                            )}
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartItems.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt="cart item plant"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          ${product.price.toFixed(2)}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() =>
                                            dispatch(
                                              decrementQuantity(product._id)
                                            )
                                          }
                                        >
                                          <MinusCircleIcon className="h-5 w-5" />
                                        </button>
                                        <p className="text-gray-500">
                                          {product.quantity}
                                        </p>
                                        <button
                                          onClick={() =>
                                            dispatch(
                                              incrementQuantity(product._id)
                                            )
                                          }
                                        >
                                          <PlusCircleIcon className="h-5 w-5" />
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            dispatch(removeItem(product._id))
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>${subTotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-[#E86A33] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Navbar;
