import request from "request";

const BASE_URL = "/member";

export const getTruckOwner = (truckownerUid) => {
  return request({
    url: `${BASE_URL}/truck/${truckownerUid}`,
    method: "get",
  });
};

export const getTruckOwnerList = (page, size, carNumber, truckownerName, businessNo) => {
  return request({
    url: `${BASE_URL}/truck/ownerList`,
    method: "get",
    params: {
      page,
      size,
      carNumber,
      truckownerName,
      businessNo
    }
  });
}
