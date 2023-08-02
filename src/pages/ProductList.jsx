import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productSlice";
import { Link } from "react-router-dom";
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
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);

  const productList = [];

  productState.forEach((item, index) => {
    productList.push({
      key: index + 1,
      name: item.title,
      brand: item.brand,
      category: item.category,
      price: "$ " + item.price,
      quantity: item.quantity,
      action: (
        <>
          <Link className="fs-3" to="/">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  });
  return (
    <>
      <h3 className="mb-4 title">Products</h3>
      <div className="">
        <Table columns={columns} dataSource={productList} />
      </div>
    </>
  );
};

export default ProductList;
