'use client'
import React from 'react'
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const schema = z.object({
    oldPass:z.string().min(1,'password is required'),
    newPass: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),
    confPass:z.string()
}).refine(data=>data.newPass===data.confPass,{
  message:"Password doesn't matched",
  path:['confPass']
})

const Reset = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({ resolver: zodResolver(schema) });
    
      const onSubmit = (data) => {
        console.log(data);
        reset();
      };

  return (
    <div
    className="lg:w-[70%] lg:mx-auto">
      <h1 className={`z-20 mb-3 sticky top-0 w-full text-center bg-black p-3 text-white rounded-b-xl text-xl font-sans lg:w-[60%] lg:mx-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)]`}>
        Reset Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="confPass" className="ml-2">
            Old Password:
          </label>
          <input
            {...register("oldPass")}
            id="oldPass"
            className={`border ${errors.oldPass ?'border-red-500':'border-black'} block rounded-lg ml-2 px-2 py-1 font-mono w-[90%] lg:w-[100%] mx-4 drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] sm:w-[95%] `}
          />
           {errors.oldPass?.message && (
            <p className="text-red-500 text-xs ml-4">{errors.confPass.message}</p>
          )}

      <label htmlFor="newPass" className="ml-2">
            New Password:
          </label>
          <input
          type="password"
            {...register("newPass")}
            id="newPass"
            className={`border ${errors.newPass ?'border-red-500':'border-black'} block rounded-lg ml-2 px-2 py-1 font-mono w-[90%] lg:w-full mx-4 drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] sm:w-[95%]`}
          />
           {errors.newPass?.message && (
            <p className="text-red-500 text-xs ml-4">{errors.newPass.message}</p>
          )}
          <label htmlFor="confPass" className="ml-2">
            Confirm Password:
          </label>
          <input
            {...register("confPass")}
            id="confPass"
            className={`border ${errors.confPass ?'border-red-500':'border-black'} block rounded-lg ml-2 px-2 py-1 font-mono w-[90%] lg:w-[100%] mx-4 drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] sm:w-[95%] `}
          />
           {errors.confPass?.message && (
            <p className="text-red-500 text-xs ml-4">{errors.confPass.message}</p>
          )}
          
          <button type="submit" className="block bg-black px-3 py-1 rounded-full text-white my-3 mx-auto hover:scale-105 transiton duration-300 bg-gradient-to-r hover:from-pink-500 hover:to-orange-500">
            Reset
          </button>
       
      </form>
    </div>
  )
}

export default Reset
