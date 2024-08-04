import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Styles from "../../Styles/Styles";
import { FaAngleDown } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import "./MobileCategory.scss";
import useFetch from '../../customHooks/useFetch';

const MobileSideBarCategory = ({setShowSideBer,setOpenMobileSideBar}) => {
    // const categories = useFetch('api/categories/');
    // const [clickedCategory, setClickedCategory] = useState(useFetch('api/categories/'));
    const fetchedCategories = useFetch('api/categories/');
    const [categories, setCategories] = useState([]);
    const [showSubCat,setShowSubCat] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      if (fetchedCategories) {
        setCategories(fetchedCategories.map(category => ({ ...category, open: false })));
      }
    }, [fetchedCategories]);

    // const toggleCategory = (id) => {
    //   setClickedCategory(
    //     clickedCategory.map((item, i) => {
    //       if (i === id) {
    //         item.open = !item.open;
    //       } else {
    //         item.open = false;
    //       }
    //       return item;
    //     })
    //   )
    // };

    const toggleCategory = (id) => {
      setCategories(categories.map((item, index) => {
        if (index === id) {
          return { ...item, open: !item.open };
        } else {
          return { ...item, open: false };
        }
      }));
      setShowSubCat(categories[id]);
    };

    const handleSubmit = (category) => {
      const encodedCategory = encodeURIComponent(category.catname);
      navigate(`/shop?category=${encodedCategory}`);
    };
  
    const handleSubCategorySubmit = (category, subcategory) => {
      const encodedCategory = encodeURIComponent(category.catname);
      navigate(`/shop?category=${encodedCategory}&subCategory=${subcategory.subcatname}`);
    };
  
    return (
      <div className=' w-[100%] bg-[#ffff] h-[100%]' style={{
        border: "1px solid rgba(0,0,0,0.1)",
        borderTop: "none",
        borderRight:"none",
        borderLeft:"none"
      }}>
        {categories && categories.map((item,index) => (
          <div className={"catDataM" + `${item.open?" open":""} `} key={index}>
          <div  className={`${Styles.normal_flex} relative overflow-hidden  px-1`}
           >
            <h3 className='ml-[3px] mr-[5px] my-3
             cursor-pointer select-none text-[#242424] font-[400] text-[17px]'
             onClick={() =>{
              handleSubmit(item);
              setOpenMobileSideBar(false);
             }}>{item.catname}</h3>
            <div className='absolute right-[2px] h-[25px] w-[25px] border-[1px] border-[#242424]'
            title='Sub-categories'
            onClick={()=>{
              setShowSubCat(item);
              toggleCategory(index);
            }}>
              <FaAngleDown className={`arrowM text-[#242424] absolute right-[3px] top-[3px]`}/>
            </div>
          </div>
          <div>
              {showSubCat && showSubCat.id === item.id && (
                <div className={`subCatM text-[#242424]`}>
                  <div className='subCategoryItemsM'>
                    {item.sub_categories.map((subcat) => (
                      <div key={subcat.id} className='itemAndSvg flex items-center ml-[15px] gap-[15px] mb-[5px]'>
                        <FaArrowRight size={18} className='icon text-[#242424]'/>
                        <span  className='subCategory-itemM font-[400] text-[16px] text-[#242424]'
                           onClick={(e) => {
                            e.stopPropagation(); // Prevent parent onClick from triggering
                            handleSubCategorySubmit(item, subcat);
                            setOpenMobileSideBar(false);
                            // window.location.reload(true);
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
}

export default MobileSideBarCategory
