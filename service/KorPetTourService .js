import { korPetTourServiceInstance as axios } from "@/service/axios";
import qs from "qs";

export default {
  // 서비스분류코드조회
  getCategoryCodeList: (params) => {
    const requestOptions = {
      method: "GET",
      url: `/categoryCode?${qs.stringify(params)}`,
    };
    return axios(requestOptions);
  },

  // 지역기반 관광정보조회
  getAreaBasedList: (params) => {
    const requestOptions = {
      method: "GET",
      url: `/areaBasedList?${qs.stringify(params)}`,
    };
    return axios(requestOptions);
  },
  // 상세
  getTransactionById: (id) => {
    const requestOptions = {
      method: "GET",
      url: `/api/dues/v1/transaction/${id}`,
    };
    return axios(requestOptions);
  },
};
