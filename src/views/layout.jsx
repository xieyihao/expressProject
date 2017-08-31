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
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>
      </head>
      <body>{this.props.children}</body>
    </html>
  );
  }
}

// module.exports = DefaultLayout;
export default DefaultLayout;
