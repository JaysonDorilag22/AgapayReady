import React from "react";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";
import { MdTsunami, MdLocalFireDepartment,  } from "react-icons/md";
import { RiEarthquakeFill } from "react-icons/ri";
const guidelines = [
  {
    id: 1,
    title: 'Fire emergency',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Feb 11, 2024',
    datetime: '2020-03-16',
    category: { title: 'Others', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'User',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Flood',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Feb 10, 2024',
    datetime: '2020-03-16',
    category: { title: 'Information', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Staff',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Earthquake',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'january 16, 2024',
    datetime: '2020-03-16',
    category: { title: 'Response', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Student',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

const EvacuationGuidelines = () => {
  return (
    <div className="p-4">
      <p className="text-xl font-semibold mb-2">Evacuation Guidelines</p>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {guidelines.map((guideline) => (
          <Card
            key={guideline.id}
            title={guideline.title}
            subtitle={guideline.category.title}
            href={guideline.href}
            Icon={getIconForCategory(guideline.category.title)}
          />
        ))}
      </div>
    </div>
  );
};

const getIconForCategory = (categoryTitle) => {
  switch (categoryTitle) {
    case 'Others':
      return MdLocalFireDepartment;
    case 'Information':
      return MdTsunami;
    case 'Response':
      return RiEarthquakeFill;
    default:
      return FiCreditCard;
  }
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <a
      href={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-red-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-red-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </a>
  );
};

export default EvacuationGuidelines;


// import React from "react";

// const EvacuationGuidelines = ({ guidelines }) => {
//   return (
//     <div className="p-4">
//       <p className="text-xl font-semibold mb-2">Evacuation Guidelines</p>
//       <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
//         {guidelines.map((guideline) => (
//           <Card
//             key={guideline.id}
//             title={guideline.title}
//             subtitle={guideline.category.title}
//             icon={guideline.category.icon}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, subtitle, icon }) => {
//   // Dynamically import the icon based on the icon name
//   const Icon = getIconForCategory(icon);
  
//   return (
//     <div className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white">
//       <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

//       <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-red-400 group-hover:rotate-12 transition-transform duration-300" />
//       <Icon className="mb-2 text-2xl text-red-600 group-hover:text-white transition-colors relative z-10 duration-300" />
//       <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
//         {title}
//       </h3>
//       <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
//         {subtitle}
//       </p>
//     </div>
//   );
// };

// // Function to dynamically import icons based on icon name
// const getIconForCategory = async (iconName) => {
//   try {
//     // Dynamically import the icon component
//     const { default: IconComponent } = await import(`path/to/icons/${iconName}`);
//     return IconComponent;
//   } catch (error) {
//     // If icon import fails, handle the error
//     console.error(`Error importing icon: ${iconName}`, error);
//     // Return a default icon or handle the error as appropriate for your application
//     return DefaultIconComponent;
//   }
// };

// export default EvacuationGuidelines;
