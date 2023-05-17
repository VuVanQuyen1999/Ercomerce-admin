import React from "react";
import { Table } from "antd";

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

const BlogCatList = () => {
    return (
        <>
            <h3 className="mb-4">Blog Categories </h3>
            <Table columns={columns} dataSource={dataTable} />
        </>
    );
};

export default BlogCatList;
