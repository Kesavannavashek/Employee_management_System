"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REGISTRATION } from "../constants/const";

const schema = z
  .object({
    name: z.string().min(1, { message: "Name field is required" }),
    email: z.string().email(),
    dob: z.string().date(),
    mobNo: z
      .string()
      .regex(/^\d{10}$/, "Invalid mobile number. It must be 10 digits."),
    gender: z.enum(["male", "Female"], { message: "Select any option" }),
    address: z
      .string()
      .min(1, { message: "Address field required" })
      .min(10, { message: "Address field is small" }),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),
    confPass: z.string(),
  })
  .refine((data) => data.password === data.confPass, {
    message: "Password doesn't matched",
    path: ["confPass"],
  });

const Register = () => {

  const router=useRouter()
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    router.prefetch("/login")
    setIsDisabled(true);
    toast.promise(axios
      .post(REGISTRATION, data)
      .then((res) => {
        console.log(res);
        router.push("/login")
        setIsDisabled(false);
        reset();
        toast.success("registration Succesfull");

      })
      .catch((err) => {
        setIsDisabled(false);
        console.log("err", err);
        toast.error("registration failed");
      }),{
        pending:"Registering..."
      })
    
  };

  return (
    <>
      <ToastContainer autoClose={3000} newestOnTop  limit={1} position="top-center" />
      <div className="lg:w-[50%] lg:pr-4 lg:pl-4 lg:my-3 lg:mx-auto pb-3 lg:rounded-tr-3xl lg:rounded-bl-3xl lg:shadow-2xl lg:shadow-black">
        <h1
          className={` sticky z-30 top-0 w-full text-center bg-black p-3 text-white rounded-b-xl lg:rounded-none text-xl font-sans lg:w-[100%] lg:mx-auto lg:my-2  lg:static lg:rounded-tr-3xl lg:rounded-bl-3xl font-serif`}
        >
          Registration
        </h1>
        <div className="my-3 mx-2 lg:w-[100%] lg:mx-auto ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="name"
              className="ml-4 font-serif font-bold mt-3  block"
            >
              Name:
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className={`border  block ${
                errors.name ? "border-red-500" : "border-black"
              } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] mx-4  drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] sm:w-[95%] lg:w-[96%]`}
            />
            {errors.name?.message && (
              <p className="text-red-500 text-xs ml-4">{errors.name.message}</p>
            )}
            <label
              htmlFor="email"
              className="ml-4 font-serif font-bold mt-3 block"
            >
              Email:
            </label>
            <input
              {...register("email")}
              type="text"
              id="email"
              className={`border  block ${
                errors.email ? "border-red-500" : "border-black"
              } drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] rounded-lg ml-2 px-2 py-1 font-mono w-[90%]  lg:w-[96%] mx-4 sm:w-[95%]`}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.email.message}
              </p>
            )}
            <label
              htmlFor="DOB"
              className="ml-4 font-serif font-bold mt-3 block"
            >
              DOB:
            </label>
            <input
              type="date"
              {...register("dob")}
              placeholder="YYYY-MM-DD"
              id="DOB"
              className={`border  block ${
                errors.DOB ? "border-red-500" : "border-black"
              } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] lg:w-[96%] mx-4 drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] sm:w-[95%]`}
            />
            {errors.dob?.message && (
              <p className="text-red-500 text-xs ml-4">{errors.dob.message}</p>
            )}
            <label
              htmlFor="mobNo"
              className="ml-4 font-serif font-bold mt-3 block"
            >
              Mobile No:
            </label>
            <input
              {...register("mobNo")}
              type="number"
              id="mobNo"
              className={`border  block ${
                errors.mobNo ? "border-red-500" : "border-black"
              } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] lg:w-[96%] mx-4 drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] sm:w-[95%]`}
            />
            {errors.mobNo?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.mobNo.message}
              </p>
            )}

            <label htmlFor="Gender" className="ml-4 mt-3 font-serif font-bold">
              Gender:
            </label>
            <input
              type="radio"
              name="Gender"
              {...register("gender")}
              id="male"
              value={"male"}
              className="ml-3 mt-3 drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)]"
            />
            <label
              htmlFor="male"
              className="ml-1 drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)]"
            >
              Male
            </label>
            <input
              type="radio"
              name="Gender"
              {...register("gender")}
              id="Female"
              value={"Female"}
              className="ml-3 drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)]"
            />
            <label htmlFor="Female" className="ml-1">
              Female
            </label>
            {errors.gender?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.gender.message}
              </p>
            )}

            <label
              className="ml-4 mt-3 font-serif font-bold mt-3 block"
              htmlFor="Address"
            >
              Address:
            </label>
            <textarea
              id="Address"
              {...register("address")}
              type="text"
              className={`border block ${
                errors.Address ? "border-red-500" : "border-black"
              } rounded-lg ml-2 px-2 py-1 text-clip  font-mono h-20 w-[90%] lg:w-[96%] mx-4  drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] sm:w-[95%]`}
            />
            {errors.address?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.address.message}
              </p>
            )}

            <label
              htmlFor="newPass"
              className="ml-4 font-serif font-bold mt-3 block"
            >
              New Password:
            </label>
            <input
              type="password"
              {...register("password")}
              id="newPass"
              className={`border ${
                errors.newPass ? "border-red-500" : "border-black"
              } block rounded-lg ml-2 px-2 py-1 font-mono w-[90%] lg:w-[96%] mx-4  drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] sm:w-[95%]`}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.password.message}
              </p>
            )}
            <label
              htmlFor="confPass"
              className="ml-4 font-serif font-bold mt-3 block"
            >
              Confirm Password:
            </label>
            <input
              {...register("confPass")}
              id="confPass"
              className={`border ${
                errors.confPass ? "border-red-500" : "border-black"
              } block rounded-lg ml-2 px-2 py-1  font-mono w-[90%] lg:w-[96%] mx-4 drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] sm:w-[95%] `}
            />
            {errors.confPass?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.confPass.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isDisabled}
              className={`block bg-black px-3 py-1 rounded-full text-white mt-4 mb-2 mx-auto hover:scale-105 transiton duration-300 bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 ${isDisabled ? 'cursor-wait ' : 'cursor-pointer'}`}
            >
              Submit
            </button>
          </form>
          <div className="text-center">
            <span className="text-xs mr-1">Already Registered ?</span>
            <Link href={`/login`} prefetch>
              <button className="hover:underline hover:scale-110 ">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
