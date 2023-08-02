import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const customersState = useSelector((state) => state.customer.customers);

  const customerList = [];

  customersState.forEach((item, index) => {
    if (item.role === "admin") {
    }
    customerList.push({
      key: index + 1,
      name: item.firstname + " " + item.lastname,
      email: item.email,
      mobile: item.mobile,
    });
  });
  return (
    <>
      <h3 className="mb-4 title">Customer</h3>
      <div className="">
        <Table columns={columns} dataSource={customerList} />
      </div>
    </>
  );
};

export default Customer;
