import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import {
  AiFillShopping,
  AiOutlineArrowRight,
  AiOutlineCodeSandbox,
  AiOutlineMoneyCollect,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";
import { backend_url } from "../../server";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

const {adminOrders, isLoading} = useSelector((state) => state.order);
const {sellers} = useSelector((state) => state.seller);

  useEffect(() => {
     dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

  const adminEarning = adminOrders && adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.10,0);

  const adminBalence = adminEarning?.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "shopName",
      headerName: "Shop Name",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  adminOrders && adminOrders.forEach((item) =>{

  row.push({
    id: item._id,
    itemsQty: item?.cart?.length,
    total:"US$ " + item.totalPrice,
    status: item.status,
    shopName: item?.cart[0]?.shop?.name,
  })});

  return (
   <>
   {
    isLoading ? (
      <Loader />
    ) : (
      <div className="w-full p-4">
      <h3 className=" text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Earning
            </h3>
          </div>
          <h5 className=" pt-2 pl-[36px] text-[22px] font-[500]">$ {adminBalence}</h5>
        </div>
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineCodeSandbox size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Sellers
            </h3>
          </div>
          <h5 className=" pt-2 pl-[36px] text-[22px] font-[500]">{sellers && sellers.length} </h5>
          <Link to="/admin-sellers">
            <h5 className=" pt-2 pl-2 text-[#e729e7] font-[600]">
              View Sellers
            </h5>
          </Link>
        </div>
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiFillShopping size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className=" pt-2 pl-[36px] text-[22px] font-[500]">{adminOrders && adminOrders.length}</h5>
          <Link to="/admin-orders">
            <h5 className=" pt-2 pl-2 text-[#e729e7] font-[600]">
              View Orders
            </h5>
          </Link>
        </div>
      </div>

      <br />
      <h3 className=" text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-white rounded shadow">
       
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={4}
            disableSelectionOnClick
            autoHeight
          />

      </div>
    </div>
    )
   }
   </>
  );
};

export default AdminDashboardMain;
