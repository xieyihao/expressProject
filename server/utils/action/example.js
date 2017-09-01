import {get,post,phpGet,phpPost} from "../baseFetch";
import {host} from "../hostConfig";

// export const requestMedicineList=(data,callback=(json)=>{},errorCallback=(json)=>{})=>(dispatch,getState)=>{
//   return get({url:`${host.cplus}cgi-bin/pharmacyinfo/queryitem`, data, callback, errorCallback}).then(json=>{
//     return dispatchWithReturn(dispatch,{type: RECEIVE_MEDICINE_LIST,json})
//   })
// };

export function requestMedicineList2(data,callback,errorCallback) {
  return get({url: `${host.cplus}cgi-bin/pharmacyinfo/listitem`, data, callback, errorCallback})
}
