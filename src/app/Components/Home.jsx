'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFile } from './Redux/docSlice';

export default function Home() {
    const dispatch = useDispatch();
  const [selectFile, setSelectFile] = useState([])
  const doc = useSelector((data)=>{
   return data.doc.value
  })
    const fileChange = (e)=>{
    setSelectFile(e.target.files[0])
    console.log(selectFile)
     dispatch(addFile(e.target.files[0]))


  }
  const handleFile = (e)=>{
    e.preventDefault();
        console.log(selectFile)
        console.log(doc)
  }

  return (
    <>   
    <div className='container mx-auto h-100 mt-20 '>
      <form action="" className='flex justify-center items-center gap-2'>
      <input type="file" onChange={fileChange}  className='border  p-4 cursor-pointer'/>
      <button
      onClick={handleFile}
      className='p-2 rounded-sm bg-emerald-700 text-white cursor-pointer'>Upload file</button>
    </form>
    </div>
    </>
  )
}
