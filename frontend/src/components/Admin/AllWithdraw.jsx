import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { toast } from "react-toastify";

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState([]);
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-all-withdraw-request`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "withdraw Id", minWidth: 150, flex: 1.7 },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "shopId",
      headerName: "shopId",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "status",
      headerName: "status",
      type: "text",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "createdAt",
      headerName: "withdraw request at",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: " ",
      headerName: "Update status",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <AiOutlineEdit
            size={20}
            className={`mr-5 cursor-pointer ${params.row.status !== "Processing" ? "hidden" : ""}`}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
  ];
  const handleSubmit = async () => {
    await axios
      .put(
        `${server}/withdraw/update-withdraw-request/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw request update successfully");
        setData(res.data.withdraws);
        setOpen(false);
      });
  };
  const row = [];

  data &&
    data.forEach((items) => {
      row.push({
        id: items._id,
        shopId: items.seller._id,
        name: items.seller.name,
        amount: "US$ " + items.amount,
        status: items.status,
        createdAt: items.createdAt.slice(0, 10),
      });
    });

  return (
    <div className=" w-full flex items-center pt-5 justify-center">
      <div className="w-[95%] bg-slate-50">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
      {open && (
        <div className="w-full fixed h-screen flex top-0 left-0 bg-[#0000003e] z-[9999] justify-center items-center">
          <div className="w-[50%] min-h-[40vh] bg-white shadow rounded p-4">
            <div className="flex justify-end w-full">
              <RxCross1 size={25} onClick={() => setOpen(false)} />
            </div>
            <h1 className=" text-[25px] text-center font-Poppins">
              {" "}
              Update Withdraw status
            </h1>
            <br />
            <select
              name=""
              id=""
              onChange={() => setWithdrawStatus(withdrawData.status)}
              className=" w-[200px] border rounded h-[35px] "
            >
              <option
                value={withdrawStatus}
              >
                {withdrawData.status}
              </option>
              <option
                value={withdrawStatus}
              >
                Succeed
              </option>
            </select>
            <br />
            <br />
            <br />
            <button
              type="submit"
              className={`${styles.button} block text-white !h-[42px] text-[18px] rounded-[5px]`}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWithdraw;
