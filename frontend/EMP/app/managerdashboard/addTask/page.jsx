"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADD_TASK_DETAILS,TEAM_LEADERS_LIST,TEAM_MEMBER_LIST } from "@/app/constants/const";



const AddTask = () => {
  const [isTl, setIsTL] = useState(2); 
  const [isDisabled, setIsDisabled] = useState(false);
  const [teamleaders, setTeamleaders] = useState([]);
  const [teamMember, setTeamMembers] = useState([]);
  const [enumValue, setEnumvalue] = useState([]); 
  const [isloading, setIsLoading] = useState(false);
  const[chech,setCheck]=useState("Checking access...")


  const router = useRouter();

  useEffect(() => {
    router.prefetch("/login");
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized access...")
      setCheck("Unauthorized access...")
      router.push("/login");
      return;
    }
    setCheck("Loading...")
    toast.success("access granated..")
    
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchData = async () => {
      setIsLoading(true)
      const arr = [];
      try {
        const memberRes = await axios.get(TEAM_MEMBER_LIST)
        setTeamMembers(memberRes.data);
        memberRes.data.forEach((item) => arr.push(item.email));
      } catch (err) {
        if(err.response.status==406)
          toast.error("No Team Members available...");
          else
          toast.error("Error Occured...");
      }
      try{
        const tlRes = await axios.get(TEAM_LEADERS_LIST);
        setTeamleaders(tlRes.data);
        tlRes.data.forEach((item) => arr.push(item.email));
      } catch (err) {
        if(err.response.status==406)
        toast.error("No Team Leaders available...");
        else
        toast.error("Error Occured...");
      }
       
 
        setEnumvalue(arr);
      
    };

    fetchData();
  }, [router]);

  const schema = z.object({
    taskName: z.string().min(1, { message: "TaskName field is required" }),
    taskDesc: z.string().min(10, { message: "Task Description is too short" }),
    startDate: z.string().nonempty({ message: "Start Date is required" }),
    endDate: z.string().nonempty({ message: "End Date is required" }),
    assignedTo: z.enum(enumValue,{message:"select Any one"}),
  });
 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const handleChange = (e) => setIsTL(e.target.value);

  const onSubmit = (data) => {
    setIsDisabled(true);
    
    data.rollCode = isTl;
    console.log(data);
    toast.promise(
      axios
        .post(ADD_TASK_DETAILS, data)
        .then((res) => {
          setIsDisabled(false);
          reset();
          toast.success("Task assigned successfully");
        })
        .catch((err) => {
          setIsDisabled(false);
          toast.error("Failed to assign task");
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
      <div className="lg:w-[50%] lg:pr-4 lg:pl-4 lg:my-3 lg:mx-auto pb-3 lg:rounded-tr-3xl lg:rounded-bl-3xl lg:shadow-2xl lg:shadow-black">
        <h1 className="sticky top-0 w-full text-center bg-black p-3 text-white rounded-b-xl lg:rounded-none text-xl font-sans lg:w-[100%] lg:mx-auto lg:my-2 lg:static lg:rounded-tr-3xl lg:rounded-bl-3xl font-serif">
          Task Assignment
        </h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="ml-4 mt-3 font-serif font-bold block" htmlFor="taskname">
              Task
            </label>
            <input
              {...register("taskName")}
              className={`border ${errors.taskName ? "border-red-500" : "border-black"} block rounded-lg ml-4 w-[85%] py-1 lg:w-[96%] px-2 font-mono`}
              type="text"
              id="taskname"
            />
            {errors.taskName?.message && (
              <p className="text-red-500 text-xs ml-4">{errors.taskName.message}</p>
            )}

            <label className="ml-4 mt-3 font-serif font-bold block" htmlFor="taskdesc">
              Task Description
            </label>
            <textarea
              {...register("taskDesc")}
              className={`border ${errors.taskDesc ? "border-red-500" : "border-black"} block rounded-lg ml-4 w-[85%] py-1 lg:w-[96%] px-2 font-mono`}
              id="taskdesc"
            />
            {errors.taskDesc?.message && (
              <p className="text-red-500 text-xs ml-4">{errors.taskDesc.message}</p>
            )}

            <label htmlFor="startdate" className="ml-4 mt-3 font-serif font-bold">
              Start Date
            </label>
            <input
              {...register("startDate")}
              className={`border ${errors.startDate ? "border-red-500" : "border-black"} block rounded-lg ml-4 w-[85%] py-1 lg:w-[96%] px-2 font-mono`}
              type="date"
              id="startdate"
            />
            {errors.startDate?.message && (
              <p className="text-red-500 text-xs ml-4">{errors.startDate.message}</p>
            )}

            <label htmlFor="enddate" className="ml-4 mt-3 font-serif font-bold block">
              End Date
            </label>
            <input
              {...register("endDate")}
              className={`border ${errors.endDate ? "border-red-500" : "border-black"} block rounded-lg ml-4 w-[85%] py-1 lg:w-[96%] px-2 font-mono`}
              type="date"
              id="enddate"
            />
            {errors.endDate?.message && (
              <p className="text-red-500 text-xs ml-4">{errors.endDate.message}</p>
            )}

            <label className="ml-4 mt-3 font-serif font-bold block">Assigned Type</label>
            <input
              value={2}
              {...register("rollCode")}
              onChange={handleChange}
              type="radio"
              name="assigntype"
              id="TL"
              className="ml-12"
              defaultChecked
            />
            <label className="ml-1 mt-3 font-mono" htmlFor="TL">
              Team Leader
            </label>
            <input
              value={3}
              {...register("rollCode")}
              onChange={handleChange}
              type="radio"
              name="assigntype"
              id="member"
              className="ml-3"
            />
            <label className="ml-1 mt-3 font-mono" htmlFor="member">
              Member
            </label>

            <label htmlFor="assignedto" className="ml-4 font-serif font-bold block mt-2">
              Assigned To
            </label>
            <select
              {...register("assignedTo")}
              name="assignedTo"
              id="assignedto"
              className="border border-black font-mono rounded-lg mt-1 ml-10"
            >
              <option value="">Select Anyone</option>
              {
            isTl == 2
                ? teamleaders?.map((member, idx) => {
                   return <option key={idx} value={`${member.email}`}>
                      {member.name}
                    </option>
                  })
                : teamMember?.map((member, idx) => {
               
                   return <option key={idx} value={`${member.email}`}>
                      {member.name}
                    </option>
                  })}
            </select>
            {errors.assignedTo?.message && (
              <p className="text-red-500 text-xs ml-10 mt-1">{errors.assignedTo.message}</p>
            )}

            <button
              className={`block ${isDisabled ? "cursor-wait " : "cursor-pointer"} mx-auto bg-black text-white rounded-full py-2 px-3 my-5 hover:scale-105 transition duration-300`}
              disabled={isDisabled}
              type="submit"
            >
              Assign
            </button>
          </form>
        </div>
      </div>
    </>
  );
};



export default AddTask;
