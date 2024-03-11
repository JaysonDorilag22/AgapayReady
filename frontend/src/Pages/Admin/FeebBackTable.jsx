import React from 'react'

export default function FeebBackTable() {
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="max-w-lg w-full bg-slate-100 p-4 rounded-md outline outline-1 outline-slate-400 m-4">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Feeback Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Provide details about the product.</p>
  
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className="col-span-full">
                <label htmlFor="product-name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <div className="mt-2">
                  <input type="text" id="product-name" name="product-name" autoComplete="product-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              
              <div className="col-span-full">
                <label htmlFor="short-description" className="block text-sm font-medium leading-6 text-gray-900">Short Description</label>
                <div className="mt-2">
                  <input type="text" id="short-description" name="short-description" autoComplete="short-description" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              
              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                <div className="mt-2">
                  <textarea id="description" name="description" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>
              
              <div className="col-span-full">
                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">Image</label>
                <div className="mt-2">
                  <input type="file" className="file-input block file-input-bordered file-input-sm w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mt-2 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button type="submit" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Save</button>
        </div>
      </form>
    </div>
  </div>
  )
}
