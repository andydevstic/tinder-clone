import { message } from "antd";
import { MESSAGE_DURATION } from '../constants';

export const openSuccessMessage = content => {
  message.success(content, MESSAGE_DURATION);
}

export const openErrorMessage = content => {
  message.error(content, MESSAGE_DURATION);
}

export const openInfoMessage = content => {
  message.info(content, MESSAGE_DURATION);
}