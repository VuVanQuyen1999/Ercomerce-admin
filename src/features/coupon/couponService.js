import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);
  return response.data;
};

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`, config);
  return response.data;
};

const createCoupon = async (body) => {
  const response = await axios.post(`${base_url}coupon/`, body, config);
  return response.data;
};

const updateCoupon = async (data) => {
  const response = await axios.put(
    `${base_url}coupon/${data.id}`,
    data.couponData,
    config
  );
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config);
  return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
