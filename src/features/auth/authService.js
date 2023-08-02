import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-all-orders`, config);
  return response.data;
};

const getOrderByUserId = async (id) => {
  const response = await axios.post(
    `${base_url}user/get-order-by-user/${id}`,
    "",
    config
  );
  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    config
  );
  return response.data;
};

const getYearlyStats = async () => {
  const response = await axios.get(
    `${base_url}user/getYearlyTotalOrders`,
    config
  );
  return response.data;
};

const getSingleOrder = async (id) => {
  const response = await axios.get(`${base_url}user/get-order/${id}`, config);
  return response.data;
};

const updateOrder = async (orderData) => {
  const response = await axios.put(
    `${base_url}user/update-order/${orderData.id}`,
    { status: orderData.status },
    config
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrderByUserId,
  getMonthlyOrders,
  getYearlyStats,
  getSingleOrder,
  updateOrder,
};

export default authService;
