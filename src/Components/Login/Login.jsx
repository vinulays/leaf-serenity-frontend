import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLogin } from "../../features/auth/authActions";

const Login = ({ setOpen2 }) => {
  const { error, isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (isLogged) {
      // navigate("/", { replace: true });
      setOpen2(false);
    }
  }, [isLogged, navigate]);

  useEffect(() => {
    if (error && error === "User not found") {
      setError("email", {
        type: "manual",
        message: "Email not found",
      });
    } else if (error && error === "Incorrect password") {
      setError("password", {
        type: "manual",
        message: "Incorrect password",
      });
    }
  }, [error, setError]);

  return (
    <div className="items-center min-h-full">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  text-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-start text-2xl  leading-9 tracking-tight ">
            Welcome back
          </h2>
          <span className="text-sm">
            Welcome back. Please enter your details
          </span>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
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
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <span className="text-red-600 text-xs">
                  {errors?.email?.message}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 "
                >
                  Password
                </label>
                <div className="text-sm">
                  <NavLink
                    to="/signup"
                    className="font-semibold  hover:text-indigo-500"
                  >
                    Forgot password?
                  </NavLink>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                  })}
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <span className="text-red-600 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 bg-[#E86A33] text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm ">
            Not a member?{" "}
            <NavLink
              to={`/signup`}
              className="font-semibold leading-6 text-[#E86A33] hover:underline"
            >
              Register now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
