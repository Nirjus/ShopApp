import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@material-ui/core";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/sellers";
import { Link } from "react-router-dom";
import { FaRegMehRollingEyes } from "react-icons/fa";

const AllSellers = () => {
  const { sellers } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });
    dispatch(getAllSellers());
  };

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "joindAt",
      headerName: "joindAt",
      type: "text",
      minWidth: 150,
      flex: 0.8,
    },

    {
        field: " ",
        flex: 1,
        minWidth: 130,
        headerName: "Preview Shop",
        type: "text",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
             <Link to={`/shop/preview/${params.id}`}>
                <Button>
                <FaRegMehRollingEyes size={20} />
                </Button>
             </Link>
            </>
          );
        },
      },
    {
      field: "  ",
      flex: 1,
      minWidth: 130,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <RiDeleteBinLine size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item?._id,
        name: item?.name,
        email: item?.email,
        joindAt: item.createdAt.slice(0, 10),
        address: item.address,
      });
    });
  return (
    <div className=" w-full flex justify-center pt-5">
      <div className=" w-[95%]">
        <h3 className=" text-[22px] font-Poppins pb-2">All Sellers</h3>
        <div className="w-full min-h-[45vh] bg-white rounded shadow">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-[#fff] rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className=" text-[25px] text-center py-5 font-Poppins text-[#000000a3]">
                Are you sure you want to delete this user?
              </h3>
              <div className="w-full flex justify-center items-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  {" "}
                  cancel{" "}
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  {" "}
                  confirm{" "}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
