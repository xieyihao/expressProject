import Cookie from "js-cookie";

const chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
const chnUnitChar = ["", "十", "百", "千"];
/**
 * @desc 链接数组对象里的某个属性,并返回一个数组，如 [{mis_doctor_id:123},{mis_doctor_id:3497}] 返回数组[123, 3497]
 * @param arr
 * @param prop
 * @returns {Array}
 */
export function getArrProp(arr, prop){
  let result=[];
  if(!arr) return result;
  for(let i=0; i<arr.length; i++){
    result.push(arr[i][prop])
  }
  return result;
}
//按位与解析医生标签，返回Boolean值 sign: 十进制; num:移位的位数
export function decodeSign(sign, num){
  let _sign = sign&Math.pow(2, num);
  return (_sign>0);
}
//按位或返回医生标签值，返回number
export function encodeSign(num){
  return 0|Math.pow(2, num);
}
//按位解析位和,返回array
export function decodeSignList(signSum,map) {
  let result = [];
  Object.keys(map).forEach((item)=>{
    if(decodeSign(signSum,item)){
      result.push(map[item])
    }
  });
  return result;
}
//价格转换 digit:精确到小数点后多少位,不传精确到元, 传则精确到相关位, 最大4位
export function convertPrice(price,digit=0){
  let tarPrice = parseInt(price);
  if (price < 0) {
    let _price = -price;
    //返回字符串，这样负数且后面的位数为0时，不会被舍去。
    return "-" + (convertPrice(_price, digit));
  } else {
    // 最多4位。解决直接toFixed会四舍五入问题。
    if (digit > 4) {
      digit = 4;
    }
    return ( Math.floor(tarPrice / Math.pow(10, 4 - digit)) / Math.pow(10, digit) ).toFixed(digit);
  }
}
export function convertStockNum(num, digit = 1) {
  let tarNum = parseInt(num);
  if (isNaN(tarNum)) {
    return 0; // num;
  } else {
    let remainder = tarNum % 10;
    if (remainder > 0) {
      return (tarNum / 10).toFixed(digit);
    } else {
      return tarNum / 10;
    }
  }
}
//性别转换
export function convertGender(genderCode){
  switch (genderCode){
    case 0:
    case '0':
      return '未填写';
      break;
    case 1:
    case '1':
      return '男';
      break;
    case 2:
    case '2':
      return '女';
      break;
    default:
      return '';
  }
}
/**
 * @description 时间转换,处理13位的时间戳(毫秒)
 * @param timeStamp 13位的时间戳(毫秒)
 * @param fmt 输出的时间格式 string 'yyyy-MM-dd hh:mm:ss'
 */
