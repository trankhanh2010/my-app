import api, { encodeParams } from '../api/api';
import config from "../../config";

// Dịch vụ để gọi API lấy danh sách giường bệnh
const get = async (start, limit, orderBy, orderDirection, keyword) => {
  let param;
  const isDB = config.apiService.bed.typeGetApi === 'db';
  const isElastic = config.apiService.bed.typeGetApi === 'elastic';

  // Lấy dữ liệu từ DB
  if(isDB){
    param = {
      CommonParam: {
        Start: start,
        Limit: limit,
        Elastic: false,
      },
      ApiData: {
        KeyWord: keyword,
        OrderBy: {
          [orderBy]: orderDirection,  // Thay đổi tùy theo người dùng chọn
        },
      },
    };
  }

  // Lấy dữ liệu từ ElasticSearch
  if(isElastic){
    // Khi tìm theo từ khóa
    if(keyword !== null){
      param = {
        CommonParam: {
          Start: start,
          Limit: limit,
          Elastic: true,
        },
        ApiData: {
          ElasticSearchType: "bool",
          ElasticShould: [
            {wildcard: {bedCode: keyword}},
            {match: {bedCode: keyword}},
            {match_phrase: {bedCode: keyword}},
            {prefix: {bedCode: keyword}},
            {query_string: {bedCode: keyword}},

            {wildcard: {bedName: keyword}},
            {match: {bedName: keyword}},
            {match_phrase: {bedName: keyword}},
            {prefix: {bedName: keyword}},
            {query_string: {bedName: keyword}},

            {wildcard: {bedRoomCode: keyword}},
            {match: {bedRoomCode: keyword}},
            {match_phrase: {bedRoomCode: keyword}},
            {prefix: {bedRoomCode: keyword}},
            {query_string: {bedRoomCode: keyword}},

            {wildcard: {bedRoomName: keyword}},
            {match: {bedRoomName: keyword}},
            {match_phrase: {bedRoomName: keyword}},
            {prefix: {bedRoomName: keyword}},
            {query_string: {bedRoomName: keyword}},
          ],
          ElasticFields: ["bedCode", "bedName", "bedRoomCode", "bedRoomName"],
          OrderBy: {
            [orderBy]: orderDirection,  // Thay đổi tùy theo người dùng chọn
          },
        },
      };
    }

    // Khi không có từ khóa
    if(keyword === null){
      param = {
        CommonParam: {
          Start: start,
          Limit: limit,
          Elastic: true,
        },
        ApiData: {
          OrderBy: {
            [orderBy]: orderDirection,  // Thay đổi tùy theo người dùng chọn
          },
        },
      };
    }
  }

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/bed?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};
const getById = async (id) => {
  let param;
  // Lấy dữ liệu từ DB
    param = {
      CommonParam: {
        Elastic: false,
      },

    };

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/bed/${id}?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};
const create = async (bedData) => {
  try {
      const response = await api.post(`/api/v1/bed`, bedData, {
          headers: {
              "Content-Type": "application/json",
          },
      });
      return response.data; // Trả về dữ liệu từ API
  } catch (error) {
      console.error("Lỗi khi tạo giường:", error);
      throw error; // Ném lỗi để xử lý ở cấp cao hơn
  }
};

// Hàm cập nhật giường
const update = async (bedId, bedData) => {
  try {
      const response = await api.put(`/api/v1/bed/${bedId}`, bedData, {
          headers: {
              "Content-Type": "application/json",
          },
      });
      return response.data; // Trả về dữ liệu từ API
  } catch (error) {
      console.error("Lỗi khi cập nhật giường:", error);
      throw error; // Ném lỗi để xử lý ở cấp cao hơn
  }
};

const deleteRecord = async (id) => {
  const url = `/api/v1/bed/${id}`;
  return api.delete(url);
};

const checkUniqueCode = async (code, id = null) => {
  const url = id 
  ? `/api/v1/bed-check?code=${code}&id=${id}` 
  : `/api/v1/bed-check?code=${code}`;  
  return api.get(url);
};
export default {
  get,
  getById,
  create,
  update,
  deleteRecord,
  checkUniqueCode,
};
