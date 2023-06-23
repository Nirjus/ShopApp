import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { MdOutlineDeleteForever } from "react-icons/md";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));

  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    setPaymentMethod(false);

    await axios
      .put(
        `${server}/shop/update-payment-methods`,
        {
          withdrawMethod,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw method added successfully!");
        dispatch(loadSeller());
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankHolderName: "",
          bankAddress: "",
        });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const deleteHandler = async () => {
    await axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Withdraw method deleted successfullt!");
        dispatch(loadSeller());
      });
  };
  const error = () => {
    toast.error("You not have enough Balance to Withdraw");
  };

  const withdrawHandler = async () => {
     if(withdrawAmount < 50 || withdrawAmount > availableBalance){
      toast.error("You can't withdraw this much amount!");
     }else{
      const amount = withdrawAmount;
      await axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Withdraw money request is Successfull");
        });
     }
  };

  const availableBalance = seller?.availableBalance.toFixed(2);

  return (
    <div className=" w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded shadow flex items-center justify-center flex-col">
        <h5 className=" text-[20px] pb-4">
          Available Balence: ${availableBalance}{" "}
        </h5>
        <div
          className={`${styles.button} text-white !h-[42px] !rounded-[4px]`}
          onClick={() =>
            availableBalance < 50 || NaN ? error() : setOpen(true)
          }
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000005e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded  min-h-[40vh] p-3 ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            }`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className=" cursor-pointer"
              />
            </div>

            {paymentMethod ? (
              <div className="">
                <h3 className=" text-[22px] font-Poppins text-center font-[600]">
                  Add new Withdraw Method:
                </h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Bank name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      placeholder="Eneter your bank name"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className=" pt-2">
                    <label>
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      id=""
                      required
                      placeholder="Eneter your  Bank Country"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className=" pt-2">
                    <label>
                      Bank Swift code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      id=""
                      required
                      placeholder="Eneter your Swift code "
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className=" pt-2">
                    <label>
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name=""
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      id=""
                      required
                      placeholder="Eneter your bank account Number"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className=" pt-2">
                    <label>
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                      id=""
                      required
                      placeholder="Eneter your  Name"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className=" pt-2">
                    <label>
                      Bank Branch Address{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                      id=""
                      required
                      placeholder="Eneter your  Bank Address"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <button
                    type="submin"
                    className={`${styles.button} text-teal-200 mb-3`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className=" text-[22px] font-Poppins">
                  Available Withdraw Method:{" "}
                </h3>
                {seller && seller?.withdrawMethod ? (
                  <div className="">
                    <div className=" 800px:flex w-full justify-between items-center">
                      <div className="800px:w-[50%]">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>

                        <h5 className=" mt-1">
                          Bank Name: {seller?.withdrawMethod.bankName}
                        </h5>
                      </div>
                      <div className=" 800px:w-[50%]">
                        <MdOutlineDeleteForever
                          size={25}
                          className=" cursor-pointer"
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: {availableBalance}$</h4>
                    <br />
                    <div className="800px:flex w-full items-center">
                      <input
                        type="number"
                        name=""
                        id=""
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="amount..."
                        className=" 800px:w-[100px] w-full border 800px:mr-3 p-1 rounded"
                      />
                      <div
                        className={`${styles.button} !h-[41px] text-white`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <p className=" text-[18px] pt-2">
                      {" "}
                      No withdraw Method available
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`${styles.button} text-[18px] text-[#fff] mt-4`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add new
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
