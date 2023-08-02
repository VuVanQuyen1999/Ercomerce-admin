import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBCategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

const getBCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const createBCategory = async (body) => {
  const response = await axios.post(`${base_url}blogcategory/`, body, config);
  return response.data;
};

const updateBCategory = async (data) => {
  const response = await axios.put(
    `${base_url}blogcategory/${data.id}`,
    data.blogCategoryData,
    config
  );
  return response.data;
};

const deleteBCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

const bCategoryService = {
  getBCategories,
  createBCategory,
  getBCategory,
  updateBCategory,
  deleteBCategory,
};

export default bCategoryService;
