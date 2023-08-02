import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getColors } from "../features/colors/colorSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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
    title: "ACtion",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);

  const colorList = [];

  colorState.forEach((item, index) => {
    colorList.push({
      key: index + 1,
      name: (
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: `${item.title}`,
            borderRadius: "25px",
            width: "100px",
            color: "white",
            textAlign: "center",
            textShadow:
              " -1px -1px 0 #000,1px -1px 0 #000,-1px  1px 0 #000,1px  1px 0 #000",
          }}
        >
          {item.title}
        </div>
      ),
      action: (
        <>
          <Link className="fs-3" to={`/admin/color/${item._id}`}>
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

  const deleteColorModal = (id) => {
    dispatch(deleteColor(id));
    toast.success("Deleted Brand Successfully!");
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  return (
    <>
      <h3 className="mb-4 title">Colors</h3>
      <div className="">
        <Table columns={columns} dataSource={colorList} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this color?"
        performAction={() => {
          deleteColorModal(colorId);
        }}
      />
    </>
  );
};

export default ColorList;
