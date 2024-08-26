"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MANAGER_TASK_DETAILS } from "../constants/const";

const Manager = () => {
  const router = useRouter();
  const [isToggle, setIsToggle] = useState(false);
  const [taskdata, setTaskData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const[chech,setCheck]=useState("Checking access...")

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    const decoded = jwt.decode(token);
    if (decoded.role !== "Manager") {
      setCheck("unauthorized access !!!")
      toast.error("unauthorized access !!!");
      router.push("/login");
      return;
    }
    setCheck("Loading...")
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          MANAGER_TASK_DETAILS
        );
        setTaskData(res.data);
        setCheck("Access Granted...")
        toast.success("Access Granted")
        setIsLoading(true);
      } catch (err) {
        console.log(err);
        if(err.response.status==406){
        setCheck("Access Granted...")
        toast.success("Access Granted")
        setIsLoading(true);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      router.push("/managerdashboard");
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

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
    <>
      <h1 className="bg-black z-50 w-full rounded-b-3xl py-2 text-center text-white font-bold font-serif lg:text-3xl lg:py-3 ">
        Management Console{" "}
      </h1>
      <div className="h-3 bg-white "></div>

      <div className="text-right">
        <Button
          ripple
          onClick={handleClick}
          className="mr-5 sm:mr-12 mb-1 bg-black text-white duration-1000 px-3 py-2 rounded-full lg:hidden w-fit"
        >
          {isToggle ? "X" : "+ ADD"}
        </Button>
      </div>

      <div className="relative">
        <div
          className={`absolute right-0 z-20 sm:mr-8 mr-5 text-center text-white flex flex-col justify-evenly  bg-white rounded-lg px-3 py-1 shadow shadow-2xl shadow-slate-900 divide-y divide-slate-500 border-[1px] border-black transition-all duration-100 ease-in-out overflow-hidden font-serif `}
          style={{
            width: isToggle ? "50%" : "0",
            height: isToggle ? "100px" : "0",
            opacity: isToggle ? "1" : "0",
            visibility: isToggle ? "visible" : "hidden",
          }}
        >
          <Link href="/managerdashboard/addTL">
            <Button
              ripple
              className="text-black rounded-full hover:scale-105 py-1"
            >
              Team Leader
            </Button>
          </Link>
          <Link href="/managerdashboard/addmember">
            <Button
              ripple
              className="text-black rounded-full hover:scale-105 py-1"
            >
              Team Member
            </Button>
          </Link>
          <Link href={`/managerdashboard/addTask`}>
            <Button ripple className="text-black hover:scale-105 py-1">
              Task
            </Button>
          </Link>
        </div>
      </div>

      <div className="lg:block hidden text-right mr-12 mb-3 pt-3 ">
        <Link href="/managerdashboard/addTL">
          <Button
            ripple
            className=" hover:shadow-[5px_5px_10px_2px_rgba(0,0,0,0.4),-5px_-5px_10px_2px_rgba(0,0,0,0.2)] bg-black rounded-lg text-white px-2 py-3 text-sm mx-3 hover:scale-105 py-1 break-words"
          >
            Add TL/Manager
          </Button>
        </Link>
        <Link href="/managerdashboard/addmember">
          <Button
            ripple
            className=" hover:shadow-[5px_5px_10px_2px_rgba(0,0,0,0.4),-5px_-5px_10px_2px_rgba(0,0,0,0.2)] bg-black rounded-lg text-white px-2 py-3 text-sm mx-3 hover:scale-105 py-1 break-words"
          >
            Add TeamMember
          </Button>
        </Link>
        <Link href={`/managerdashboard/addTask`}>
          <Button
            ripple
            className=" hover:shadow-[5px_5px_10px_2px_rgba(0,0,0,0.4),-5px_-5px_10px_2px_rgba(0,0,0,0.2)] bg-black rounded-lg text-white px-2 py-3 text-sm mx-3 hover:scale-105 py-1 break-words"
          >
            Add Task
          </Button>
        </Link>
      </div>
      <div
        className={`transition duration-100 ${
          isToggle ? "blur-lg" : "blur-none"
        } max-h-96 mt-8 lg:h-96 lg:w-[80%] overflow-y-auto ring-1 ring-offset-[6px] ring-black border border-black w-[90%] mx-auto pb-2 rounded-xl mt-3 lg:mt-10 shadow-[10px_10px_50px_2px_rgba(0,0,0,0.4),-10px_-10px_50px_2px_rgba(0,0,0,0.2)]`}
      >
        <table className=" mx-auto w-[100%] ">
          <thead className="sticky top-0 bg-black text-white py-5">
            <tr className="font-serif">
              <th className="px-2 py-3 ">Task</th>
              <th className="px-2">Responsible</th>
              <th className="px-5 text-nowrap ">End date</th>
              <th className="px-2">Status</th>
            </tr>
          </thead>
          <tbody className="font-serif w-[100%] divide-y divide-slate-500">
            {taskdata?.map((item, idx) => (
              <tr key={idx} className="my-5">
                <td className="  text-center py-4 text-pretty px-5">
                  {item.taskName}
                </td>
                <td className="  text-center  text-balance px-5">
                  {item.assignedTo}
                </td>
                <td className="  text-center   text-nowrap px-5">
                  {item.endDate}
                </td>
                <td className=" text-center px-5 text-pretty">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Manager;
