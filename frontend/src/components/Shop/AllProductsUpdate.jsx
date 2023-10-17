import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillFileAdd } from "react-icons/ai";
import { server } from "../../server";
import { getAllProducts } from "../../redux/actions/product";
const AllProductsUpdate = () => {
  const { allProducts } = useSelector((state) => state.products);

  const { id } = useParams();
  const product = allProducts?.find((i) => i._id === id);
  const dispatch = useDispatch();

  const [images, setImages] = useState();
  const [name, setName] = useState(product?.name);
  const [description, setDescription] = useState(product?.description);
  const [category, setCategory] = useState(product?.category);
  const [tags, setTags] = useState(product?.tags);
  const [originalPrice, setOriginalPrice] = useState(product?.originalPrice);
  const [discountPrice, setDiscountPrice] = useState(product?.discountPrice);
  const [stock, setStock] = useState(product?.stock);

  const [select, setSelect] = useState(false);
  const [index, setIndex] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/product/update-product/${id}`,
        {
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
          images,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(getAllProducts());
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const imageChangeHandler = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImages(Reader.result);
      }
    };
  };
  const handleDeleteImage = async (index) => {
    await axios
      .put(
        `${server}/product/delete-product-image/${id}`,{
            index
        },{withCredentials: true}
      )
      .then((res) => {
        dispatch(getAllProducts());
        setSelect(false);
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className=" w-full  h-auto">
      <h2 className=" text-center font-bold text-[20px]">Update Product</h2>
      <div className="">
        <form
          action=""
          onSubmit={submitHandler}
          className="w-full flex flex-row max-800px:flex-col justify-evenly"
        >
          <div className=" 800px:w-[50%] w-full">
            <div className=" flex flex-col p-2">
              <label htmlFor="name" className=" text-[16px] font-bold">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder={product?.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" w-full p-2 "
              />
            </div>
            <div className="w-full p-2">
              <label
                htmlFor="image"
                className=" text-[16px] font-bold w-fit border bg-white p-1 mb-1 rounded-[5px] active:bg-slate-400 flex cursor-pointer"
              >
                <AiFillFileAdd size={25} className=" mr-3" /> Add image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className=" hidden"
                onChange={imageChangeHandler}
              />
              <div
                className={` flex flex-row ${
                  product.images.length > 3 ? " flex-wrap" : ""
                }  gap-3 w-full`}
              >
                {product.images.map((i, index) => (
                  <div
                    className=" border shadow rounded border-[#868686]"
                    key={index}
                  >
                    <img
                      src={i.url}
                      alt=""
                      className=" w-[200px] h-[200px] rounded object-contain cursor-pointer"
                      onClick={() => setSelect(true) || setIndex(index)}
                    />
                  </div>
                ))}
                {images ? (
                  <div className=" border shadow rounded border-[#868686]">
                    <img
                      src={images}
                      alt=""
                      className=" w-[200px] h-[200px] rounded object-contain cursor-pointer"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className=" flex flex-col p-2">
              <label htmlFor="tags" className=" text-[16px] font-bold">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                placeholder={product?.tags}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className=" w-full p-2"
              />
            </div>
            <div className=" flex flex-col p-2">
              <label htmlFor="stock" className=" text-[16px] font-bold">
               Update Stock
              </label>
              <input
                type="text"
                id="stock"
                placeholder={product?.stock}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className=" w-full p-2"
              />
            </div>
          </div>
          <div className=" 800px:w-[50%] w-full">
            <div className=" flex flex-col p-2">
              <label htmlFor="description" className=" text-[16px] font-bold">
                Description
              </label>
              <textarea
                cols="30"
                rows="10"
                id="description"
                placeholder={product?.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className=" w-full p-2 outline-none"
              />
            </div>
            <div className=" flex flex-col p-2">
              <label className=" text-[16px] font-bold">Category</label>
              <select
                className=" w-full p-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Choose a category">Choose a category</option>
                {categoriesData &&
                  categoriesData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className=" flex flex-col p-2">
              <label htmlFor="originalprice" className=" text-[16px] font-bold">
                Original Price
              </label>
              <input
                type="number"
                id="originalprice"
                placeholder={product?.originalPrice}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className=" w-full p-2"
              />
            </div>
            <div className=" flex flex-col p-2">
              <label htmlFor="discountprice" className=" text-[16px] font-bold">
                Discount Price
              </label>
              <input
                type="number"
                id="discountprice"
                placeholder={product?.discountPrice}
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className=" w-full p-2"
              />
            </div>
            <div className=" p-2">
              <input
                type="submit"
                className="w-full p-2 text-white text-[17px] tracking-widest font-bold rounded-[10px] hover:bg-[#4f4f4f] bg-[#171717] active:bg-[#292929]"
              />
            </div>
          </div>
        </form>
      </div>
      {select ? (
        <div className="w-full h-screen fixed top-0 left-0 z-[999] flex justify-center items-center bg-[#00000048]">
          <div className=" w-[40%] h-[30%] bg-white rounded-[20px] relative">
            <h1>
              {" "}
              <RxCross1
                size={25}
                onClick={() => setSelect(false)}
                className=" absolute top-2  right-4 cursor-pointer"
              />{" "}
            </h1>
            <br />
            <br />
            <h1 className=" text-[20px] text-center break-words p-3">
              Are you want to <span className=" italic">delete</span> this {index+1}th picture?
            </h1>
            <br />

            <div className=" flex flex-row justify-evenly items-center">
              <button
                className=" text-white bg-black text-[17px] font-semibold p-3 w-[100px] rounded-[10px]"
                onClick={() => handleDeleteImage(index)}
              >
                Delete
              </button>
              <button
                className=" text-white bg-black text-[17px] font-semibold p-3 w-[100px] rounded-[10px]"
                onClick={() => setSelect(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AllProductsUpdate;
