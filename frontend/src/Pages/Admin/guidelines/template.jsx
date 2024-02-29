//  <>
//       <AdminNavbar />
//       <div className="flex">
//         <div className="w-full m-3">
//           <ToastContainer />
//           <h1 className="text-3xl font-bold mb-3 text-center">Guidelines</h1>
//           <div className="flex flex-col md:flex-row border rounded p-4">
//             {" "}
//             <div className="md:mr-5 flex-1 mb-5 md:mb-0">
//               <form onSubmit={handleSubmit} className="space-y-4 text-sm">
//                 <h1 className="text-3xl font-bold mb-3 text-center">
//                   CREATE CATEGORY
//                 </h1>
//                 <div>
//                   <label className="block mb-1 font-semibold">Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-semibold">Short Description:</label>
//                   <input
//                     type="text"
//                     name="short_description"
//                     value={formData.short_description}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-semibold">
//                     Description:
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded"
//                     rows="4"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block mb-1 font-semibold">Image:</label>
//                   <input
//                     type="file"
//                     name="image"
//                     accept="image/*"
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loading} // Disable button when loading
//                   className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full md:w-auto ${
//                     loading ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {loading ? "Creating..." : "Create Category"}
//                 </button>
//               </form>
//             </div>
//             <div className="flex-1 border-t mt-5 md:mt-0 md:border-t-0 md:border-l md:pl-5">
//               <div>
//                 <CategoryGuidelinesTable />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>