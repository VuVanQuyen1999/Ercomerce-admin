import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getEnquiry,
  resetState,
  updateEnquiry,
} from "../features/enquiries/enquirySlice";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";

const ViewEnq = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const enqId = location.pathname.split("/")[3];

  const enqState = useSelector((state) => state.enquiry);
  const { dataEnquiry } = enqState;

  useEffect(() => {
    dispatch(getEnquiry(enqId));
  }, [enqId]);

  const goBack = () => {
    navigate(-1);
  };

  const updateEnq = (status) => {
    const data = { id: enqId, enqData: status };
    dispatch(updateEnquiry(data));
    toast.success("Update Enquiry Successfully!");
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getEnquiry(enqId));
    }, 100);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
          className="bg-transparent border-0 fs-5 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="d-flex gap-3 flex-column mt-5 bg-white p-4 rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{dataEnquiry?.name}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:${dataEnquiry?.mobile}`}>{dataEnquiry?.mobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`mailto:${dataEnquiry?.email}`}>{dataEnquiry?.email}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{dataEnquiry?.comment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{dataEnquiry?.status}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div className="">
            <select
              defaultValue={dataEnquiry?.status}
              className="form-control form-select"
              onChange={(e) => {
                updateEnq(e.target.value);
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEnq;
