import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEnquiry,
  getEnquiries,
  updateEnquiry,
} from "../features/enquiries/enquirySlice";
import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setEnquiryId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const enquiryList = [];

  const updateEnq = (id, status) => {
    const data = { id: id, enqData: status };
    dispatch(updateEnquiry(data));
    toast.success("Update Enquiry Successfully!");
  };

  enquiryState.forEach((item, index) => {
    enquiryList.push({
      key: index + 1,
      name: item.name,
      email: item.email,
      mobile: item.mobile,
      comment: item.comment,
      status: (
        <select
          defaultValue={item?.status ? item.status : "Submitted"}
          className="form-control form-select"
          onChange={(e) => {
            updateEnq(item._id, e.target.value);
          }}
        >
          <option value="Submitted" className="">
            Submitted
          </option>
          <option value="Contacted" className="">
            Contacted
          </option>
          <option value="In Progress" className="">
            In Progress
          </option>
          <option value="Resolved" className="">
            Resolved
          </option>
        </select>
      ),
      action: (
        <>
          <Link className="fs-3" to={`/admin/enquiries/${item._id}`}>
            <AiOutlineEye />
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

  const deleteEnquiryModal = (id) => {
    dispatch(deleteEnquiry(id));
    toast.success("Deleted Enquiry Successfully!");
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  return (
    <>
      <h3 className="mb-4 title">Enquiries</h3>
      <div className="">
        <Table columns={columns} dataSource={enquiryList} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this enquiry?"
        performAction={() => {
          deleteEnquiryModal(enquiryId);
        }}
      />
    </>
  );
};

export default Enquiries;
