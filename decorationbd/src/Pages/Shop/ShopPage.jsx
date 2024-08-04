import React, { useEffect, useState } from "react";
import "./ShopPage.scss";
import ShopStickyCategory from "../../components/ShopStickyCategory/ShopStickyCategory.jsx";
import { IoMdMenu } from "react-icons/io";
import { BiMenu, BiSolidGrid } from "react-icons/bi";
import { productData } from "../../Static/Data";
import ShopProduct from "../../components/ShopProduct/ShopProduct.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import ShopMenuLayoutProducts from "../../components/ShopMenuProducts/ShopMenuLayoutProducts.jsx";
import i4 from "../../Assets/img/ProductNotFound/img4.jpg";
import { RxCross2 } from "react-icons/rx";
import ShopSideBarCategory from "../../components/ShopSideBarCategory/ShopSideBarCategory.jsx";
// import Stock from "./Stock.jsx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import useFetch from "../../customHooks/useFetch.js";

const ShopPage = ({ open, setOpen }) => {
  const allProducts = useFetch("api/products/");
  console.log(allProducts);
  const [active, setActive] = useState(1);
  const [paginationByNumber, setPaginationByNumber] = useState(false);
  const [isClicked, setIsClicked] = useState(0);
  const [gridLayout, setGridLayout] = useState(false);
  const [searchParams] = useSearchParams();
  const catData = searchParams.get("category");
  const subCatData = searchParams.get("subCategory");
  // const stockStatus = searchParams.get("stock")
  // const stockStatus = searchParams.get("stock");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [stockStatus, setStockStatus] = useState(null);
  const [filterPrice, setFilterPrice] = useState(false);
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  const handleChange2 = (event) => {
    setStockStatus(event.target.value);
    // setSelected(null);
  };

  useEffect(() => {
    if (allProducts) {
      let filteredData = allProducts;

      if (selected !== null) {
        if (selected === '239') {
          filteredData = filteredData.filter((item) => item.discount_price >= 1000 && item.discount_price <= 2000);
        } else if (selected === '1039') {
          filteredData = filteredData.filter((item) => item.discount_price > 2000 && item.discount_price <= 3000);
        }
        //  else if (selected === '2039') {
        //   filteredData = filteredData.filter((item) => item.attributes.discount_price > 3000 && item.attributes.discount_price <= 4000);
        // }
        //  else if (selected === '3039') {
        //   filteredData = filteredData.filter((item) => item.attributes.discount_price > 4000 && item.attributes.discount_price <= 5000);
        // }
        //  else if (selected === '4039') {
        //   filteredData = filteredData.filter((item) => item.attributes.discount_price > 5000 && item.attributes.discount_price <= 6000);
        // }
        //  else if (selected === '5039') {
        //   filteredData = filteredData.filter((item) => item.attributes.discount_price > 6000 && item.attributes.discount_price <= 10000);
        // }
      }

      if (catData !== null) {
        filteredData = filteredData.filter((item) => item.Category.catname === catData);
      }

      if (subCatData !== null) {
        filteredData = filteredData.filter((item) => item.Sub_category.subcatname === subCatData);
      }

      // if (stockStatus !== null) {
      //   if (stockStatus === "In stock") {
      //     filteredData = filteredData.filter((item) => item.attributes.Stock === stockStatus);
      //   } else if (stockStatus === 'on sale') {
      //     filteredData = filteredData.filter((item) => item.stock === stockStatus);
      //   }
      // }

      setData(filteredData);
    }
  }, [catData, subCatData, selected, stockStatus, allProducts]);
  console.log(data);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage =
    paginationByNumber === true
      ? isClicked === 4
        ? 4
        : null || isClicked === 6
        ? 6
        : null || isClicked === 8
        ? 8
        : null || isClicked === 10
        ? 10
        : null
      : 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const recoeds = data?.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(data?.length / recordsPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  // Mobile side bar
  const [showSidebar, setShowSideBer] = useState(false);

  return (
    <div className="ShopSection 1350px:w-[94%] 1280px:w-[95%] w-[99%] mx-auto">
      <div className="StickCatAndOtherFilltering hidden 1280px:block">
        <div className="heading"> categories</div>
        <div className="categories">
          <ShopStickyCategory />
        </div>
      </div>
      <div className="productLayout">
        <div className="textAndProductGridLayoutIcons">
          <div className="txt hidden 1280px:inline">
            <span onClick={() => navigate("/")}>home</span> /{" "}
            <span
              onClick={() => {
                navigate("/shop");
                setSelected(null);
                setPaginationByNumber(false);
                window.location.reload(true);
              }}
            >
              shop
            </span>
          </div>
          <div
            className="1280px:hidden flex items-center gap-[5px]"
            onClick={() => setShowSideBer(true)}
          >
            <BiMenu className="768px:text-[25px] text-[20px] text-[orangered]" />
            <span className="768px:text-[18px] font-[500] text-[16px]">
              show sidebar
            </span>
          </div>
          <div className="gridIcons ">
            <span
              onClick={() => {
                setActive(2);
                setGridLayout(true);
              }}
            >
              <IoMdMenu color={active === 2 ? "#077bc4" : ""} />
            </span>
            <span
              onClick={() => {
                setActive(1);
                setGridLayout(false);
              }}
            >
              <BiSolidGrid color={active === 1 ? "#077bc4" : ""} />
            </span>
          </div>
          <div className="itemOfProduct">
            <span className="text">show : </span>
            <span
              onClick={() => {
                setPaginationByNumber(true);
                setIsClicked(4);
              }}
            >
              <span className={`${isClicked === 4 ? "text-[#077bc4]" : ""}`}>
                4
              </span>
            </span>
            /
            <span
              onClick={() => {
                setPaginationByNumber(true);
                setIsClicked(6);
              }}
            >
              <span className={`${isClicked === 6 ? "text-[#077bc4]" : ""}`}>
                6
              </span>
            </span>
            /
            <span
              onClick={() => {
                setPaginationByNumber(true);
                setIsClicked(8);
              }}
            >
              <span className={`${isClicked === 8 ? "text-[#077bc4]" : ""}`}>
                8
              </span>
            </span>
            /
            <span
              onClick={() => {
                setPaginationByNumber(true);
                setIsClicked(10);
              }}
            >
              <span className={`${isClicked === 10 ? "text-[#077bc4]" : ""}`}>
                10
              </span>
            </span>
          </div>
        </div>
        <div className="mt-[4px] mb-[6px] w-full p-1 hidden 1280px:inline-block bg-[#009ccc]">
          <div
            className="filterPrice 1280px:w-[140px] 1350px:w-[110px] relative
           py-1 px-1 border-[rgba(0,0,0,0.2)] cursor-pointer"
          >
            <div
              className="flex items-center justify-between text-white"
              onClick={() => setFilterPrice(!filterPrice)}
            >
              <h4 className="1350px:text-[13px] font-[600]">Filter by price</h4>
              <MdOutlineKeyboardArrowDown className="text-[15px]  text-white" />
            </div>
            {filterPrice && (
              <div className="absolute 1280px:w-[140px] 1350px:w-[130px] p-1 bg-[#fff] z-[999] text-center">
                <div className="cursor-pointer mb-[5px]">
                  <input
                    type="radio"
                    className="mr-[5px] h-[10px] w-[10px] 1350px:h-[9px] 1350px:w-[9px] cursor-pointer"
                    onChange={handleChange}
                    value="239"
                    id="price1"
                    name="priceRange"
                    onClick={() => setFilterPrice(false)}
                  />
                  <label
                    className="text-[14px] 1350px:text-[11px]
                    text-[#242424] font-semibold"
                  >
                    500 <strong>৳</strong> - 1000 <strong>৳</strong>
                  </label>
                </div>

                <div className="cursor-pointer  mb-[5px]">
                  <input
                    type="radio"
                    className="mr-[5px] h-[10px] w-[10px] 1350px:h-[9px] 1350px:w-[9px] cursor-pointer"
                    onChange={handleChange}
                    value="1039"
                    id="price2"
                    name="priceRange"
                    onClick={() => setFilterPrice(false)}
                  />
                  <label
                    className="text-[14px] 1350px:text-[11px]
                      text-[#242424] font-semibold"
                  >
                    1100 <strong>৳</strong> - 2000 <strong>৳</strong>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        {paginationByNumber ? (
          <div>
            {isClicked === 4 && (
              <div>
                {gridLayout ? (
                  <div className="flex flex-col justify-center items-center gap-[10px]">
                    {recoeds &&
                      recoeds.map((i, index) => (
                        <ShopMenuLayoutProducts
                          data={i}
                          key={index}
                          open={open}
                          setOpen={setOpen}
                        />
                      ))}
                  </div>
                ) : (
                  <div
                    className="productsPart grid grid-cols-2 gap-[5px]
        md:grid-cols-3 md:gap[15px] lg:grid-cols-4 xl:grid-cols-5 p-1"
                  >
                    {recoeds &&
                      recoeds.map((i, index) => (
                        <ShopProduct
                          data={i}
                          key={index}
                          open={open}
                          setOpen={setOpen}
                        />
                      ))}
                  </div>
                )}
              </div>
            )}
            {isClicked === 6 && (
              <div>
                {gridLayout ? (
                  <div className="flex flex-col justify-center items-center gap-[10px]">
                    {recoeds &&
                      recoeds.map((i, index) => (
                        <ShopMenuLayoutProducts
                          data={i}
                          key={index}
                          open={open}
                          setOpen={setOpen}
                        />
                      ))}
                  </div>
                ) : (
                  <div
                    className="productsPart grid grid-cols-2 gap-[5px]
        md:grid-cols-3 md:gap[15px] lg:grid-cols-4 xl:grid-cols-5 p-1"
                  >
                    {recoeds &&
                      recoeds.map((i, index) => (
                        <ShopProduct
                          data={i}
                          key={index}
                          open={open}
                          setOpen={setOpen}
                        />
                      ))}
                  </div>
                )}
              </div>
            )}
            {isClicked === 8 && (
              <div>
                {gridLayout ? (
                  <div className="flex flex-col justify-center items-center gap-[10px]">
                    {recoeds &&
                      recoeds.map((i, index) => (
                        <ShopMenuLayoutProducts
                          data={i}
                          key={index}
                          open={open}
                          setOpen={setOpen}
                        />
                      ))}
                  </div>
                ) : (
                  <div
                    className="productsPart grid grid-cols-2 gap-[5px]
        md:grid-cols-3 md:gap[15px] lg:grid-cols-4 xl:grid-cols-5 p-1"
                  >
                    {recoeds &&
                      recoeds.map((i, index) => (
                        <ShopProduct
                          data={i}
                          key={index}
                          open={open}
                          setOpen={setOpen}
                        />
                      ))}
                  </div>
                )}
              </div>
            )}
            {isClicked === 10 && (
              <div>
                {gridLayout ? (
                  <div className="flex flex-col justify-center items-center gap-[10px]">
                    {recoeds &&
                      recoeds.map((i, index) => (
                        <ShopMenuLayoutProducts
                          data={i}
                          key={index}
                          open={open}
                          setOpen={setOpen}
                        />
                      ))}
                  </div>
                ) : (
                  <div
                    className="productsPart grid grid-cols-2 gap-[5px]
        md:grid-cols-3 md:gap[15px] lg:grid-cols-4 xl:grid-cols-5 p-1"
                  >
                    {recoeds &&
                      recoeds.map((i, index) => (
                        <ShopProduct
                          data={i}
                          key={index}
                          open={open}
                          setOpen={setOpen}
                        />
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {gridLayout ? (
              <div className="flex flex-col justify-center items-center gap-[10px]">
                {recoeds &&
                  recoeds.map((i, index) => (
                    <ShopMenuLayoutProducts
                      data={i}
                      key={index}
                      open={open}
                      setOpen={setOpen}
                    />
                  ))}
              </div>
            ) : (
              <div
                className="productsPart grid grid-cols-2 gap-[5px]
        md:grid-cols-3 md:gap[15px] lg:grid-cols-4 xl:grid-cols-5 p-1"
              >
                {recoeds &&
                  recoeds.map((i, index) => (
                    <ShopProduct
                      data={i}
                      key={index}
                      open={open}
                      setOpen={setOpen}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
        {data?.length === 0 ? (
          <div className="w-full overflow-hidden mt-[50px] bg-black">
            <img
              src={i4}
              alt=""
              className="w-full h-[100%] object-cover  mt-[10px]"
            />
          </div>
        ) : null}
        <div className="mt-[50px] text-center mb-[50px] 768px:mb-0">
          <nav aria-label="Page navigation example ">
            <ul class="inline-flex -space-x-px text-sm">
              <li>
                <a
                  href="#"
                  class="flex items-center 1350px:text-[13px] font-[600] justify-center px-3 h-8 ms-0 leading-tight text-white bg-[#077bc4] border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={prePage}
                >
                  Previous
                </a>
              </li>
              {numbers &&
                numbers.map((n, i) => (
                  <li
                    key={i}
                    className={`${currentPage === n ? " scale-[1.1]" : ""} `}
                  >
                    <a
                      href="#"
                      class={`${
                        currentPage === n ? "text-[orangered]" : ""
                      }  1350px:text-[13px]
                flex items-center font-[600] justify-center px-3 h-8 leading-tight text-[#242424] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      onClick={() => changeCPage(n)}
                    >
                      {n}
                    </a>
                  </li>
                ))}

              <li>
                <a
                  href="#"
                  class="flex items-center 1350px:text-[13px] font-[600] justify-center px-3 h-8 leading-tight text-white bg-[#077bc4] border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={nextPage}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Shop SideBer */}

      {showSidebar && (
        <div className="fixed w-full h-full left-0 top-0 bg-[#0000005f] z-20">
          <div
            className={`${
              showSidebar ? "openSideBar" : ""
            } fixed w-[80%] 768px:w-[50%] 1024px:w-[50%] 1280px:w-[30%] bg-[#fff] 
              h-full top-0 left-0 z-60 overflow-y-scroll`}
          >
            <div className="flex justify-end pr-3">
              <RxCross2
                className="mt-[20px] text-[#242424] text-[30px]"
                onClick={() => setShowSideBer(false)}
              />
            </div>
            <div className="mt-[10px] w-[97%] mx-auto px-[2px] py-[5px] shadow-sm shadow-[gray] rounded-md">
              <h3
                className="capitalize font-[600] text-center
                  text-[21px] text-[#077bc4] p-4 bg-[#eee]"
              >
                filter by categories
              </h3>
              <div className="w-[96%] mx-auto">
                <ShopSideBarCategory setShowSideBer={setShowSideBer} />
              </div>
            </div>
            <div className="w-[96%] mt-[50px] mx-auto shadow-sm shadow-[gray] py-2 rounded-md">
              <h3
                className="font-semibold text-[orangered] text-center
                  text-[21px] capitalize  p-[10px]"
              >
                Filter by price
              </h3>
              <div className="pt-[5px] pb-[2px] w-[90%] text-center bg-white ml-[15px] mb-[8px] rounded-sm shadow shadow-[#077bc4]">
                <div className="cursor-pointer   mb-[5px] rounded-sm shadow shadow-[#077bc4]">
                  <input
                    type="radio"
                    className="mr-[5px] h-[12px] w-[12px] cursor-pointer"
                    onChange={handleChange}
                    value="239"
                    id="price1"
                    name="priceRange"
                    onClick={() => setShowSideBer(false)}
                  />
                  <label
                    className="text-[18px] 
                    text-[#242424] font-semibold"
                  >
                    500 <strong>৳</strong> - 1000 <strong>৳</strong>
                  </label>
                </div>
                <div className="cursor-pointer  mb-[5px]">
                  <input
                    type="radio"
                    className="mr-[5px] h-[12px] w-[12px] cursor-pointer"
                    onChange={handleChange}
                    value="1039"
                    id="price2"
                    name="priceRange"
                    onClick={() => setShowSideBer(false)}
                  />
                  <label
                    className="text-[18px] 
                    text-[#242424] font-semibold"
                  >
                    1100 <strong>৳</strong> - 2000 <strong>৳</strong>
                  </label>
                </div>
              </div>
            </div>

            {/* <div className="mt-[50px] mx-auto w-[96%] text-center rounded-sm shadow shadow-[#242424] mb-4">
              <h3 className="font-semibold text-[25px] capitalize p-[10px] bg-[#eee] rounded-md shadow shadow-[#077bc4]">
                stock status
              </h3>
              <div className="p-[5px] text-center">
                <div>
                  <input
                    type="checkbox"
                    className="h-[15px] w-[15px] mr-[5px] mb-[10px] mt-[10px] cursor-pointer"
                    onChange={(event) => {
                      handleChange2(event);
                      setShowSideBer(false);
                    }}
                    value="on sale"
                    id="slae1"
                    name="sale"
                  />
                  <label className="capitalize font-semibold text-[18px]">
                    on sale
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="h-[15px] w-[15px] mr-[5px] mb-[10px] cursor-pointer"
                    onChange={(event) => {
                      handleChange2(event);
                      setShowSideBer(false);
                    }}
                    value="in stock"
                    id="slae2"
                    name="sale"
                  />
                  <label className="capitalize font-semibold text-[18px]">
                    in stock
                  </label>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
