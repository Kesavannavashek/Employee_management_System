'use client'
import React from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADD_MEMBER } from "@/app/constants/const";

const schema = z
  .object({
    name: z.string().min(1, { message: "Name field is required" }),
    email: z.string().email(),
    dob: z.string().date(),
    mobNo: z
      .string()
      .min(1, { message: "Mobile number in required" })
      .regex(/^\d{10}$/, "Invalid mobile number. It must be 10 digits."),
    gender: z.enum(["Male", "Female"], { message: "Select any option" }),
    department: z.enum(
      ["Frontend", "Backend", "Designing", "Digital Marketing", "IOT"],
      { message: "Select any option" }
    ),
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
    confpass: z.string(),
  })
  .refine((data) => data.password === data.confpass, {
    message: "Password doesn't matched",
    path: ["confpass"],
  });

const AddMember = () => {

  const [isloading, setIsLoading] = useState(false);
  const[chech,setCheck]=useState("Checking access...")

  const[isDisabled,setIsDisabled]=useState(false)
  const router = useRouter();


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
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const departments = [
    "Frontend",
    "Backend",
    "Designing",
    "Digital Marketing",
    "IOT",
  ];

  const onSubmit = (data) => {
    setIsDisabled(true)
        toast.promise(
        axios.post(ADD_MEMBER,data).then(res=>{
          console.log(res);
    
          setIsDisabled(false);
          reset();
          toast.success("registration Succesfull");
        }).catch(err=>{
          setIsDisabled(false);
          console.log("err", err);
          toast.error(err.response.data);
        }),{
          pending:'Adding.....'
        }
      )
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

  return (<>
    <ToastContainer
        autoClose={3000}
        newestOnTop
        limit={1}
        position="top-center"
      />
    <div className="lg:w-[50%] sm:w-[90%] w-full lg:pr-4 lg:pl-4 lg:my-3  lg:mx-auto lg:border lg:border-black lg:rounded-tr-3xl lg:rounded-bl-3xl lg:shadow-2xl lg:shadow-black border-none pb-3">
      <h1
        className={` sticky mb-3 top-0 w-full text-center bg-black p-3 text-white rounded-b-xl lg:rounded-none text-xl font-sans lg:w-[100%] lg:mx-auto lg:my-2  lg:static lg:rounded-tr-3xl lg:rounded-bl-3xl font-serif`}
      >
        Add Member
      </h1>
      <div className="sm:mx-auto w-[90%] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="ml-4 mt-3 font-serif font-bold" htmlFor="name">
            Name:{" "}
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
          <label className="ml-4 mt-3 font-serif font-bold" htmlFor="email">
            Email:{" "}
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
            <p className="text-red-500 text-xs ml-4">{errors.email.message}</p>
          )}
          <label className="ml-4 mt-3 font-serif font-bold" htmlFor="DOB">
            DOB:{" "}
          </label>
          <input
            {...register("dob")}
            type="date"
            id="DOB"
            className={`border  block ${
              errors.dob ? "border-red-500" : "border-black"
            } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] sm:w-[100%] lg:w-[96%] font-mono mt-1 mb-2 mx-4`}
          />
          {errors.dob?.message && (
            <p className="text-red-500 text-xs ml-4">{errors.dob.message}</p>
          )}
          <label className="ml-4 mt-3 font-serif font-bold" htmlFor="Mobile No">
            Mobile No:{" "}
          </label>
          <input
            {...register("mobNo")}
            type="text"
            id="Mobile No"
            className={`border  block ${
              errors.mobNo ? "border-red-500" : "border-black"
            } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] sm:w-[100%] lg:w-[96%] font-mono mt-1 mb-2 mx-4`}
          />
          {errors.mobNo?.message && (
            <p className="text-red-500 text-xs ml-4">{errors.mobNo.message}</p>
          )}
          <label
            className="ml-4 mt-3 font-serif block font-bold"
            htmlFor="department"
          >
            Department:{" "}
          </label>
          <select
            {...register("department")}
            name="department"
            id="department"
            className="text-center border mt-1 border-black rounded-md mb-2 font-mono ml-4"
          >
            {departments?.map((department, idx) => (
              <option
                key={idx}
                className="rounded-lg cursor-pointer hover:bg-gray-500 font-mono"
                value={`${department}`}
              >
                {department}
              </option>
            ))}
          </select>
          {errors.department?.message && (
            <p className="text-red-500 text-xs ml-4">
              {errors.department.message}
            </p>
          )}
          <label
            htmlFor="gender"
            className="block mt-3 ml-4 font-serif font-bold"
          >
            Gender:
          </label>
          <input
            {...register("gender")}
            type="radio"
            name="gender"
            value={`Male`}
            id="male"
            className="ml-14"
          />
          <label htmlFor="male" className="ml-1 font-mono mt-3">
            Male
          </label>
          <input
            {...register("gender")}
            type="radio"
            name="gender"
            id="female"
            value={`Female`}
            className="ml-3"
          />
          <label htmlFor="female" className="ml-1 font-mono">
            Female
          </label>
          {errors.gender?.message && (
            <p className="text-red-500 text-xs ml-4">{errors.gender.message}</p>
          )}
          <label
            htmlFor="address"
            className="block ml-4 mt-3 font-serif font-bold"
          >
            Address:{" "}
          </label>
          <textarea
            {...register("address")}
            name="address"
            id="address"
            className={`border  block ${
              errors.address ? "border-red-500" : "border-black"
            } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] sm:w-[100%] lg:w-[96%] font-mono mt-1 mb-2 mx-4`}
          ></textarea>
          {errors.address?.message && (
            <p className="text-red-500 text-xs ml-4">
              {errors.address.message}
            </p>
          )}
          <label
            htmlFor="newPass"
            className="block mt-3 ml-4 font-serif font-bold"
          >
            New Password:
          </label>
          <input
            {...register("password")}
            type="password"
            id="newPass"
            className={`border  block ${
              errors.password ? "border-red-500" : "border-black"
            } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] sm:w-[100%] lg:w-[96%] font-mono mt-1 mb-2 mx-4`}
          />
          {errors.password?.message && (
            <p className="text-red-500 text-xs ml-4">
              {errors.password.message}
            </p>
          )}
          <label
            htmlFor="confPass"
            className="block mt-3 ml-4 font-serif font-bold"
          >
            Confirm Password:
          </label>
          <input
            {...register("confpass")}
            id="confPass"
            className={`border  block ${
              errors.confpass ? "border-red-500" : "border-black"
            } rounded-lg ml-2 px-2 py-1 font-mono w-[90%] sm:w-[100%] lg:w-[96%] font-mono mt-1 mb-2 mx-4`}
          />
          {errors.confpass?.message && (
            <p className="text-red-500 text-xs ml-4">
              {errors.confpass.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            className={`block ${
              isDisabled ? "cursor-wait " : "cursor-pointer"
            } mb-4 bg-black px-4 py-1 text-white mx-auto rounded-xl my-3 hover:scale-110 transition duration-500 text-lg `}
          >
            Add
          </button>
        </form>
      </div>
    </div>
    </>);
};

export default AddMember;
