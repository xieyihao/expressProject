// import {get,post,phpGet,phpPost} from "../../server/utils/baseFetch";
import {requestMedicineList2} from "../../server/utils/action/example";

const test = 1;

function testFunc() {
  console.info("【this is test func】");
}

function testFunc2() {
  console.info("【this is test func】");
}

function onClick() {
  const params = {
    page_size:10,
    page_no:1,
    clinic_id:1011,
  };
  requestMedicineList2(params);
}
