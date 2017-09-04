
$(function(){

  $.ajax({
    data: {url:window.location.href},
    url: '/api/wx.gstzy.cn/activity/common/js_ticket',
    type: 'get',
    dataType: 'json',
    success: function (resp) {
      if (!resp.status) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: resp.data.appId, // 必填，公众号的唯一标识
          timestamp: resp.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: resp.data.nonceStr, // 必填，生成签名的随机串
          signature: resp.data.signature,// 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'chooseImage'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      }else{
        console.error('获取JS_TICKET失败,请检查')
      }
    }
  });

});
