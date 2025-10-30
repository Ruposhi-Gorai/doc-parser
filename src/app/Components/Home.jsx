'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFile } from './Redux/docSlice';

export default function Home() {
  const dispatch = useDispatch();
  const [selectFile, setSelectFile] = useState(null);


  const fileChange = (e) => {
    setSelectFile(e.target.files[0]);
    dispatch(addFile(e.target.files[0]));
    console.log(e.target.files[0])
  };

  const handleFile = (e) => {
    e.preventDefault();
  };


  return (
    <div className="container mx-auto h-100 mt-20">
      <form className="flex justify-center items-center gap-2" action="/profile" method="post" enctype="multipart/form-data">
        <input type="file" onChange={fileChange} className="border p-4 cursor-pointer" />
        <button
          onClick={handleFile}
          className="p-2 rounded-sm bg-emerald-700 text-white cursor-pointer"
        >
          Upload file
        </button>
      </form>
    </div>
  );
}

