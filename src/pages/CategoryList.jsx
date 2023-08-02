import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
} from "../features/pcategories/pcategorySlice";
import { toast } from "react-toastify";
import CustomModal from "../components/CustomModal";

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
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [catId, setCatId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setCatId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoryState = useSelector((state) => state.category.categories);

  const categoryList = [];

  categoryState.forEach((item, index) => {
    categoryList.push({
      key: index + 1,
      name: item.title,
      action: (
        <>
          <Link className="fs-3" to={`/admin/category/${item._id}`}>
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(item._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  });

  const deleteCategoryModal = (id) => {
    dispatch(deleteCategory(id));
    toast.success("Deleted Brand Successfully!");
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <>
      <h3 className="mb-4 title">Product Categories</h3>
      <div className="">
        <Table columns={columns} dataSource={categoryList} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this category?"
        performAction={() => {
          deleteCategoryModal(catId);
        }}
      />
    </>
  );
};

export default CategoryList;
