/**
 * Created by Administrator on 2017/9/4.
 */

import React,{Component} from "react";
import PropTypes from 'prop-types';
import DefaultLayout from "./layout";

import "../../client/page1/index.less";

class page1 extends Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        page one

        <button className="weui-btn weui-btn_disabled weui-btn_warn but-href" >跳转</button>
        {/*领取成功*/}

        {/*优惠券展示*/}

        {/*分享banner*/}

        <script src="/page1/bundle.js" />
      </DefaultLayout>
    )
  }
}

page1.propTypes = {

};

export default page1;
