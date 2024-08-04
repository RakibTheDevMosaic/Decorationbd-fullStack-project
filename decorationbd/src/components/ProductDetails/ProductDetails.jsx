import React, { useEffect, useState } from "react";
import Styles from "../../Styles/Styles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiBuyCard } from "react-icons/gi";
import d1 from "../../Assets/img/DeliveryImg/delivery1.jpg";
import { useAddItemToCartMutation, useFetchCartItemsQuery } from "../../Redux/CartSlice/cartApi";
import { toast } from "react-toastify";
import { getToken } from "../../Redux/UserAndAuthServices/LocalStorageService";
// import d2 from "../../Assets/img/DeliveryImg/delivery2.jpeg";

const ProductDetails = ({
  data,
  count,
  decrementQuantity,
  incrementQuantity,
}) => {
  // console.log(data)
  // console.log(data)
  const { data: cartItems, error, isLoading, refetch} = useFetchCartItemsQuery();
  const [addItemToCart] = useAddItemToCartMutation();
  const initialImage = data?.product_imgs?.[0]?.images ? process.env.REACT_APP_IMG_URL + data?.product_imgs?.[0]?.images : '';
  const [select, setSelect] = useState(initialImage);
  useEffect(() => {
    // Update the selected image when data is loaded or changes
    if (data?.product_imgs?.[0]?.images) {
      setSelect(process.env.REACT_APP_IMG_URL + data.product_imgs[0].images);
    }
  }, [data]);
  console.log(select);
  const {access_token} = getToken()
  const handleAddToCart = async () => {
    try {
      if (access_token) {
        const response = await addItemToCart({ products_id: data.id, quantity: count });
        if (response.data) {
          const productName = response.data.data.products?.name;
          console.log('Product name:', productName);
      
          if (productName) {
            toast.success(`${productName.length>15?productName.slice(0,15)+' ':productName} added to cart successfully`);
          } else {
            console.error('Product name not found');
          }
          refetch()
        } else {
          console.error('Failed to add item to cart');
        }
      }
      else{
        toast.error('Login first... Please!!!')
      }

    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(data?.description || "", 'text/html');
  const plainTextDescription = parsedHtml.body.textContent || "";
  const [showDescription,setShowDescription] = useState(false);
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${Styles.section} w-[95%] 768px:w-[90%]  1024px:w-[80%] mt-[70px] 768px:mt-[100px] lg:mt-0`}>
          <div className="w-full py-5 1350px:py-2">
            <div className="block w-full 1024px:flex ">
              <div className="w-full 1024px:w-[650px] 1024px:mr-[30px]">
             
                  <img
                    src={select}
                    alt=""
                    className="768px:w-[500px] 768px:h-[500px] 1350px:w-[420px] 1350px:h-[300px]
                    300px:w-[400px] 300px:h-[400px] w-[300px] h-[300px] object-contain"
                  />
                
                <div className="w-[100%] flex overflow-hidden">
                  <div
                    className={`
                    cursor-pointer flex items-center gap-[5px] mt-[20px] mb-[20px]`}
                  >
                    {data?.product_imgs?.map((image, i) => (
                      <img
                        src={process.env.REACT_APP_IMG_URL+image.images}
                        alt=""
                        key={i}
                        onClick={() => setSelect(process.env.REACT_APP_IMG_URL+image.images)}
                        className="768px:w-[80px] 768px:h-[80px] 300px:w-[52px] 300px:h-[52px] w-[41px] h-[42px] 1350px:h-[55px]
                        1350px:w-[55px] object-cover border border-[rgba(0,0,0,0.2)] "
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full 1024px:w-[50%] 768px:pt-[90px] 1350px:pt-[50px] pt-[30px]">
                <h1 className={`md:${Styles.productTitle} text-[25px] 1350px:text-[16px]`}>{data?.name}</h1>
                <p className={`font-[400] text-[rgb(71,66,66)] pt-4 1350px:text-[12px]`}>
                {plainTextDescription?.length > 200 ? (
                          <>
                            {plainTextDescription?.slice(0, 200)}
                            {showDescription === true ? (plainTextDescription?.slice(200,-1)+".") : "...."}
                          </>
                        ) : (
                          plainTextDescription
                        )}{" "}
                  {plainTextDescription?.length >= 200 ? (
                    <>
                    <span className={`font-[500] 1350px:text-[12px] text-[#242424] cursor-pointer ${showDescription===true?"hidden":"inline"}`}
                  onClick={()=>setShowDescription(true)}>Read more...</span> 
                  
                  <span className={`font-[500] 1350px:text-[12px] text-[#242424] cursor-pointer ${showDescription===false?"hidden":"inline"}`}
                  onClick={()=>setShowDescription(false)}>hide description...</span>
                    </>
                  ) : null}      
                  
                </p>
                <div className="flex pt-4 items-center">
                  <h4 className={`${Styles.price} mr-[10px] 1350px:text-[14px]`}>
                    {data?.price}
                    <strong className="text-[20px] 1350px:text-[14px]">৳</strong>
                  </h4>
                  <h4 className={`${Styles.productDiscountPrice} 1350px:text-[14px]`}>
                    {data?.discount_price}
                    <strong className="text-[20px] 1350px:text-[14px]">৳</strong>
                  </h4>
                </div>
                <div className={`${Styles.normal_flex} mt-12 1350px:mt-5 pr-3`}>
                  <button
                    className="py-1
                             px-4 1350px:py-[1px] 1350px:px-[10px] text-center text-white bg-[#077bc4] text-[19px] 1350px:text-[15px]"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <span className="py-1 px-5 text-center 1350px:text-[12px]">{count}</span>
                  <button
                    className="py-1 
                             px-4 1350px:py-[1px] 1350px:px-2 text-center text-white bg-[#077bc4] text-[19px] 1350px:text-[15px]"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center mt-8 1350px:mt-5 gap-[30px]">
                  <div
                    className={`${Styles.button} bg-[#077bc4] 1350px:w-[130px]  1350px:h-[35px] 1350px:my-2 addCart rounded-md`}
                    onClick={handleAddToCart}>
                    <span className="text-white font-bold flex items-center 1350px:text-[11px]">
                      Add to cart <AiOutlineShoppingCart className="ml-2 1350px:text-[12px] 1350px:mb-[4px]" />
                    </span>
                  </div>
                  <div
                    className={`${Styles.button} bg-[orangered] 1350px:w-[130px]  1350px:h-[35px] 1350px:my-2 buy rounded-md`}
                  >
                    <span className="text-[#fff] font-bold flex items-center 1350px:text-[11px]">
                      Buy now <GiBuyCard className="ml-2 1350px:text-[12px] 1350px:mb-[4px]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} plainTextDescription={plainTextDescription}/>
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data,plainTextDescription }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 1350px:py-1 rounded 1350px:px-5 1350px:mt-[70px] 1350px:mb-[50px]">
      <div className="w-full flex justify-between border-b pt-10 1350px:pt-8 pb-2">
        <div className="relative">
          <h5
            className="text-[#242424] text-[18px] px-1 leading-5 font-semibold 
                    cursor-pointer 768px:text-[20px] 1350px:text-[14px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${Styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative hidden 768px:inline">
          <h5
            className="text-[#242424] text-[18px] px-1 leading-5 font-semibold 
                    cursor-pointer 768px:text-[20px] 1350px:text-[14px]"
            onClick={() => setActive(2)}
          >
            Additional Information
          </h5>
          {active === 2 ? (
            <div className={`${Styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#242424] text-[18px] px-1 leading-5 font-semibold 
                    cursor-pointer 768px:text-[20px] 1350px:text-[14px]"
            onClick={() => setActive(3)}
          >
            Shipping & Delivery
          </h5>
          {active === 3 ? (
            <div className={`${Styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p
            className="py-2
                    text-[18px] 1350px:text-[12px] leading-8 pb-10 whitespace-pre-line font-[400] text-[#242424]"
          >
            {plainTextDescription}
          </p>
         
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full min-h-[30vh] flex items-center justify-around">
          <h4 className="font-bold text-[20px] text-[#242424] 1350px:text-[12px]">Weigth</h4>
          <p className="font-semibold text-[#077bc4] text-[18px] 1350px:text-[12px]">2.5kg</p>
        </div>
      ) : null}
      {active === 3 ? (
        <div className="w-full flex flex-col 768px:flex-row items-center justify-between 768px:px-5 px-1">
          <div className="768px:w-[40%] w-[98%] overflow-hidden my-5 bg-[#f5f6fb]">
            <img src={d1} alt="" className="w-full object-cover" />
          </div>
          <div className="768px:w-[50%] w-[90%]">
            <h1
              className="font-bold
                    text-[#242424] 768px:text-[26px] 1350px:text-[20px] text-[22px] 768px:mt-[10px] mt-0 lg:mt-0"
            >
              Service Provider :
            </h1>
            <p className="768px:pt-3 lg:pt-5 pt-2 font-[500] 768px:text-[18px] 1350px:text-[13px] text-[17px] text-[#242424] capitalize">
              We usually use <span className="text-[#077bc4]">Pathao</span> ,{" "}
              <span>
                Red<span className="italic text-[red] text-[20px] 1350px:text-[15px]">X</span>
              </span>{" "}
              or Steadfast{" "}
              <span className="text-[orangered]">Courier Service</span> Provider
              to shipping our products.
            </p>
            <h3 className="pt-3 768px:text-[23px] 1350px:text-[18px] text-[22px] capitalize font-[700] text-[#242424]">
              shipping time :
            </h3>
            <p className="capitalize font-[500] 768px:text-[18px] 1350px:text-[12px] text-[17px] pt-3">
              <span className="italic text-[red]">7</span>{" "}
              <span className="text-[red]">days</span> minimum
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
