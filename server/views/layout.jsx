/**
 * Created by Administrator on 2017/8/30.
 */
import React,{Component} from "react";
import PropTypes from 'prop-types';

class DefaultLayout extends Component {
  render() {
    return (
      <html>
      <head>
        <title>{this.props.title}</title>
        <meta name="charset" content="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0" />
        <link rel='stylesheet' href='/css/style.css?20170831'/>
        <link rel='stylesheet' href='/css/weui.min.css?20170831'/>
        {/*<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>*/}
        <script src="//apps.bdimg.com/libs/zepto/1.1.4/zepto.min.js"></script>
        {/*<!-- 微信JS-SDK -->*/}
        <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script src="/init/bundle.js"></script>
      </head>
      <body>{this.props.children}</body>
    </html>
  );
  }
}

// module.exports = DefaultLayout;
export default DefaultLayout;
