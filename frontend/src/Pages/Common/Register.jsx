import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Vite from "../../assets/services/vite.png";
import axios from "axios";

export default function() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    departmentId: '',
    avatar: null, 
    departments: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  useEffect(() => {
    fetchDepartments(); // Fetch departments when component mounts
  }, []);
  // `${import.meta.env.VITE_PORT}/api/v1/login`
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PORT}/api/v1/departments`);
      setFormData(prevState => ({ ...prevState, departments: response.data }));
    } catch (error) {
      console.error('Error fetching departments', error);
      // Handle error, e.g., show error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const { firstname, lastname, email, password, avatar, departmentId } = formData;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstname', firstname);
      formDataToSend.append('lastname', lastname);
      formDataToSend.append('email', email);
      formDataToSend.append('password', password);
      formDataToSend.append('departmentId', departmentId);
      formDataToSend.append('avatar', avatar); // Append the avatar file

      await axios.post('/api/v1/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('User registered successfully');
      navigate("/login");

      // Redirect or show success message
    } catch (error) {
      console.error('Registration failed', error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <section className="bg-white">
    <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
      <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
        <img
          alt="Night"
          src="https://sa.kapamilya.com/absnews/abscbnnews/media/2022/news/11/10/earthquake-drill-students-epa-1.jpg"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div className="hidden lg:relative lg:block lg:p-12">
          <a className="block text-white" href="/">
            <span className="sr-only">Home</span>
            <img src={Vite} alt="Vite Logo" className="h-8" />
          </a>

          <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Welcome to AgapayReady
          </h2>

          <p className="mt-4 leading-relaxed text-white/90">
            Discover peace of mind in every crisis. AgapayReady keeps you
            informed and empowered during emergencies at TUP-Taguig. From
            real-time updates to intuitive guidance, stay safe with us.
          </p>
        </div>
      </section>

      <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
        <div className="max-w-xl lg:max-w-3xl">
          <div className="relative -mt-16 block lg:hidden">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <img src={Vite} alt="Vite Logo" className="h-8" />
            </a>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to AgapayReady
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid grid-cols-6 gap-6"
          >
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="FirstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>

              <input
                type="text"
                id="FirstName"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="placeholder"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>

              <input
                type="text"
                id="LastName"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Email{" "}
              </label>

              <input
                type="email"
                id="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Password{" "}
              </label>

              <input
                type="password"
                id="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />

            </div>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="Department" className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  id="Department"
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleChange}
                  className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                >
                  <option value="">Select Department</option>
                  {formData.departments.map(department => (
                    <option key={department._id} value={department._id}>{department.name}</option>
                  ))}
                </select>
              </div>

            <div className="col-span-6 sm:col-span-6">
            <label htmlFor="Avatar" className="block text-sm font-medium text-gray-700">Profile</label>
            <input type="file" className="file-input file-input-bordered w-full "  name="avatar" accept="image/*" onChange={handleFileChange} />

            </div>

            <div className="col-span-6">
              <label htmlFor="MarketingAccept" className="flex gap-4">
                <input
                  type="checkbox"
                  id="MarketingAccept"
                  name="marketing_accept"
                  className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                />

                <span className="text-sm text-gray-700">
                  I want to receive emails about events, updates and
                  AgapayReady announcements.
                </span>
              </label>
            </div>

            <div className="col-span-6">
              <p className="text-sm text-gray-500">
                By creating an account, you agree to our
                <a href="#" className="text-gray-700 underline">
                  {" "}
                  terms and conditions{" "}
                </a>
                and
                <a href="#" className="text-gray-700 underline">
                  {" "}
                  privacy policy
                </a>
                .
              </p>
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button className="inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500">
                Create an account
              </button>

              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?
                <Link to={"/login"} className="text-gray-700 underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  </section>
  );
};


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import Vite from "../../assets/services/vite.png";
// import axios from "axios";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     password_confirmation: "",
//     avatar: null,
//     marketing_accept: false,
//   });

//   const [passwordError, setPasswordError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, avatar: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.password_confirmation) {
//       setPasswordError("Passwords do not match");
//       return;
//     }

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("firstname", formData.firstname);
//       formDataToSend.append("lastname", formData.lastname);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("password", formData.password);
//       formDataToSend.append(
//         "password_confirmation",
//         formData.password_confirmation
//       );
//       formDataToSend.append("avatar", formData.avatar);

//       const response = await axios.post("/api/v1/register", formDataToSend);
//       if (response.status === 201) {
//         console.log("Registration successful");
//         navigate("/login");
//       } else {
//         console.error("Registration failed");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//     }
//   };
//   return (
    // <section className="bg-white">
    //   <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    //     <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
    //       {/* <img
    //         alt="Night"
    //         src="https://sa.kapamilya.com/absnews/abscbnnews/media/2022/news/11/10/earthquake-drill-students-epa-1.jpg"
    //         className="absolute inset-0 h-full w-full object-cover opacity-80"
    //       /> */}

    //       <div className="hidden lg:relative lg:block lg:p-12">
    //         <a className="block text-white" href="/">
    //           <span className="sr-only">Home</span>
    //           <img src={Vite} alt="Vite Logo" className="h-8" />
    //         </a>

    //         <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
    //           Welcome to AgapayReady
    //         </h2>

    //         <p className="mt-4 leading-relaxed text-white/90">
    //           Discover peace of mind in every crisis. AgapayReady keeps you
    //           informed and empowered during emergencies at TUP-Taguig. From
    //           real-time updates to intuitive guidance, stay safe with us.
    //         </p>
    //       </div>
    //     </section>

    //     <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
    //       <div className="max-w-xl lg:max-w-3xl">
    //         <div className="relative -mt-16 block lg:hidden">
    //           <a className="block text-white" href="/">
    //             <span className="sr-only">Home</span>
    //             <img src={Vite} alt="Vite Logo" className="h-8" />
    //           </a>

    //           <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
    //             Welcome to AgapayReady
    //           </h1>

    //           <p className="mt-4 leading-relaxed text-gray-500">
    //             Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    //             Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
    //           </p>
    //         </div>

    //         <form
    //           onSubmit={handleSubmit}
    //           className="mt-8 grid grid-cols-6 gap-6"
    //         >
    //           <div className="col-span-6 sm:col-span-3">
    //             <label
    //               htmlFor="FirstName"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               First Name
    //             </label>

    //             <input
    //               type="text"
    //               id="FirstName"
    //               name="firstname"
    //               value={formData.firstname}
    //               onChange={handleChange}
    //               className="placeholder"
    //             />
    //           </div>

    //           <div className="col-span-6 sm:col-span-3">
    //             <label
    //               htmlFor="LastName"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Last Name
    //             </label>

    //             <input
    //               type="text"
    //               id="LastName"
    //               name="lastname"
    //               value={formData.lastname}
    //               onChange={handleChange}
    //               className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
    //             />
    //           </div>

    //           <div className="col-span-6">
    //             <label
    //               htmlFor="Email"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               {" "}
    //               Email{" "}
    //             </label>

    //             <input
    //               type="email"
    //               id="Email"
    //               name="email"
    //               value={formData.email}
    //               onChange={handleChange}
    //               className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
    //             />
    //           </div>

    //           <div className="col-span-6 sm:col-span-3">
    //             <label
    //               htmlFor="Password"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               {" "}
    //               Password{" "}
    //             </label>

    //             <input
    //               type="password"
    //               id="Password"
    //               name="password"
    //               value={formData.password}
    //               onChange={handleChange}
    //               className="input mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
    //             />
    //           </div>

    //           <div className="col-span-6 sm:col-span-3">
    //             <label
    //               htmlFor="PasswordConfirmation"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Password Confirmation
    //             </label>

    //             <input
    //               type="password"
    //               id="PasswordConfirmation"
    //               name="password_confirmation"
    //               value={formData.password_confirmation}
    //               onChange={handleChange}
    //               className={`input mt-1 w-full rounded-md border ${
    //                 passwordError ? "border-red-600" : "border-gray-200"
    //               } bg-white text-sm text-gray-700 shadow-sm`}
    //             />
    //             {passwordError && (
    //               <p className="mt-2 text-sm text-red-600">{passwordError}</p>
    //             )}
    //           </div>
    //           <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} />

    //           <div className="col-span-6">
    //             <label htmlFor="MarketingAccept" className="flex gap-4">
    //               <input
    //                 type="checkbox"
    //                 id="MarketingAccept"
    //                 name="marketing_accept"
    //                 className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
    //               />

    //               <span className="text-sm text-gray-700">
    //                 I want to receive emails about events, updates and
    //                 AgapayReady announcements.
    //               </span>
    //             </label>
    //           </div>

    //           <div className="col-span-6">
    //             <p className="text-sm text-gray-500">
    //               By creating an account, you agree to our
    //               <a href="#" className="text-gray-700 underline">
    //                 {" "}
    //                 terms and conditions{" "}
    //               </a>
    //               and
    //               <a href="#" className="text-gray-700 underline">
    //                 {" "}
    //                 privacy policy
    //               </a>
    //               .
    //             </p>
    //           </div>

    //           <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
    //             <button className="inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500">
    //               Create an account
    //             </button>

    //             <p className="mt-4 text-sm text-gray-500 sm:mt-0">
    //               Already have an account?
    //               <Link to={"/login"} className="text-gray-700 underline">
    //                 Log in
    //               </Link>
    //             </p>
    //           </div>
    //         </form>
    //       </div>
    //     </main>
    //   </div>
    // </section>
//   );
// }
