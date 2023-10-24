import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/style";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import img from "../../Assets/shopLogo_1.png"

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(false);
  const handelSearchChange = (e) => {
    const term = e.target.value;
    
    term === '' ? setSelect(false) : setSelect(true);
    setSearchTerm(term);
    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      const filterEvent = 
      allEvents &&
      allEvents.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      
      if(filterEvent){
        for(let i=0; i<filterEvent.length; i++){
               filteredProducts.push(filterEvent[i]);
        }
      }
      console.log(filteredProducts);
    setSearchData(filteredProducts); 
  };
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div className=" mt-4">
            <Link to="/">
            <img
                src={img}
                alt=""
                className=" w-full h-[200px] object-contain"
              />
            </Link>
          </div>
          {/* {search box } */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handelSearchChange}
              className=" h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {select && searchData && searchData.length !== 0 ? (
              <div className="absolute h-auto max-h-[90vh] overflow-y-scroll w-full border rounded border-gray-500 bg-slate-50 shadow z-[9] p-4 no-scroll">
                { searchData &&
                  searchData.map((i, index) => {
                  const eventId = allEvents.find((j) => j._id === i._id);
                    return (
                      <Link to={`/product/${i._id}/${eventId ? "?isEvent=true": ""}`} reloadDocument={true} onClick={() => setSelect(false)}>
                        <div className=" w-full flex bg-white border hover:bg-gray-200 active:bg-gray-300 border-b-gray-500 items-start py-3">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className=" w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`}>
            <Link to="/dashboard">
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321cB] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* {catagories} */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className=" absolute top-3 left-2" />
              <button className=" h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Catagories
              </button>
              <IoIosArrowDown
                size={20}
                className=" absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <Dropdown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navebar items */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 /83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 p-0 m-0 text-white font-Roboto text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 /83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 p-0 m-0 text-white font-Roboto text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className=" w-[40px] h-[40px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 /83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* {Cart Popup} */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* {wishList Popup} */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* {mobile header} */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden `}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltRight
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className=" h-[80px]  mt-[-39px]">
            <Link to="/">
            <img
                src={img}
                alt=""
                className=" cursor-pointer w-full h-[150px] object-cover"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 p-0 m-0 text-white font-Roboto text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* {Cart Popup} */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* {wishList Popup} */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* {header sidebar} */}
        {open && (
          <div className=" flex w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className=" fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className=" relative mr-[15px] "
              onClick={() => setOpenWishlist(true) || setOpen(false)} 
                    
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 p-0 m-0 text-white font-Roboto text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search here.."
                  className=" h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handelSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        // const d = i.name;

                        // const Product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${i._id}`}>
                            <div className=" w-full flex items-start py-3">
                              <img
                                src={`${i.images[0]?.url}`}
                                alt=""
                                className=" w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-2 !rounded-[4px]`}>
                <Link to="/dashboard">
                  <h1 className="text-[#fff] flex items-center">
                    {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />
              <div className=" flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className=" w-[60px] h-[60px] rounded-full border-[3px] border-[#1dc8f3]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className=" text-[18px] pr-[10px] text-[#410f0f]"
                    >
                      Login /
                    </Link>
                    <Link to="/sign-up" className=" text-[18px] text-[#410f0f]">
                      Sign-up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