export function convertTimeToStr(timeStamp,fmt='yyyy-MM-dd hh:mm:ss'){
  let date, k, o, tmp;
  if(!timeStamp){return false;}
  if(typeof timeStamp == 'string'){
    timeStamp = parseInt(timeStamp)
  }
  //如果是10位数,则乘以1000转换为毫秒
  if(timeStamp.toString().length == 10 ){
    timeStamp = timeStamp*1000
  }
  date = new Date(timeStamp);
  o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S" : date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
/**
 * @description 时间转换,将时间字符串转为时间戳
 * @param dateStr 日期字符串
 * @param isSecond 为true则输出10位时间戳(秒),默认为13位(毫秒)
 * @returns {number}
 */
export function convertStrToStamp(dateStr,isSecond=false){
  if(!dateStr){ return '';}
  let date = new Date(dateStr);
  if(date.toString() == 'Invalid Date'){
    console.error('[convertStrToStamp]: 日期格式错误.');
  }else{
    return isSecond?Math.round(date.getTime()/1000):date.getTime();
  }
}
/**
 * @description 参数处理,处理一个对象,剔除其中值为空的项,返回有值的项.用在发送参数的时候处理参数对象.
 * @param object 输入的参数对象
 * @returns {*}
 */
export function handleParams(object){
  if(typeof object !== 'object') return false;
  let keys = Object.keys(object),res = {};
  if(keys.length){
    keys.forEach(item=>{
      switch(typeof object[item]){
        case 'number': //数字0保留
          if(object[item] || object[item] === 0){
            res[item] = object[item];
          }
          break;
        case 'boolean': //false保留
          res[item] = object[item];
          break;
        default: //目标参数value存在(不为null/undefined,或空字符串)
          if(object[item]){
            res[item] = object[item];
          }
      }
    })
  }
  return res;
}
/**
 * @description 本地存储包装器
 * @param type不传默认为 localStorage, 传 session 为 sessionStorage
 */
export let storage={
  checkWindow(){
    if(!window){
      console.warn("[Storage] === Storage can ONLY used in browser.");
      return false;
    }
    return true;
  },
  checkSupport(type){
    let winFlag = this.checkWindow();
    if(winFlag && window[type]){
      return true
    }else{
      console.warn(`[Storage] === ${type} Storage is NOT supported.`);
      return false
    }
  },
  checkType(type){
    if(type && type == 'session'){
      return 'sessionStorage'
    }else{
      return 'localStorage'
    }
  },
  setObj(obj,type){
    Object.keys(obj).forEach((item)=>{
      this.set(item,obj[item],type);
    })
  },
  set(key, value, type){
    let target = this.checkType(type);
    if(this.checkSupport(target)){
      return window[target].setItem(key, JSON.stringify(value))
    }
  },
  get(key,type){
    let target = this.checkType(type);
    if(this.checkSupport(target)){
      if (window[target][key] && window[target][key] !== 'undefined') {
        return JSON.parse(window[target][key])
      } else {
        return window[target][key]
      }
    }
  },
  removeArr(arr,type){
    if(Array.isArray(arr) && arr.length){
      arr.forEach((item)=>{
        this.remove(item,type)
      })
    }else{
      console.warn("[Storage] === Params must be an array.");
    }
  },
  remove(key,type){
    let target = this.checkType(type);
    if(this.checkSupport(target)){
      if( window[target][key] && window[target][key] !== 'undefined'){
        return window[target].removeItem(key)
      }
    }
  }
};

/**
 * @description js精准计算
 * */
export const calc = {
  /**
   * 函数，加法函数，用来得到精确的加法结果
   * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
   * 参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
   * 调用：Calc.Add(arg1,arg2,d)
   * 返回值：两数相加的结果
   */
  Add: function (arg1, arg2) {
    arg1 = arg1.toString(); arg2 = arg2.toString();
    let arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length === 2 ? arg1Arr[1] : "", d2 = arg2Arr.length === 2 ? arg2Arr[1] : "";
    let maxLen = Math.max(d1.length, d2.length);
    let m = Math.pow(10, maxLen);
    let result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
    let d = arguments[2];
    return (typeof d === "number" ) ? Number((result).toFixed(d)) : result;
  },
  /**
   * 函数：减法函数，用来得到精确的减法结果
   * 说明：函数返回较为精确的减法结果。
   * 参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数
   * 调用：Calc.Sub(arg1,arg2)
   * 返回值：两数相减的结果
   */
  Sub: function (arg1, arg2) {
    return Calc.Add(arg1, -Number(arg2), arguments[2]);
  },
  /**
   * 函数：乘法函数，用来得到精确的乘法结果
   * 说明：函数返回较为精确的乘法结果。
   * 参数：arg1：第一个乘数；arg2第二个乘数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
   * 调用：Calc.Mul(arg1,arg2)
   * 返回值：两数相乘的结果
   */
  Mul: function (arg1, arg2) {
    let r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
    m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
    resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
  },
  /**
   * 函数：除法函数，用来得到精确的除法结果
   * 说明：函数返回较为精确的除法结果。
   * 参数：arg1：除数；arg2被除数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
   * 调用：Calc.Div(arg1,arg2)
   * 返回值：arg1除于arg2的结果
   */
  Div: function (arg1, arg2) {
    let r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
    m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
    resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
  }
};
/**
  * @description 将对象转换为URL字符串,方便发送或存储
  * @param o 将要转为URL参数字符串的对象
  * @param key URL参数字符串的前缀
  * @param encode true/false 是否进行URL编码,默认为true
  * @return string URL参数字符串
 **/
export function objToUrlString(o, key, encode) {
  if (o == null) return '';
  var fn = function(obj, key, encode){
    var paramStr = '',
      t = typeof (obj);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(obj) : obj);
    } else {
      for (var i in obj) {
        var k = key==null?i:key + (obj instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += fn(obj[i], k, encode);
      }
    }
    return paramStr;
  };
  var result = fn(o, key, encode);
  return result.substr(1)
}
/**
 * @description url字符串转换成对象
 * @param string
 * @returns {{}}
 */
export function urlStringToObj(string) {
  'use strict';
  var params = {},
    q = string?string:window.location.search.substring(1),
    e = q.split('&'),
    l = e.length,
    f,
    i = 0;
  for (i; i < l; i += 1) {
    f = e[i].split('=');
    params[f[0]] = decodeURIComponent(f[1]);
  }
  return params;
}

/**
 * @description 判断是否登录,没有登录则自动登录
 */
export function isLogin(callBackUrl = "") {
  if (typeof window == "undefined") return;
  const {user_id} = getUser(); //获取用户id
  if (user_id) {
    return user_id;
  } else {
    goLogin(callBackUrl);
    return false;
  }
}

