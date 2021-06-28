import { notification } from "antd";
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

const openNotification = (icon, title) => content => {
  notification.open({
    message: title,
    description: content,
    icon,
  });
}

export const openAlertNoti = openNotification(<CloseCircleTwoTone twoToneColor="#eb2f96" />, 'Error');
export const openSuccessNoti = openNotification(<CheckCircleTwoTone twoToneColor="#52c41a" />, 'Success');