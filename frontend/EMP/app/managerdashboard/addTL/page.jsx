"use client";
import React from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState ,useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ADD_TL_OR_MANAGER } from "@/app/constants/const";


const schema = z
  .object({
    name: z.string().min(1, { message: "Name field is required" }),
    email: z.string().email(),
    dob: z.string().date(),
    mobNo: z
      .string()
      .min(1, { message: "Mobile number in required" })
      .regex(/^\d{10}$/, "Invalid mobile number. It must be 10 digits."),
    gender: z.enum(["male", "Female"], { message: "Select any option" }),
    role: z.enum(["TL", "Manager"], { message: "Select any option" }),
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
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const[chech,setCheck]=useState("Checking access...")
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(()=>{
    router.prefetch("/login")
    const token = localStorage.getItem("token");
    if(!token){
      toast.error("Unauthorized access...")
      setCheck("Unauthorized access...")
      router.push("/login")
      return
    }
    setCheck("Loading...")
    toast.success("access granated..")
    setIsLoading(true)
    axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
  },[])

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
  
    console.log(data);
    setIsDisabled(true);
    toast.promise(
      axios
        .post(ADD_TL_OR_MANAGER, data)
        .then((res) => {
          console.log(res);

          setIsDisabled(false);
          reset();
          toast.success("registration Succesfull");
        })
        .catch((err) => {
          setIsDisabled(false);
          console.log("err", err);
          toast.error(err.response.data);
        }),
      {
        pending: "Adding...",
      }
    );
  };

  if (!isloading) {
    return (
      <>
        <ToastContainer
          autoClose={3000}
          newestOnTop
          limit={1}
          position="top-center"
        />
        <div className="flex justify-center items-center h-screen">
        <p className="lg:text-3xl text-lg">{chech}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer
        autoClose={3000}
        newestOnTop
        limit={1}
        position="top-center"
      />
      <div className="lg:w-[50%]  lg:pr-4 lg:pl-4 lg:my-3 lg:mx-auto pb-2 lg:rounded-tr-3xl lg:rounded-bl-3xl lg:shadow-2xl lg:shadow-black ">
        <h1
          className={` sticky top-0 w-full text-center bg-black p-3 text-white rounded-b-xl lg:rounded-none text-xl font-sans lg:w-[100%] lg:mx-auto lg:my-2  lg:static lg:rounded-tr-3xl lg:rounded-bl-3xl font-serif`}
        >
          Add TL/Manager
        </h1>
        <div className="my-3 mx-2 lg:w-[100%] sm:mx-auto sm:w-[90%] lg:mx-auto ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className="ml-2 font-serif font-bold">
              Name:
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className={`border  block ${
                errors.name ? "border-red-500" : "border-black"
              } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] sm:w-[100%] lg:w-[96%] font-mono mt-1 mb-2 mx-4`}
            />
            {errors.name?.message && (
              <p className="text-red-500 text-xs ml-4">{errors.name.message}</p>
            )}
            <label htmlFor="email" className="ml-2 font-serif font-bold">
              Email:
            </label>
            <input
              {...register("email")}
              type="text"
              id="email"
              className={`border  block ${
                errors.email ? "border-red-500" : "border-black"
              } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] sm:w-[100%] lg:w-[96%] font-mono mt-1 mb-2 mx-4`}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.email.message}
              </p>
            )}
            <label htmlFor="DOB" className="ml-2 font-serif font-bold">
              DOB:
            </label>
            <input
              type="date"
              {...register("dob")}
              placeholder="YYYY-MM-DD"
              id="DOB"
              className={`border  block ${
                errors.dob ? "border-red-500" : "border-black"
              } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] sm:w-[100%] lg:w-[96%] font-mono mt-1 mb-2 mx-4`}
            />
            {errors.dob?.message && (
              <p className="text-red-500 text-xs ml-4">{errors.dob.message}</p>
            )}
            <label htmlFor="mobNo" className="ml-2 font-serif font-bold">
              Mobile No:
            </label>
            <input
              {...register("mobNo")}
              type="number"
              id="mobNo"
              className={`border  block ${
                errors.mobNo ? "border-red-500" : "border-black"
              } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] sm:w-[100%] lg:w-[96%] font-mono mt-1 mb-2 mx-4`}
            />
            {errors.mobNo?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.mobNo.message}
              </p>
            )}

            <label
              htmlFor="Gender"
              className="ml-2 mt-2 block font-serif font-bold"
            >
              Gender:
            </label>
            <input
              type="radio"
              name="Gender"
              {...register("gender")}
              id="male"
              value={"male"}
              className="ml-12"
            />
            <label htmlFor="male" className="ml-1 font-mono">
              Male
            </label>
            <input
              type="radio"
              name="Gender"
              {...register("gender")}
              id="Female"
              value={"Female"}
              className="ml-3 "
            />
            <label htmlFor="Female" className="ml-1 font-mono">
              Female
            </label>
            {errors.gender?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.gender.message}
              </p>
            )}

            <label
              htmlFor="role"
              className=" ml-3 mt-2 block font-serif font-bold"
            >
              Role:
            </label>
            <input
              type="radio"
              name="role"
              {...register("role")}
              id="TL"
              value={"TL"}
              className="ml-12"
            />
            <label htmlFor="TL" className="ml-1 font-mono">
              TL
            </label>
            <input
              type="radio"
              name="role"
              {...register("role")}
              id="Manager"
              value={"Manager"}
              className="ml-3 "
            />
            <label htmlFor="Manager" className="ml-1 font-mono">
              Manager
            </label>
            {errors.role?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.gender.message}
              </p>
            )}

            <label
              className="ml-3 mt-2 block font-serif font-bold"
              htmlFor="Address"
            >
              Address:
            </label>
            <textarea
              id="Address"
              {...register("address")}
              type="text"
              className={`border block ${
                errors.address ? "border-red-500" : "border-black"
              } sm:w-[100%] rounded-lg ml-2 px-2 py-1 text-clip  font-mono h-20 w-[90%] lg:w-[96%] font-mono mt-1 mb-2 mx-4 `}
            />
            {errors.address?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.address.message}
              </p>
            )}

            <label htmlFor="newPass" className="ml-3 font-serif font-bold">
              New Password:
            </label>
            <input
              type="password"
              {...register("password")}
              id="newPass"
              className={`border ${
                errors.password ? "border-red-500" : "border-black"
              } block rounded-lg ml-2 px-2 py-1 font-mono w-[90%] lg:w-[96%] sm:w-[100%] font-mono mt-1 mb-2 mx-4`}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.password.message}
              </p>
            )}
            <label htmlFor="confPass" className="ml-3 font-serif font-bold">
              Confirm Password:
            </label>
            <input
              {...register("confPass")}
              id="confPass"
              className={`border ${
                errors.confPass ? "border-red-500" : "border-black"
              } block rounded-lg ml-2 px-2 py-1 font-mono w-[90%] lg:w-[96%] sm:w-[100%] font-mono mt-1 mb-2 mx-4`}
            />
            {errors.confPass?.message && (
              <p className="text-red-500 text-xs ml-4">
                {errors.confPass.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isDisabled}
              className={`block ${
                isDisabled ? "cursor-wait " : "cursor-pointer"
              } bg-black px-4 py-2 rounded-full text-white my-3 mx-auto hover:scale-105 transiton duration-300 bg-gradient-to-r hover:from-pink-500 hover:to-orange-500`}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
