import api, { encodeParams } from '../api/api';

// Dịch vụ để gọi API lấy danh sách 


const get = async (filter) => {
  if(!filter.departmentCode) return 
  let param;
  // Lấy dữ liệu từ DB
    param = {
      CommonParam: {
        Start: filter.start,
        Limit: filter.limit,
        Elastic: false,
      },
      ApiData: {
        IsActive: 1,
        IsDelete: 0,
        DepartmentCode: filter.departmentCode,
        IsInBed: filter.isInBed,
        BedRoomIds: filter.bedRoomIds,
        TreatmentTypeIds: filter.treatmentTypeIds,
        IsCoTreatDepartment: filter.isCoTreatDepartment,
        PatientClassifyIds: filter.patientClassifyIds,
        IsOut: filter.isOut,
        AddLoginname: filter.addLoginname,
        AddTimeFrom: filter.addTimeFrom,
        AddTimeTo: filter.addTimeTo,
        
        OrderBy: {
          ["modifyTime"]: "desc",  
        },
      },
    };
  // console.log(param)
  const paramBase64 = encodeParams(param);
  // console.log(paramBase64);

  try {
    const response = await api.get(`/api/v1/treatment-bed-room-list-v-view?param=${paramBase64}`);
    return response.data;  // Trả về dữ liệu nhận được từ API
  } catch (error) {
    throw error;  // Nếu có lỗi xảy ra, ném lỗi ra ngoài
  }
};


export default {
  get,
};
