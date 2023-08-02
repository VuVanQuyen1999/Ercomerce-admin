import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";

const columns = [
  {
    title: "OrderID",
    dataIndex: "key",
  },
  {
    title: "Customer Info ",
    dataIndex: "buyerInfo",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const formatDate = (data) => {
    const date = new Date(data);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  const backGroundColor = (status) => {
    switch (status) {
      case "Not Processed":
        return "#F24C3D";
      case "Cash on Delivery":
        return "#F29727";
      case "Processing":
        return "#0A6EBD";
      case "Ordered":
        return "#0A6EBD";
      case "Dispatched":
        return "#2CD3E1";
      case "Cancelled":
        return "#B70404";
      case "Delivered":
        return "#00FFCA";
      default:
        return "#FFEBEB";
    }
  };

  const orderState = useSelector((state) => state.auth.orders.orders);
  console.log(orderState);

  const orderList = [];

  orderState?.forEach((item, index) => {
    orderList.push({
      key: item?._id,
      buyerInfo: (
        <>
          <p>Name: {item?.user?.firstname + " " + item?.user?.lastname}</p>
          <p>Mobile: {item?.user?.mobile}</p>
          <p>Address: {item?.user?.address}</p>
        </>
      ),
      date: formatDate(item?.createdAt),
      amount: "$ " + item?.totalPriceAfterDiscount,
      status: (
        <>
          <div
            style={{
              padding: "8px 16px",
              backgroundColor: backGroundColor(item?.orderStatus),
              borderRadius: "25px",
              width: "120px",
              textAlign: "center",
            }}
          >
            {item?.orderStatus}
          </div>
        </>
      ),
      action: (
        <>
          <Link className="fs-3 ms-2" to={`/admin/orders/${item?._id}`}>
            <AiOutlineEye />
          </Link>
          <Link className="fs-3 ms-2" to="/">
            <BiEdit />
          </Link>
          <Link className=" fs-3 ms-2 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  });

  return (
    <>
      <h3 className="mb-4 title">Orders</h3>
      <div className="">
        <Table columns={columns} dataSource={orderList} />
      </div>
    </>
  );
};

export default Orders;
