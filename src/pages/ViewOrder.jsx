import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder, updateOrder } from "../features/auth/authSlice";
import { useLocation } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "title",
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "ACtion",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const orderId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, [orderId]);

  const orderState = useSelector((state) => state?.auth?.orderData?.order);

  const productList = [];

  orderState?.orderItems?.forEach((item) => {
    productList.push({
      key: orderId,
      title: item?.product?.title,
      image: (
        <div
          style={{
            width: "75px",
            height: "75px",
            backgroundImage: `url('${item?.product?.images[0]?.url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      ),
      brand: item?.product?.brand,
      price: "$ " + item?.product?.price,
      count: item?.quantity,
      color: item?.color?.title,
      action: (
        <>
          <select
            name=""
            id=""
            className="form-control form-select"
            onChange={(e) => {
              const orderData = { id: orderId, status: e.target.value };
              dispatch(updateOrder(orderData));
            }}
          >
            <option value="Ordered">Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Out For Delivered">Out For Delivered</option>
          </select>
        </>
      ),
    });
  });

  return (
    <>
      <h3 className="mb-4 title">View Order</h3>
      <div className="">
        <Table columns={columns} dataSource={productList} />
      </div>
    </>
  );
};
export default ViewOrder;
