"use client";
import loginImage from "../../public/login.png";
import Image from "next/image";
import z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LOGIN } from "../constants/const";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password required" }),
});

const Login = () => {

 useEffect(()=>{
  localStorage.removeItem("token")
 },[])

  const router =useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setIsDisabled(true)
    router.prefetch("/managerdashboard")
    router.prefetch("/TlDashboard")
    router.prefetch("/employeeDashboard")
    
    toast.promise(
      axios.post(LOGIN,data).then(res=>{
        localStorage.setItem("token",res.data);
        const decoded = jwt.decode(res.data);
        console.log(decoded.role);
        if(decoded.role === 'Manager')
          router.push("/managerdashboard");
        else if(decoded.role === 'TL')
          router.push("/TlDashboard");
        else
          router.push("/employeeDashboard");
        toast.success("Login Successfull")
        setIsDisabled(false)
        reset();
    }
    ).catch(err=>{
      console.log(err)
      toast.error("Login failed")
      setIsDisabled(false)
    }),{
      pending:"Authenticating..."
    }
  )
    
  }

  return (<>
  <ToastContainer autoClose={3000} newestOnTop  limit={1} position="top-center" />
   <h1 className="lg:block hidden text-7xl font-mono mt-3 text-center">
        Employee Management System
      </h1>
      <hr className="lg:block hidden border border-black mx-5 rounded-full" />

    <div className="lg:flex lg:justify-around lg:items-center ">
     
      <h1 className="text-center bg-black rounded-b-2xl text-white text-2xl py-2 font-mono lg:invisible">
        Login
      </h1>
      
      <div className="ml-12 mt-8 lg:w-[40%] lg:m-0 ">
        <Image
          src={loginImage}
          width={0}
          height={0}
          priority
          alt="Login Image"
          className="w-[80%] lg:w-[100%]  "
        />
      </div>
    <div className="w-[90%] border border-black mx-auto p-3 rounded-2xl bg-[#e2e8f0]  lg:w-[50%]   lg:pt-0 lg:px-0 lg:rounded-3xl lg:pb-0  shadow shadow-2xl shadow-black">
      <div >

     


        <h1 className="lg:block hidden text-center bg-black rounded-b-2xl text-white text-2xl py-2 font-serif font-bold lg:rounded-3xl lg:mt-3 lg:w-[95%] lg:mx-auto">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="email"
            className="font-bold mt-3 lg:block font-serif ml-4  lg:ml-7"
          >
            Email:{" "}
          </label>
          <input
            {...register("email")}
            type="text"
            className={`block drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] ml-2 lg:ml-6 lg:w-[90%] lg:py-2 border ${errors.email ? 'border-red-500':'border-black'}  w-[95%] rounded-2xl mt-1 px-3 py-1 `}
            id="email"
          />
          {errors.email?.message && <p className="text-red-500 text-xs ml-7">{errors.email.message}</p>}
          <label
            htmlFor="Password"
            className="font-bold mt-3 ml-4 block lg:ml-7 font-serif "
          >
            Password:{" "}
          </label>
          <input
            {...register("password")}
            type="password"
            className={`block drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] ml-2 lg:ml-6 lg:w-[90%] lg:py-2 border ${errors.password ? 'border-red-500':'border-black'} w-[95%] rounded-2xl mt-2 px-3 py-1`}
            id="Password"
          />
          {errors.password?.message && <p className="text-red-500 text-xs ml-7">{errors.password.message}</p>}
          <div className="lg:relative text-right w-[95%] lg:text-normal lg:w-full">
            <span className="text-xs  lg:absolute lg:top-0 lg:right-10">
              Forgot Password
            </span>
          </div>
          <div className="text-center lg:mb-1">
            <button
              type="submit"
              disabled={isDisabled}
              className={`bg-black ${isDisabled ? 'cursor-wait ' : 'cursor-pointer'} text-white px-3 py-1 rounded-full mt-6 mb-3 hover:scale-105 transition duration-300 hover:font-bold `}
            >
              Submit
            </button>
          </div>
        </form>
        <div className="lg:mx-auto text-center mb-3  lg:w-[100%]  lg:mt-3">
     
     <span className="text-xs">Not Registered? </span>
     <Link prefetch href={`/register`}>
       <button className="ml-2  hover:scale-105 hover:underline">
         Register
       </button>
     </Link>
      </div>
      </div>
    </div>
     
   </div></>
  );
};

export default Login;
