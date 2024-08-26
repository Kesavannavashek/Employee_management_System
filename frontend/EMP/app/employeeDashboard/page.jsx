"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import jwt from 'jsonwebtoken'
import Image from "next/image";
import Link from "next/link";
import Profile from "../../public/human.jpeg";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MEMBER_DETAIL,MEMBER_TASK_DETAIL } from "../constants/const";


const TaskView = () => {

  const router = useRouter();

  const [isToggle, setIsToggle] = useState(false);
  const [taskDetails, setTaskDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [chech, setCheck] = useState("Checking access...");

  useEffect(() => {
    const handlePopState = () => {
      router.push("/employeeDashboard");
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    const decoded = jwt.decode(token);
    if (decoded.role !== "Member") {
      setCheck("unauthorized access !!!");
      toast.error("unauthorized access !!!");
      router.push("/login");
      return;
    }
    setCheck("Loading...");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const fetchData = async () => {
      try {
        const res = await axios.get(MEMBER_DETAIL);
        setUserDetails(res.data);
        setCheck("Access Granted...");
        setIsLoading(true);
      } catch (err) {
        console.log(err);
        if (err.response.status == 406) {
          setCheck("Access Granted...");
          toast.success("Access Granted");
          setIsLoading(true);
        }
      }
      try {
        const res = await axios.get(
          MEMBER_TASK_DETAIL
        );
        setTaskDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  

  const handleClick = () => setIsToggle((prev) => !prev);

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
    <div className="relative lg:flex">
      <div
        className={`lg:sticky  fixed z-50 top-0 left-0 h-screen bg-black duration-300 ease-in-out ${
          isToggle ? "w-[70%]" : "w-[0]"
        } lg:w-[35%]`}
      >
        <div className="flex justify-end lg:hidden">
          <CloseIcon
            onClick={handleClick}
            className={` ${
              isToggle ? "block" : "hidden"
            }  text-white m-3 text-3xl cursor-pointer`}
          />
        </div>
        <div
          className={`${
            isToggle ? "block" : "hidden"
          } text-white lg:block lg:mt-16 lg:text-lg`}
        >
          <center>
            <h1 className="lg:block hidden text-2xl rounded-tr-full font-serif rounded-bl-full bg-gray-600 py-2 w-[80%] my-8">
              Account Info
            </h1>
            <div>
              <Image
                src={Profile}
                width={70}
                height={90}
                alt="Profile image"
                className="rounded-full ring-2 ring-offset-4 ring-offset-black shadow-lg shadow-blue-500"
              />
            </div>
            <div className="text-white my-3 font-mono text-xl text-lg mx-3">
              <p className="my-2 ">EMS{userDetails.userEntity.userId}</p>
              <p className="my-2">{userDetails.name}</p>
              <p className="my-2">{userDetails.userEntity.email}</p>
              
              <Link href="/resetPass">
                <button className="my-2 rounded-xl py-1 font-mono px-1 bg-red-700 w-24 font-mono leading-4">
                  Reset Password
                </button>
              </Link>
              <Link href={`/login`}>
              <button className="my-2 rounded-lg py-2 font-mono px-1 bg-green-800 block w-24 font-mono leading-4">
                Logout
              </button></Link>
            </div>
          </center>
        </div>
      </div>

      <div
        className={`relative ${
          isToggle ? "blur-lg" : "blur-none"
        } transition duration-100 lg:w-full`}
      >
        <button
          onClick={handleClick}
          className="absolute top-0 left-0 mt-3 ml-2 lg:hidden"
        >
          <AccountCircleIcon className="text-white" />
        </button>
        <h1 className="bg-black text-white text-center py-2 lg:py-4 font-serif text-2xl lg:text-3xl lg:sticky lg:top-0 z-30">
          Task Details
        </h1>

        <div className="h-10 relative lg:w-full bg-black">
          <div className="bg-white w-full h-96 absolute top-0 rounded-t-lg">
            <div className="m-2 lg:w-[90%] lg:mx-auto">
              {taskDetails?.map((task, idx) => (
                <Accordion
                  key={idx}
                  className="my-3 mx-2 shadow-2xl shadow-black rounded-lg border-xl border-none"
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="font-bold font-serif text-lg lg:text-xl">
                      Task:
                    </Typography>
                    <Typography
                      className="font-sans lg:text-xl lg:mt-0 mt-[1px] ml-1"
                      style={{ wordBreak: "break-word" }}
                    >
                      {task.taskName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="lg:text-xl">
                    <Typography className="font-bold font-serif lg:text-xl">
                      Task Details:
                    </Typography>
                    <Typography className="break-words font-sans lg:text-xl ml-10">
                      {task.taskDesc}
                    </Typography>
                    <Typography className="font-bold font-serif lg:text-xl">
                      Start Date:
                    </Typography>
                    <Typography className="lg:text-xl font-sans ml-10">
                      {task.startDate}
                    </Typography>
                    <Typography className="font-bold font-serif lg:text-xl">
                      End Date:
                    </Typography>
                    <Typography className="font-sans ml-10 lg:text-xl">
                      {task.endDate}
                    </Typography>
                    <Typography className="font-bold font-serif lg:text-xl">
                      Assigned By:
                    </Typography>
                    <Typography className="font-sans ml-10 break-words lg:text-xl">
                      {task.assignedBY}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskView;
