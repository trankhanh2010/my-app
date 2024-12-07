import axios from 'axios';
import CryptoJS from 'crypto-js';
import config from "../config";
const laravelAppApiUrl = config.laravelAppApiUrl;
// Dịch vụ để gọi API lấy danh sách giường bệnh
const token = '733057f0758409f998151419800540fcc9d50f2ba458e7b18234c49474937767';
const get = async (start, limit, orderBy, orderDirection, keyword) => {
  let param;
  const isDB = config.apiService.bedType.typeGetApi === 'db';
  const isElastic = config.apiService.bedType.typeGetApi === 'elastic';

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
            {wildcard: {bedTypeCode: keyword}},
            {match: {bedTypeCode: keyword}},
            {match_phrase: {bedTypeCode: keyword}},
            {prefix: {bedTypeCode: keyword}},
            {query_string: {bedTypeCode: keyword}},

            {wildcard: {bedTypeName: keyword}},
            {match: {bedTypeName: keyword}},
            {match_phrase: {bedTypeName: keyword}},
            {prefix: {bedTypeName: keyword}},
            {query_string: {bedTypeName: keyword}},

          ],
          ElasticFields: ["bedTypeCode", "bedTypeName"],
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

  const paramBase64 = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(param))
  );
  // console.log(paramBase64);

  try {
    const response = await axios.get(
      `${laravelAppApiUrl}/api/v1/bed-type?param=${paramBase64}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};

const deleteRecord = async (id) => {
  const url = `${laravelAppApiUrl}/api/v1/bed-type/${id}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllSelect = async (keyword) => {
  let param;
  const isDB = config.apiService.bedType.typeGetApi === 'db';
  const isElastic = config.apiService.bedType.typeGetApi === 'elastic';

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
          bedTypeName: "desc",
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
            { wildcard: { bedTypeCode: keyword } },
            { match: { bedTypeCode: keyword } },
            { match_phrase: { bedTypeCode: keyword } },
            { prefix: { bedTypeCode: keyword } },
            { query_string: { bedTypeCode: keyword } },

            { wildcard: { bedTypeName: keyword } },
            { match: { bedTypeName: keyword } },
            { match_phrase: { bedTypeName: keyword } },
            { prefix: { bedTypeName: keyword } },
            { query_string: { bedTypeName: keyword } },
          ],
          ElasticMustNot: [
            { term: { isActive: 0 } },
            { term: { isDelete: 1 } },
          ],
          ElasticFields: ["bedTypeCode", "bedTypeName"],
          OrderBy: {
            bedTypeName: "desc",
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
            bedTypeName: "desc",
          },
        },
      };
    }
  }

  const paramBase64 = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(param))
  );
  // console.log(paramBase64);

  try {
    const response = await axios.get(
      `${laravelAppApiUrl}/api/v1/bed-type?param=${paramBase64}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
