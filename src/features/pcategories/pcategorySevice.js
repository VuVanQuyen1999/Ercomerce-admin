import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};

const getCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

const createPCategory = async (body) => {
  const response = await axios.post(`${base_url}category/`, body, config);
  return response.data;
};

const updateCategory = async (data) => {
  const response = await axios.put(
    `${base_url}category/${data.id}`,
    data.categoryData,
    config
  );
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};

const categoryService = {
  getCategories,
  createPCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
