import React from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const dataTable = [];
for (let i = 0; i < 46; i++) {
  dataTable.push({
    key: i,
    name: `Edward King ${i}`,
    product: `Product ${i}`,
    status: `Status ${i}`,
  });
}
const ProductList = () => {
  return (
    <>
      <h3 className="mb-4 title">Products</h3>
      <div className="">
        <Table columns={columns} dataSource={dataTable} />
      </div>
    </>
  );
};

export default ProductList;
