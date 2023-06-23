import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { server } from "../../server";

const AllProductsAdmin = () => {
 
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${server}/product/admin-all-products`, {withCredentials:true}).then((res) => {
        setData(res.data.products);
    })
  }, []);


  const columns = [
    { field: "id", headerName: "product Id", minWidth: 150, flex: 1.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 130,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // const d = params.row.name;
        // const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
   
  ];

  const row = [];

  data &&
    data.forEach((items) => {
      row.push({
        id: items._id,
        name: items.name,
        price: "US$ " + items.discountPrice,
        Stock: items.stock,
        sold: items?.sold_out,
      });
    });

  return (
    <>
     
        <div className=" w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
    
    </>
  );
};

export default AllProductsAdmin;
