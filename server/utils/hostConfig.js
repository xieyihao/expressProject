/**
 * @desc 调用服务的地址配置：分为接口配置和静态资源（图片等资源的host）
 * @type {string}
 */

export const staticHost = "";
//运营管理后台
const _base = "//admin.360gst.com";
const _picHost = "//www.gstzy.cn";

let defaultHost = {
  dr_img   : `${_base}/data/upload/`,  //图片服务器
  picHost  : `${_picHost}/`, // 图片服务器地址(运营后台)
},
  __host = null,
  _appId = '';

switch (process.env.NODE_ENV) {
  case "local":  //本地开发过程使用
    __host = Object.assign({}, defaultHost, {
      cplus  : `${staticHost}/apic/cgi.gstyun.local/`,
      mHost  : `${staticHost}/api/admin.gstyun.local/`,  //运营管理后台
      cas    : `${staticHost}/api/cas.gstyun.local/`,    //cas系统
      smis   : `${staticHost}/api/smis.gstyun.local/`,    //医保信息系统
    });
    _appId = ''; //CAS APP ID
    break;
  case "dev":  //开发/测试服务器
    __host = Object.assign({}, defaultHost, {
      cplus  : `${staticHost}/apic/120.25.154.225/`,
      mHost  : `${staticHost}/api/admin-dev.gstzy.cn/`,  //运营管理后台
      cas    : `${staticHost}/api/cas-dev.gstzy.cn/`,    //cas系统
      smis   : `${staticHost}/api/smis-dev.gstzy.cn/`,    //医保信息系统
    });
    _appId = ''; //CAS APP ID
    break;
  case "test":  //内网测试服务器
    __host = Object.assign({}, defaultHost, {
      cplus  : `${staticHost}/apic/cgi.gstyun.local/`,
      mHost  : `${staticHost}/api/admin.gstyun.local/`,  //运营管理后台
      cas    : `${staticHost}/api/cas.gstyun.local/`,    //cas系统
      smis   : `${staticHost}/api/smis.gstyun.local/`,    //医保信息系统
    });
    _appId = ''; //CAS APP ID
    break;
  case "stg":
    __host = Object.assign({}, defaultHost, {
      cplus  : `${staticHost}/apic/120.76.216.68/`,      //后台预发布环境
      mHost  : `${staticHost}/api/admin-stg.gstzy.cn/`,  //运营管理后台
      cas    : `${staticHost}/api/cas-stg.gstzy.cn/`,    //cas系统
      smis   : `${staticHost}/api/smis-stg.gstzy.cn/`,    //医保信息系统
    });
    _appId = ''; //CAS APP ID
    break;
  case "production":
  default:    //生产环境
    __host = Object.assign({}, defaultHost, {
      cplus  : `${staticHost}/apic/cgi.gstyun.cn/`,
      // apiHost: `${staticHost}/api/api.gstyun.cn/`,
      // oldHost: `${staticHost}/api/chat.gstyun.cn/`,
      mHost  : `${staticHost}/api/admin.360gst.com/`,
      cas    : `${staticHost}/api/cas.360gst.com/`,    //cas系统
      smis   : `${staticHost}/api/smis.gstyun.cn/`,    //医保信息系统
    });
    _appId = ''; //CAS APP ID
}

export const host = __host;
// export const appId = _appId;
