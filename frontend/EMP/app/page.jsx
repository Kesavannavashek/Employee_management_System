"use client";
import Link from "next/link";
import bg from "../public/pic-1.jpeg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
export default function Home() {


  return (
    <div  className="relative">
      <h1 className="md:text-4xl sm:text-5xl sm:leading-snug lg:text-6xl  lg:text-center lg:leading-snug text-4xl text-center my-3  font-black font-mono ">
        Welcome to{" "}
        <span className="lg:block lg:jump">Employee Management system</span>
      </h1>
      <hr className="border mx-6 rounded-full border-gray-900" />
      <Image
        src={bg}
        width={0}
        height={0}
        alt="Background Picture"
        className="lg:w-[50%] lg:h-[50%] sm:w-full"
      />

      <div className=" lg:absolute lg:right-20 lg:top-36 mx-3 p-3  text-center rounded-2xl  font-sans mb-6 tracking-wide leading-6 sm:mx-8  sm:my-6 border border-black lg:w-2/5 lg:mx-auto lg:p-4 lg:border-none lg:leading-8 lg:my-20 font-semibold">
        <p>
          Our Employee Management System is a tool that helps improve employee
          satisfaction and productivity to help a company achieve their overall
          goals.These tools help monitor, assess and control employees' working
          hours and efficiently utilise human resources.
        </p>
        <p>
          {" "}
          An{" "}
          <span className="animate-pulse text-black font-bold inline-block ">
            EMS
          </span>{" "}
          securely stores and manages the personal and work-related details of
          employees. This makes it easier for the managers to store and access
          relevant data when needed
        </p>

        <div  className=" w-full flex justify-center">
      
         <Link href={`/login`} prefetch> <button className="group bg-black p-2 rounded-xl text-white mt-3 font-bold hover:scale-105 transition ease-in-out duration-300 ">
            Get Started <ArrowForwardIcon className="group-hover:move " />
          </button></Link>
          
        </div>
      </div>
    </div>
  );
}