/**
 * @description 跳转去登录
 * @param tarUrl 跳转到登录并重定向的目标地址
 * @param clean 传true则会清理用户信息(调用cleanUser)后再去登录
 * @returns {*}
 */
export function goLogin(tarUrl = '',clean) {
  if (typeof window == "undefined") return;
  if(clean){
    cleanUser();
  }
  if(tarUrl==''){
    window.location.href =`/user/login`;
  }else{
    window.location.href =`/user/login?ref=${tarUrl}`;
  }

}

/**
 * @description 从cookie中取用户信息,返回用户对象
 * @returns {{user_id: (*|boolean), login_id: (*|boolean), open_id: (*|boolean), user_role: (*|boolean), cur_role: (*|boolean)}}
 */
export function getUser(){
  if(typeof document !== 'undefined' && window){
    return {
      user_id       : Cookie.get('user_id') || false,
      user_name     : Cookie.get('user_name') || false,
      login_account : Cookie.get('login_account') || false,
      clinic_id     : Cookie.get('clinic_id') || false,
      clinic_name   : Cookie.get('clinic_name') || false,
      pharmacy_id   : Cookie.get('pharmacy_id') || false,
      pharmacy_name : Cookie.get('pharmacy_name') || false,
      pharmacy_type : Cookie.get('pharmacy_type') || false,
      login_to      : Cookie.get('login_to') || false, // 1,普通药房,2.代煎中心	is_central_pharmacy	是否中央药房	number	选填. 1. 取中央药房
      check_id      : Cookie.get('check_id') || false,
      pharmacy_info : Cookie.get('pharmacy_info') ? JSON.parse(Cookie.get('pharmacy_info')) : [],

      system_uid    : Cookie.get('system_uid') || '', //CAS session标记
    };
  }else{
    return {}
  }
}
/**
 * @description 清理当前用户信息
 */
export function cleanUser() {
  let aUserInfo = ["user_id", "user_name", "login_account", "clinic_id", "clinic_name", "city_id","city_name",
    "pharmacy_id", "pharmacy_name", "pharmacy_type", "is_central_pharmacy", "pharmacy_state","pharmacy_info"];
  if(typeof document !== 'undefined' && window){
    let domainName = window.location.hostname;
    aUserInfo.forEach((item)=>{
      Cookie.remove(item, {domain: domainName});
      Cookie.remove(item, {domain: '.gstzy.cn'});
      Cookie.remove(item);
    });
    storage.removeArr(aUserInfo);
  }
}
/**
 * @desc 格式化一个对象为字符串如 name=pat&city_no=020&old=99;
 * @param data string
 **/
export function parseParams(data){
  if(data == null){return '';}
  let list = [];
  for(let item in data){
    list.push(`${item}=${data[item]}`)
  }
  return list.join("&");
}
/**
 * @description 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait --
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
export function throttle(func, wait, options){
  var context, args, result;
  var timeout = null;
  // 上次执行时间点
  var previous = 0;
  if (!options) options = {};
  // 延迟执行函数
  var later = function() {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) previous = now;
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
      //如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
/**
 * @description 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
export function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  var later = function() {
    // 据上一次触发时间间隔
    var last = Date.now() - timestamp;
    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function() {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

/**
 * @desc 门店项目选项装换
 * @num 小于15的数字
 * @return object 是否为理疗、公医、医保、直营店。
 */
export function hospitalOption(num=0) {
  let binaryArray = [],
    dividend = num,
    opt={
      "hasPhysicalTherapy" : false,//理疗
      "isFreeMedicalService" : false,//公医
      "hasMedicalInsurance" :false,//医保
      "idDirectSaleStore" : false//直营店
    };
  if(num > 15){
    return opt;
  }
  //转换成二进制
  for(var i=0; i<Math.ceil(num/2); i++){
    if(dividend!=1){
      binaryArray.unshift(dividend%2);
      dividend = parseInt(dividend/2);
    }else{
      binaryArray.unshift(1);
      break;
    }
  }
  //转换成二进制后补全4位
  switch (binaryArray.length) {
    case 1:
      binaryArray = [0,0,0].concat(binaryArray);
      break;
    case 2:
      binaryArray = [0,0].concat(binaryArray);
      break;
    case 3:
      binaryArray = [0].concat(binaryArray);
      break;
    default:
  }
  if(binaryArray[0]==1){
    opt["idDirectSaleStore"] = true;
  }
  if(binaryArray[1]==1){
    opt["hasMedicalInsurance"] = true;
  }
  if(binaryArray[2]==1){
    opt["isFreeMedicalService"] = true;
  }
  if(binaryArray[3]==1){
    opt["hasPhysicalTherapy"] = true;
  }
  return opt;
}

