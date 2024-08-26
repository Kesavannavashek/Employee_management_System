'use client'
import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { TL_TASK_DETAILS } from '../constants/const'

const TlDashboard = () => {
const router=useRouter();
  const[taskList,setTaskList]=useState([])
  const [isloading, setIsLoading] = useState(false);
  const[chech,setCheck]=useState("Checking access...")

  useEffect(()=>{

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login");
      return;
    }
    const decoded = jwt.decode(token);
    if (decoded.role !== "TL") {
      setCheck("unauthorized access !!!")
      toast.error("unauthorized access !!!");
      router.push("/login");
      return;
    }
    setCheck("Loading...")
    toast.success("Access Granted")
    axios.defaults.headers.common['Authorization']=`Bearer ${token}`
    const fetchData=()=>{

      axios.get(TL_TASK_DETAILS).then(res=>{
        console.log(res.data);
        setTaskList(res.data);
        setCheck("Access Granted...")
        
        setIsLoading(true);
      }).catch(err=>{
        console.log(err);
        if(err.response.status==406){
          toast.error("No Data Avilable")
          setIsLoading(true);
        }
        else
          toast.error("Error Occured")

      })

    }

    fetchData();

  },[])

  useEffect(() => {
    const handlePopState = () => {
      router.push("/TlDashboard");
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  if (!isloading) {
    return (
      <>
       
        <div className="flex justify-center items-center h-screen">
        <p className="lg:text-3xl text-lg">{chech}</p>
        </div>
      </>
    );
  }

  return (
    <> 
    
     <>
    <h1 className="bg-black w-full rounded-b-3xl py-3 text-center text-white font-bold font-mono text-lg">Management Console</h1>
    
    <div className="max-h-80 overflow-y-auto border border-lg border-black  w-[90%] mx-auto pb-2 rounded-xl mt-3">
      <table className='table-auto mx-auto w-[100%] '>
        <thead className="sticky top-0 bg-black text-white py-5">
          <tr className="font-serif">
            <th className="px-2">Task</th>
            <th className="px-2">Task Description</th>
            <th className="px-2 w-48">Start Date</th>
            <th className="px-2 w-48">End Date</th>
            <th className="px-2">Responsible</th>
            <th className="px-2">AssignedBy</th>
            <th className="px-2">Status</th>
          </tr>
        </thead>
        <tbody className="font-serif w-[100%] divide-y divide-slate-500">
          {taskList?.map((item, idx) => (
            <tr key={idx} className="my-5">
              <td className="  text-center p-2 text-pretty">{item.taskName}</td>
              <td className="  text-center p-2 text-pretty">{item.taskDesc}</td>
              <td className="  text-center p-2 text-pretty ">{item.startDate}</td>
              <td className="  text-center p-2 text-pretty ">{item.endDate}</td>
              <td className=" text-center p-2 text-pretty">{item.assignedTo}</td>
              <td className=" text-center p-2 text-pretty">{item.assignedBY}</td>
              <td className=" text-center p-2 text-pretty">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </></>
  )
}

export default TlDashboard
