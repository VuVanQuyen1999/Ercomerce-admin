import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyOrders,
  getOrders,
  getYearlyStats,
} from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyState = useSelector((state) => state?.auth?.yearlyData);
  const ordersState = useSelector((state) => state?.auth?.orders.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    dispatch(getMonthlyOrders());
    dispatch(getYearlyStats());
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    const dataTable = [];
    const monthlyDataLength = monthlyState?.length;
    for (let index = 0; index < monthlyDataLength; index++) {
      const element = monthlyState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }

    const orderLength = ordersState?.length;
    for (let i = 0; i < orderLength; i++) {
      dataTable.push({
        key: i,
        name:
          ordersState[i]?.user?.firstname +
          " " +
          ordersState[i]?.user?.lastname,
        product: ordersState[i]?.orderItems?.length,
        price: ordersState[i]?.totalPrice,
        dprice: ordersState[i]?.totalPriceAfterDiscount,
        status: ordersState[i]?.orderStatus,
      });
    }

    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);
    setOrderData(dataTable);
  }, [monthlyState, yearlyState, ordersState]);

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <>
      <h3 className="mb-5 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div className="">
            <p className="mb-0 desc">Total Income</p>{" "}
            <h4 className="mb-0 sub-title">
              ${yearlyState && yearlyState[0]?.amount}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0 desc">Income In Last Year From Today</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div className="">
            <p className="mb-0 desc">Total Sales</p>{" "}
            <h4 className="mb-0 sub-title">
              {yearlyState && yearlyState[0]?.count}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 12%
            </h6>
            <p className="mb-0 desc">Sales In Last Year From Today</p>
          </div>
        </div>
        {/* <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div className="">
            <p className="mb-0 desc">Total sells</p>{" "}
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 26%
            </h6>
            <p className="mb-0 desc">Compared To May 2023</p>
          </div>
        </div> */}
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div className="">
          <Column {...config} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Sales Statics</h3>
        <div className="">
          <Column {...config2} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <Table columns={columns} dataSource={orderData} />
      </div>
    </>
  );
};

export default Dashboard;
