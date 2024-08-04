import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Styles from "../../../Styles/Styles";

import { IoIosArrowForward } from 'react-icons/io';
import { FaArrowRight } from "react-icons/fa6";
// import { Link } from 'react-router-dom'
import "./DsubCat.scss";
import { ImArrowRight } from 'react-icons/im';
import useFetch from '../../../customHooks/useFetch';

const StickyCategory = () => {
  const categories = useFetch('api/categories/');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (category) => {
    const encodedCategory = encodeURIComponent(category.catname);
    navigate(`/shop?category=${encodedCategory}`);
  };

  const handleSubCategorySubmit = (category, subcategory) => {
    const encodedCategory = encodeURIComponent(category.catname);
    navigate(`/shop?category=${encodedCategory}&subCategory=${subcategory.subcatname}`);
  };

  return (
    <div className=' w-[350px] bg-[#ffff] h-auto' style={{
      border: "1px solid rgba(0,0,0,0.1)",
      borderTop: "none",
    }}>
      {categories?.map((item) => (
        <div key={item.id} className={`${Styles.normal_flex} relative hover:bg-gray-300 catData`}
          onClick={() => handleSubmit(item)}
          onMouseEnter={() => setHoveredCategory(item)}
          onMouseLeave={() => setHoveredCategory(null)}
          style={{
            fontSize: "14px",
            color:"#242424"
          }}>
           <div className="flex items-center gap-[5px]">
           <ImArrowRight  className='ml-[15px] text-[18px] 1350px:text-[16px]'/>
          <h3 className='m-3 cursor-pointer select-none h-full font-[500]'>{item.catname}</h3>
           </div>
           <div className='absolute right-[5px] arrow'>
            <IoIosArrowForward />
          </div>
          <div>
            {hoveredCategory && hoveredCategory.id === item.id && (
              <div className={`subCategory`}>
                <div className='subCategoryItems'>
                  {item.sub_categories.map((subcat) => (
                    <div key={subcat.id}>
                      <FaArrowRight />
                      <span  className='subCategory-item'
                         onClick={(e) => {
                          e.stopPropagation(); // Prevent parent onClick from triggering
                          handleSubCategorySubmit(item, subcat);
                          setHoveredCategory(null)
                        }}>{subcat.subcatname}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickyCategory;
