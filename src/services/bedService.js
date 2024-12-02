import axios from 'axios';
import CryptoJS from 'crypto-js';
import config from "../config";
const laravelAppApiUrl = config.laravelAppApiUrl;
// Dịch vụ để gọi API lấy danh sách giường bệnh
const getBeds = async (start, limit, orderBy, orderDirection, keyword) => {
  const token = '1a7ee9193800e2389325ead5365c7c5191a1b87615eff6e30d22306e1af99e61';
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
            {wildcard: {bedName: keyword}},
            {match: {bedName: keyword}},
            {match_phrase: {bedName: keyword}},
            {prefix: {bedName: keyword}},
            {query_string: {bedName: keyword}}
          ],
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
      `${laravelAppApiUrl}/api/v1/bed?param=${paramBase64}`,
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
  getBeds,
};
