// import axios from 'axios';

import { USER_PREFERENCE_TYPES } from "../../shared/constants";

const LIKED_STORAGE_PATH = 'storage.history.liked';
const PASSED_STORAGE_PATH = 'storage.history.passed';

export const fetchUserHistoryGateway = ({ preferenceType }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let storagePath;
        switch (preferenceType) {
          case USER_PREFERENCE_TYPES.LIKE:
            storagePath = LIKED_STORAGE_PATH;
            break;
          case USER_PREFERENCE_TYPES.PASS:
            storagePath = PASSED_STORAGE_PATH;
            break;
          default:
            throw new Error('User preference not exist');
        }
  
        const storageData = getHistoryLocalStorage(storagePath);

        resolve(storageData);
      } catch (error) {
        reject(error);
      }
    }, 200);
  });
}

export const userHistoryUpdateGateway = ({ preferenceType, user }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let storagePath;
        switch (preferenceType) {
          case USER_PREFERENCE_TYPES.LIKE:
            storagePath = LIKED_STORAGE_PATH;
            break;
          case USER_PREFERENCE_TYPES.PASS:
            storagePath = PASSED_STORAGE_PATH;
            break;
          default:
            throw new Error('User preference not exist');
        }
  
        const storageData = getHistoryLocalStorage(storagePath);
        storageData.push(user);
  
        setHistoryLocalStorage(storagePath, storageData);

        resolve();
      } catch (error) {
        reject(error);
      }
    }, 300);
  });
}

function setHistoryLocalStorage(path, data) {
  localStorage.setItem(path, JSON.stringify(data));
}

function getHistoryLocalStorage(path) {
  const storageDataInString = localStorage.getItem(path);
  return storageDataInString
    ? JSON.parse(storageDataInString)
    : [];
}