// "use client";
// import { useState } from "react";

// export default function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!file) return alert("Please select a file first");

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("/src/app/Backend/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     setMessage(data.message || "Upload failed");
//   };

//   return (
//     <div className="p-6">
//       <form onSubmit={handleUpload}>
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="border p-2"
//         />
//         <button
//           type="submit"
//           className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Upload
//         </button>
//       </form>
//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// }
