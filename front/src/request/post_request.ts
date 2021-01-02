import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  NotificationType,
  publishNotification,
} from "../page_base/decorator/page_notification_decorator";

export interface PostRequestParams {
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

export async function postRequest<
  T extends { notification?: string },
  R extends AxiosResponse<T> = AxiosResponse<T>
>(params: PostRequestParams): Promise<R> {
  let notification: string;
  let permanent: boolean = false;
  let type: NotificationType = NotificationType.INFO;
  let response: R;
  try {
    const { url, data, config } = params;
    response = await axios.post<T, R>(url, data, {
      validateStatus: () => true,
      ...config,
    });
    type =
      response.status >= 200 && response.status < 300
        ? NotificationType.INFO
        : NotificationType.ERROR;
    notification = response.data?.notification;
  } catch (error) {
    console.error(error);
    permanent = true;
    notification = "Unexpected error, please refresh the page!";
    type = NotificationType.ERROR;
  }

  if (notification) {
    publishNotification({
      permanent,
      text: notification,
      type,
    });
  }

  return response;
}