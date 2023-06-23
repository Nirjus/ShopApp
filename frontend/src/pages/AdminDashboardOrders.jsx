import React, { useEffect } from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";
import { DataGrid } from "@material-ui/data-grid";

const AdminDashboardOrders = () => {
    const dispatch = useDispatch();

const {adminOrders, isLoading} = useSelector((state) => state.order);

useEffect(() => {
     dispatch(getAllOrdersOfAdmin());
  }, []);
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
            field: "shopName",
            headerName: "Shop Name",
            type: "text",
            minWidth: 130,
            flex: 0.8,
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
            field: "createdAt",
            headerName: "createdAt",
            type: "number",
            minWidth: 130,
            flex: 0.8,
          },
    
      ];
    
      const row = [];
      adminOrders && adminOrders.forEach((item) =>{

      row.push({
        id: item._id,
        itemsQty: item?.cart?.length,
        total:"US$ " + item.totalPrice,
        status: item.status,
        createdAt:item?.createdAt.slice(0,10),
        shopName: item?.cart[0]?.shop?.name,
      })});
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>
         <div className="w-full min-h-[45vh] pt-5 flex justify-center rounded">
         <div className="w-[96%] flex justify-center bg-white shadow">

            <DataGrid
              rows={row}
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
            />
          </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
