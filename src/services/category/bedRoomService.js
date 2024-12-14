import api, { encodeParams } from '../api/api';
import config from "../../config";

// Dịch vụ để gọi API lấy danh sách giường bệnh
const get = async (start, limit, orderBy, orderDirection, keyword) => {
  let param;
  const isDB = config.apiService.bedRoom.typeGetApi === 'db';
  const isElastic = config.apiService.bedRoom.typeGetApi === 'elastic';

  // Lấy dữ liệu từ DB
  if (isDB) {
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
  if (isElastic) {
    // Khi tìm theo từ khóa
    if (keyword !== null) {
      param = {
        CommonParam: {
          Start: start,
          Limit: limit,
          Elastic: true,
        },
        ApiData: {
          ElasticSearchType: "bool",
          ElasticShould: [
            { wildcard: { bedRoomCode: keyword } },
            { match: { bedRoomCode: keyword } },
            { match_phrase: { bedRoomCode: keyword } },
            { prefix: { bedRoomCode: keyword } },
            { query_string: { bedRoomCode: keyword } },

            { wildcard: { bedRoomName: keyword } },
            { match: { bedRoomName: keyword } },
            { match_phrase: { bedRoomName: keyword } },
            { prefix: { bedRoomName: keyword } },
            { query_string: { bedRoomName: keyword } },

          ],
          ElasticFields: ["bedRoomCode", "bedRoomName"],
          OrderBy: {
            [orderBy]: orderDirection,  // Thay đổi tùy theo người dùng chọn
          },
        },
      };
    }

    // Khi không có từ khóa
    if (keyword === null) {
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
    const response = await api.get(`/api/v1/bed-room?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

const deleteRecord = async (id) => {
  const url = `/api/v1/bed-room/${id}`;
  return api.delete(url);
};

const getAllSelect = async (keyword) => {
  let param;
  const isDB = config.apiService.bedRoom.typeGetApi === 'db';
  const isElastic = config.apiService.bedRoom.typeGetApi === 'elastic';

  // Lấy dữ liệu từ DB
  if (isDB) {
    param = {
      CommonParam: {
        GetAll: true,
        Elastic: false,
      },
      ApiData: {
        IsActive: 1,
        isDelete: 0,
        KeyWord: keyword,
        OrderBy: {
          bedRoomName: "desc",
        },
      },
    };
  }

  // Lấy dữ liệu từ ElasticSearch
  if (isElastic) {
    // Khi tìm theo từ khóa
    if (keyword !== null) {
      param = {
        CommonParam: {
          GetAll: true,
          Elastic: true,
        },
        ApiData: {
          ElasticSearchType: "bool",
          ElasticShould: [
            { wildcard: { bedRoomCode: keyword } },
            { match: { bedRoomCode: keyword } },
            { match_phrase: { bedRoomCode: keyword } },
            { prefix: { bedRoomCode: keyword } },
            { query_string: { bedRoomCode: keyword } },

            { wildcard: { bedRoomName: keyword } },
            { match: { bedRoomName: keyword } },
            { match_phrase: { bedRoomName: keyword } },
            { prefix: { bedRoomName: keyword } },
            { query_string: { bedRoomName: keyword } },
          ],
          ElasticMustNot: [
            { term: { isActive: 0 } },
            { term: { isDelete: 1 } },
          ],
          ElasticFields: ["bedRoomCode", "bedRoomName"],
          OrderBy: {
            bedRoomName: "desc",
          },
        },
      };
    }
    // Khi không có từ khóa
    if (keyword === null) {
      param = {
        CommonParam: {
          GetAll: true,
          Elastic: true,
        },
        ApiData: {
          ElasticSearchType: "bool",
          ElasticMustNot: [
            { term: { isActive: 0 } },
            { term: { isDelete: 1 } },
          ],
          OrderBy: {
            bedRoomName: "desc",
          },
        },
      };
    }
  }

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/bed-room?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};
export default {
  get,
  deleteRecord,
  getAllSelect,
};