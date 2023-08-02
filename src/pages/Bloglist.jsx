import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../features/blogs/blogSlice";
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
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Views",
    dataIndex: "views",
    sorter: (a, b) => a.views - b.views,
  },
  {
    title: "ACtion",
    dataIndex: "action",
  },
];

const Bloglist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const blogState = useSelector((state) => state.blog.blogs);

  const blogList = [];

  blogState.forEach((item, index) => {
    blogList.push({
      key: index + 1,
      name: item.title,
      category: item.category,
      views: item.numViews,
      action: (
        <>
          <Link className="fs-3" to={`/admin/blog/${item._id}`}>
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
    dispatch(deleteBlog(id));
    toast.success("Deleted Brand Successfully!");
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  return (
    <>
      <h3 className="mb-4 title">Blog List</h3>
      <Table columns={columns} dataSource={blogList} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this blog?"
        performAction={() => {
          deleteBlogModal(blogId);
        }}
      />
    </>
  );
};

export default Bloglist;
