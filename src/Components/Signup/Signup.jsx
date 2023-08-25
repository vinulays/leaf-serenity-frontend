import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const notify = () => toast.success("Account created successfully.");

  const onSubmit = (data) => {
    data.role = "ROLE_USER";
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (success) {
      notify();
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    }
  }, [success, navigate, userInfo]);

  return (
    <div className="bg-[#F2E3DB]">
      <div className="pt-10 pb-10 md:w-[75%] m-auto">
        <Toaster />
        <div>
          <h1 className="text-center text-[32px] mb-10">
            {`Create your buyer  account`}.
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a email address where you can receive our updates.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("firstname", {
                        required: {
                          value: true,
                          message: "Firstname is required",
                        },
                        minLength: {
                          value: 4,
                          message: "Firstname is too short",
                        },
                      })}
                      type="text"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.firstname && (
                    <span className="text-red-600 text-sm">
                      {errors.firstname.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("lastname", {
                        required: {
                          value: true,
                          message: "Lastname is required",
                        },
                        minLength: {
                          value: 4,
                          message: "Lastname is too short",
                        },
                        maxLength: {
                          value: 10,
                          message: "Lastname is too long",
                        },
                      })}
                      type="text"
                      name="lastname"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.lastname && (
                    <span className="text-red-600 text-sm">
                      {errors.lastname.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Email is invalid",
                        },
                      })}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  {errors.email && (
                    <span className="text-red-600 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                      })}
                      id="password"
                      type="password"
                      autoComplete="password"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  {errors.password && (
                    <span className="text-red-600 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm password
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("passwordConfirm", {
                        required: {
                          value: true,
                          message: "Please confirm your email",
                        },
                        validate: (val) => {
                          if (watch("password") !== val) {
                            return "Password do not match";
                          }
                        },
                      })}
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      autoComplete="passwordConfirm"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.passwordConfirm && (
                    <span className="text-red-600 text-sm">
                      {errors.passwordConfirm.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Address Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("street", {
                        required: {
                          value: true,
                          message: "Street address is required",
                        },
                        minLength: {
                          value: 5,
                          message: "Street address is too short",
                        },
                        maxLength: {
                          value: 30,
                          message: "Street address is too long",
                        },
                      })}
                      type="text"
                      id="street"
                      autoComplete="street"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.street && (
                    <span className="text-red-600 text-sm">
                      {errors.street.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("country", {
                        required: {
                          value: true,
                          message: "Country is required",
                        },
                      })}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  {errors.country && (
                    <span className="text-red-600 text-sm">
                      {errors.country.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("city", {
                        required: { value: true, message: "City is required" },
                      })}
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="city"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.city && (
                    <span className="text-red-600 text-sm">
                      {errors.city.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("state", {
                        required: {
                          value: true,
                          message: "State / Province is required",
                        },
                      })}
                      type="text"
                      name="state"
                      id="state"
                      autoComplete="state"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.state && (
                    <span className="text-red-600 text-sm">
                      {errors.state.message}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("zip", {
                        required: {
                          value: true,
                          message: "ZIP / Postal code is required ",
                        },
                        pattern: {
                          value: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                          message: "Invalid ZIP / Postal code ",
                        },
                      })}
                      type="text"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.zip && (
                    <span className="text-red-600 text-sm">
                      {errors.zip.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <NavLink to={`/login`}>Cancel</NavLink>
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#E86A33] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
