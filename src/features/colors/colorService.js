import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getColor = async (id) => {
  const response = await axios.get(`${base_url}color/${id}`, config);
  return response.data;
};

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);
  return response.data;
};

const createColor = async (body) => {
  const response = await axios.post(`${base_url}color/`, body, config);
  return response.data;
};

const updateColor = async (data) => {
  const response = await axios.put(
    `${base_url}color/${data.id}`,
    data.colorData,
    config
  );
  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}color/${id}`, config);
  return response.data;
};

const colorService = {
  getColors,
  createColor,
  getColor,
  updateColor,
  deleteColor,
};

export default colorService;
