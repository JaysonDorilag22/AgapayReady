import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        {/* <span className="block mb-4 text-xs md:text-sm text-red-500 font-extrabold">
          Welcome to
        </span> */}
        <h3 className="text-4xl md:text-6xl font-semibold">
          Agapay<b className="text-red-500">Ready</b>
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
        Your trusted partner in emergency response. Be prepared, stay
              safe, and act fast with AgapayReady.
        </p>
        <button className="bg-red-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-red-600 active:scale-95">
          Register Now
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 8,
    src: "https://images.metronewscentral.net/MfOzEM2DfQ198.jpg",
  },
  {
    id: 9,
    src: "https://mb.com.ph/media/Food4_52a26ecbff/Food4_52a26ecbff.jpg",
  },
  {
    id: 10,
    src: "https://mb.com.ph/media/Food2_d784995f32/Food2_d784995f32.jpg",
  },
  {
    id: 11,
    src: "https://usgtuptaguig.files.wordpress.com/2016/05/13083270_851413388335599_7508443394257278316_n.jpg",
  },
  {
    id: 12,
    src: "https://scontent.fmnl33-6.fna.fbcdn.net/v/t39.30808-6/277745988_468522438404405_525251723295275089_n.png?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEplnc3-LduyyUjxgAFdM9FSFRXVpbFI4dIVFdWlsUjh03MRbyeGrppg3gnKU-BWr8hauYiIW9RSOWcFXdgd79B&_nc_ohc=ZxhQIwB4LmcAX-AwXFV&_nc_pt=1&_nc_ht=scontent.fmnl33-6.fna&oh=00_AfBsQsAQiJIZpCA3SF6yT0yu2HSLT17AL0hvYHjWPnJaxA&oe=65C74D5E",
  },
  {
    id: 13,
    src: "https://scontent.fmnl33-2.fna.fbcdn.net/v/t39.30808-6/290011019_5708643569168086_4500153366612772046_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeGIy9boOGKRWBBlw9PyciD4JY_Q1zijrOslj9DXOKOs66joeNKdDqDQGrBVg4S8rSXV8k5bDn6zyLwur-WukCn-&_nc_ohc=EPN5VNRXSOcAX89J5JZ&_nc_oc=AQlO-SAOGMKnXXqv683p2oz_eHguLdJnFxjo8tQ9Dd8Ta6Ad7kLLU8_sUrj14RF98kQ&_nc_pt=1&_nc_ht=scontent.fmnl33-2.fna&oh=00_AfCYXv_cVwBd7zXyP3pgslj3zcoOnKkdPXwXRx9cPJdfyg&oe=65C7D949",
  },
  {
    id: 14,
    src: "https://scontent.fmnl33-6.fna.fbcdn.net/v/t39.30808-6/289896432_5708643585834751_3478112417003114407_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeFm6f53x9c5gfNbsKYtoN60zsebYqz53tDOx5tirPne0AoyLc6tZv7x1-yTRXxu9rh_1CrRKEVOOpmU8Lyqeva5&_nc_ohc=b38q7gK3NcIAX-j6Hnm&_nc_pt=1&_nc_ht=scontent.fmnl33-6.fna&oh=00_AfBlsOQUfO_7fLJhG589KsxS0tBmBxR796wP9_NQFYuySg&oe=65C7FC1C",
  },
  {
    id: 15,
    src: "https://scontent.fmnl33-3.fna.fbcdn.net/v/t39.30808-6/289835465_5708643802501396_691843364399510319_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeGFbFYbDAWzJs9_YAtWqUQ6d6kq7XkHI853qSrteQcjzpcJT-WROnFVwFiW4JcreYjsjro2glLLNmQ0I3P6ILGR&_nc_ohc=ol7OGHyVb58AX9JEGvh&_nc_pt=1&_nc_ht=scontent.fmnl33-3.fna&oh=00_AfA8-7Ab_i8jTSpjCooOc4pMTzCQc0zJ2MElOGtEUqbaKA&oe=65C69D08",
  },
  {
    id: 16,
    src: "https://scontent.fmnl33-5.fna.fbcdn.net/v/t39.30808-6/290025533_5708643079168135_4454547939967444281_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeFjIGk4D7tw2tzFNWl0Ft1Ichi43Azjj-dyGLjcDOOP58yReEg7M_U01qauArGXQDojosW7VudcxUHlRGil6VCZ&_nc_ohc=nvuAgSQLMn4AX-SVlHj&_nc_pt=1&_nc_ht=scontent.fmnl33-5.fna&oh=00_AfCD-c2G5TapRHDOk2jztppuVgEyZUp_h4S3G4oripERKg&oe=65C69AE7",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;