import {request} from "@/network/request";

export function getUsersMultiData() {
  return request({
    url:'/api/users'
  })

}
