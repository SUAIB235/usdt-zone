import React from "react";

const CatagoriesNav = ({ cetgories, selectCategory, setSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-5 py-6 sm:py-8 md:py-10 bg-[#00180d]">
      {cetgories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectCategory(cat)}
          className={`px-2 py-1 text-sm
            sm:px-3 sm:py-1.5 sm:text-base 
            md:px-4 md:py-2 md:text-lg rounded-full font-medium transition-all duration-300
           ${
             selectCategory === cat
               ? "bg-[#2dcd84] text-[#00180d]"
               : "border border-[#2dcd84] text-[#2dcd84] hover:bg-[#2dcd84] hover:text-[#00180d]"
           } 
            
            `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CatagoriesNav;
