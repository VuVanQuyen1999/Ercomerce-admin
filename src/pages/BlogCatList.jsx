import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import {
  deleteBCategory,
  getBCategories,
  getBCategory,
} from "../features/bcategory/bcategorySlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

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

const BlogCatList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogCatId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setBlogCatId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBCategories());
  }, []);

  const bCategoryState = useSelector((state) => state.bCategory.bCategories);

  const bCategoryList = [];

  bCategoryState.forEach((item, index) => {
    bCategoryList.push({
      key: index + 1,
      name: item.title,
      action: (
        <>
          <Link className="fs-3" to={`/admin/blog-category/${item._id}`}>
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

  const deleteBlogModal = (id) => {
    dispatch(deleteBCategory(id));
    toast.success("Deleted Brand Successfully!");
    setOpen(false);
    setTimeout(() => {
      dispatch(getBCategories());
    }, 100);
  };

  return (
    <>
      <h3 className="mb-4 title">Blog Categories </h3>
      <Table columns={columns} dataSource={bCategoryList} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this blog category?"
        performAction={() => {
          deleteBlogModal(blogCatId);
        }}
      />
    </>
  );
};

export default BlogCatList;
