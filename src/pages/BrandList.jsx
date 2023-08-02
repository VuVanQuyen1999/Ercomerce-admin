import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../features/brands/brandSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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

const BrandList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);

  const brandList = [];

  brandState.forEach((item, index) => {
    brandList.push({
      key: index + 1,
      name: item.title,
      action: (
        <>
          <Link className="fs-3" to={`/admin/brand/${item._id}`}>
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

  const deleteBrandModal = (id) => {
    dispatch(deleteBrand(id));
    toast.success("Deleted Brand Successfully!");
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };

  return (
    <>
      <h3 className="mb-4 title">Brands</h3>
      <div className="">
        <Table columns={columns} dataSource={brandList} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this brand?"
        performAction={() => {
          deleteBrandModal(brandId);
        }}
      />
    </>
  );
};

export default BrandList;
