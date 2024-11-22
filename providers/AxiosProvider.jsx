"use client";
import { korPetTourServiceInstance } from "@/service/axios";
import { useEffect } from "react";

// Axios interceptors 관련 정의
export default function AxiosProvider({ children }) {
  useEffect(() => {
    // console.log("useAxiosInstance mount");

    korPetTourServiceInstance.interceptors.response.use(
      (response) => {
        // API 성공 처리
        return response;
      },
      (error) => {
        //  API 오류 처리 (토큰 만료)
        return Promise.reject(error);
      }
    );
  }, []);

  // function errorToast(error) {
  //   const config = error?.config;
  //   debug && console.log("config", config);
  //   if (!config?.useToast) {
  //     return;
  //   }

  //   const code = error.response?.data?.meta?.code;
  //   const userMessage = error.response?.data?.meta?.userMessage;
  //   const systemMessage = error.response?.data?.meta?.systemMessage;

  //   if (code > 200) {
  //     if (userMessage) {
  //       noti.toastNoti(userMessage);
  //     } else if (systemMessage) {
  //       noti.toastNoti(systemMessage);
  //     }
  //   } else if (code > 399 && code < 500) {
  //     if (userMessage) {
  //       noti.toastNoti(userMessage);
  //     } else if (systemMessage) {
  //       noti.toastNoti(systemMessage);
  //     }
  //   } else {
  //     if (userMessage) {
  //       noti.toastNoti(userMessage);
  //     } else if (systemMessage) {
  //       noti.toastNoti(systemMessage);
  //     }
  //   }
  // }

  // function successToast(response) {
  //   const config = response.config;
  //   if (!config.useToast) {
  //     return;
  //   }

  //   const code = response?.data?.meta?.code;
  //   const userMessage = response?.data?.meta?.userMessage;
  //   const systemMessage = response?.data?.meta?.systemMessage;

  //   if (code > 200) {
  //     if (userMessage) {
  //       noti.toastNoti(userMessage);
  //     } else if (systemMessage) {
  //       noti.toastNoti(systemMessage);
  //     }
  //   } else if (code > 399 && code < 500) {
  //     if (userMessage) {
  //       noti.toastNoti(userMessage);
  //     } else if (systemMessage) {
  //       noti.toastNoti(systemMessage);
  //     }
  //   } else {
  //     if (userMessage) {
  //       noti.toastNoti(userMessage);
  //     } else if (systemMessage) {
  //       noti.toastNoti(systemMessage);
  //     }
  //   }
  // }

  return <>{children}</>;
}
