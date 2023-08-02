import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { deleteCoupon, getCoupons } from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Coupon Name",
    dataIndex: "name",
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setCouponId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const formatDate = (data) => {
    const date = new Date(data);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  const couponState = useSelector((state) => state.coupon.coupons);

  const couponList = [];

  couponState.forEach((item, index) => {
    couponList.push({
      key: index + 1,
      name: item.name,
      expiry: formatDate(item.expiry),
      discount: item.discount + "%",
      action: (
        <>
          <Link className="fs-3" to={`/admin/coupon/${item._id}`}>
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

  const deleteCouponModal = (id) => {
    dispatch(deleteCoupon(id));
    toast.success("Deleted Brand Successfully!");
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  return (
    <>
      <h3 className="mb-4 title">Coupons</h3>
      <div className="">
        <Table columns={columns} dataSource={couponList} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this brand?"
        performAction={() => {
          deleteCouponModal(couponId);
        }}
      />
    </>
  );
};

export default CouponList;