/**
 * @desc 适用于ant-design DatePicker日期选择组件，将Moment类型转换为时间戳。
 * @param Moment
 * @return {*}
 */
export function convertMoment2Stamp(Moment) {
  if (Array.isArray(Moment)) {
    let startDateStamp = "",
      endDateStamp = "";
    if (Moment.length > 0) {
      startDateStamp = parseInt(Moment[0].hour(0).minute(0).second(0).valueOf() / 1000);
      endDateStamp = parseInt(Moment[1].hour(23).minute(59).second(59).valueOf() / 1000);
    }
    return {
      startDateStamp: startDateStamp,
      endDateStamp: endDateStamp,
    }
  }else if(Object.isObject(Moment)){
    return Moment.valueOf();
  }else{
    return undefined;
  }
}
export function convertNumberToChinese(num) {
  let unitPos = 0,
    strIns = '',
    chnStr = '',
    needZero = false;
  if (num === 0) {
    return chnNumChar[0];
  }
  while (num > 0) {
    let section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }
  return chnStr;
}
function SectionToChinese(section) {
  let strIns = '',
    chnStr = '',
    unitPos = 0,
    zero = true;
  while (section > 0) {
    let v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}
/**
 * @desc 参数为时间戳（毫秒级）或字符串“2017-02-01”。
 * @param birth
 * @return string 返回“*岁”、“*个月”、“*天”。如果参数非法则返回“/”。
 */
export function getAgeByBirthday(birth) {
  // 时间戳毫秒级“1486450898000”和字符串“2017-02-08”都能通过new Date()生成Date类型。
  let d = new Date(birth);
  if (isNaN(d.getTime())) {
    console.warn("getAgeByBirthday()生日格式不正确", birth);
    return "/";
  }

  const birthStamp = Math.round(d.getTime() / 1000),
    nowStamp = Math.round(new Date().getTime() / 1000);
  let result = "",
    value = nowStamp - birthStamp;
  if (value < 0) {
    console.warn("getAgeByBirthday()参数出错，出生日期大于当前时间", birth);
    return "[出生日期大于当前时间]";
  } else {
    const SIGN_LIST = ["second", "minute", "hour", "date", "month", "year"];
    let month, year, sign = 0;
    while (true) {
      switch (SIGN_LIST[sign]) {
        case "second":
          if (value > 60) {
            value = Math.round(value / 60);
          } else {
            result = value + "秒";
          }
          sign++;
          break;
        case "minute":
          if (value > 60) {
            value = Math.round(value / 60);
          } else {
            result = value + "分";
          }
          sign++;
          break;
        case "hour":
          if (value > 24) {
            value = Math.round(value / 24);
          } else {
            result = value + "时";
          }
          sign++;
          break;
        case "date":
          if (value < 30) {
            result = value + "天";
          }
          sign++;
          break;
        case "month":
          month = Math.round(value / 30);
          if (month < 12) {
            result = month + "个月";
          }
          sign++;
          break;
        case "year":
          //小于3岁的显示：*岁*个月 2017年4月6日11:52:00。
          year = parseInt(value / 365);
          result = year + "岁";
          if (year < 3) {
            let monthNum = parseInt((value % 365) / 30);
            if (monthNum != 0) {
              result += monthNum + "个月";
            }
          }
          break;
        default:
          result = "/";
      }
      if (result) {
        break;
      }
    }
  }
  return result;
}
//输入一个数组和一个属性名，筛选出其中的某一项
export const filterArrVal=(arr,prop,val)=>{
  return arr.filter(item=>(item[prop]==val))
};


const Tools={
  cookie             : Cookie,
  storage            : storage,
  getArrProp         : getArrProp,
  decodeSign         : decodeSign,
  encodeSign         : encodeSign,
  decodeSignList     : decodeSignList,
  convertPrice       : convertPrice,
  convertStockNum    : convertStockNum,
  convertGender      : convertGender,
  convertTimeToStr   : convertTimeToStr,
  convertStrToStamp  : convertStrToStamp,
  convertMoment2Stamp: convertMoment2Stamp,
  handleParams       : handleParams,
  isLogin            : isLogin,
  goLogin            : goLogin,
  getUser            : getUser,
  objToUrlString     : objToUrlString,
  urlStringToObj     : urlStringToObj,
  hospitalOption     : hospitalOption,
  convertNumberToChinese: convertNumberToChinese,
  getAgeByBirthday   : getAgeByBirthday,
  filterArrVal       : filterArrVal,
};

export default Tools;
