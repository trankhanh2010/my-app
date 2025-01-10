import api, { encodeParams } from '../api/api';
import config from "../../config";

// Dịch vụ để gọi API lấy danh sách 
const get = async (start, limit, orderBy, orderDirection, keyword) => {
  let param;
  const isDB = config.apiService.accountBookVView.typeGetApi === 'db';
  const isElastic = config.apiService.accountBookVView.typeGetApi === 'elastic';

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
            { wildcard: { accountBookCode: keyword } },
            { match: { accountBookCode: keyword } },
            { match_phrase: { accountBookCode: keyword } },
            { prefix: { accountBookCode: keyword } },
            { query_string: { accountBookCode: keyword } },

            { wildcard: { accountBookName: keyword } },
            { match: { accountBookName: keyword } },
            { match_phrase: { accountBookName: keyword } },
            { prefix: { accountBookName: keyword } },
            { query_string: { accountBookName: keyword } },

          ],
          ElasticFields: ["accountBookCode", "accountBookName"],
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
    const response = await api.get(`/api/v1/account-book-v-view?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};


const getAllSelect = async (keyword, filter) => {
  let param;
  const isDB = config.apiService.accountBookVView.typeGetApi === 'db';
  const isElastic = config.apiService.accountBookVView.typeGetApi === 'elastic';

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
        IsForDeposit: filter.isForDeposit,
        IsForRepay: filter.isForRepay,
        IsForBill: filter.isForBill,
        OrderBy: {
          accountBookName: "desc",
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
            { wildcard: { accountBookCode: keyword } },
            { match: { accountBookCode: keyword } },
            { match_phrase: { accountBookCode: keyword } },
            { prefix: { accountBookCode: keyword } },
            { query_string: { accountBookCode: keyword } },

            { wildcard: { accountBookName: keyword } },
            { match: { accountBookName: keyword } },
            { match_phrase: { accountBookName: keyword } },
            { prefix: { accountBookName: keyword } },
            { query_string: { accountBookName: keyword } },
          ],
          ElasticMustNot: [
            { term: { isActive: 0 } },
            { term: { isDelete: 1 } },
          ],
          ElasticFields: ["accountBookCode", "accountBookName"],
          OrderBy: {
            accountBookName: "desc",
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
            accountBookName: "desc",
          },
        },
      };
    }
  }

  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/account-book-v-view?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};
export default {
  get,
  getAllSelect,
};
