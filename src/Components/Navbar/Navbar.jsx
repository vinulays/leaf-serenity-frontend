import React, { useState } from "react";
import { Fragment } from "react";
import {
  Dialog,
  Disclosure,
  Listbox,
  Menu,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UserIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  ChevronDownIcon,
  CheckIcon,
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

const categories = [
  { name: "All Categories" },
  { name: "Gaming Laptops" },
  { name: "Monitors" },
  { name: "VGA Cards" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { isLogged } = useSelector((state) => state.auth);
  const { cartItems, subTotal } = useSelector((state) => state.cart);

  const [selected, setSelected] = useState(categories[0]);

  const dispatch = useDispatch();

  return (
    <div>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-[8rem] lg:mt-2">
              <div className="relative flex h-16 items-center justify-between">
                <div>
                  <NavLink to="/" className="flex gap-1">
                    <strong className="text-[#41644A]">LEAF</strong> SERENITY
                  </NavLink>
                </div>

                <div className="w-[50%]">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute top-[13px]  left-4 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Searching for..."
                      className="w-full py-3 px-10 rounded-3xl border-gray-300 border text-sm focus:outline-none"
                    />
                    <div className="absolute top-0 right-0">
                      <Listbox value={selected} onChange={setSelected}>
                        <div className="relative z-10">
                          <Listbox.Button className="relative w-[175px] cursor-pointer border border-gray-300 rounded-r-3xl bg-gray-200 py-3 pl-3 pr-10 text-left  sm:text-sm">
                            <span className="block truncate">
                              {selected.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {categories.map((category, categoryIdx) => (
                                <Listbox.Option
                                  key={categoryIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={category}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {category.name}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>
                </div>
                <div className="sm:flex items-center gap-4 pr-2 hidden sm:pr-0 text-sm">
                  {!isLogged ? (
                    <NavLink to="/login">
                      <button className="rounded-full bg-gray-200 p-2">
                        <UserIcon className="h-6 w-6 rounded-full" />
                      </button>
                    </NavLink>
                  ) : (
                    <NavLink to="/profile">My Profile</NavLink>
                  )}
                  <Menu as="div" className="relative ml-3 hidden">
                    <div>
                      <Menu.Button className="relative flex rounded-full text-sm">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>

                        <UserIcon className="h-6 w-6" aria-hidden="true" />
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
                              href="/"
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
                              href="/"
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
                              href="/"
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

                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="relative rounded-full bg-gray-200 p-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 flex justify-center items-center items p-1 text-white">
                      <span>{cartItems.length}</span>
                    </span>

                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

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
                            <ul className="-my-6 divide-y divide-gray-200">
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
                            href="/"
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
