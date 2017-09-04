/**
 * Created by Administrator on 2017/8/30.
 */

import React,{Component} from "react";
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import DefaultLayout from "./layout";
import Content from "./Content";

class HelloMessage extends Component {

  componentWillMount(){
    console.log("------componentWillMount ");
  }

  componentDidMount(){
    console.log("------componentDidMount ");
  }

  custom(){
    console.log("jjjjjj");
  }

  render(){
    const imgStyle = {width: "20px", marginRight: "5px", display: "block"};
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello react {this.props.name}</div>

        <button onClick={()=>{console.log("[111111111]")}}>test</button>

        <div className="weui-cells__title">带说明的列表项</div>
        <div className="weui-cells">
          <div className="weui-cell">
            <div className="weui-cell__bd">
              <p>标题文字</p>
            </div>
            <div className="weui-cell__ft">说明文字</div>
          </div>
        </div>
        <div className="weui-cells__title">带图标、说明的列表项</div>
        <div className="weui-cells">
          <div className="weui-cell">
            <div className="weui-cell__hd"><img src="" alt="" style={imgStyle}/></div>
            <div className="weui-cell__bd">
              <p>标题文字</p>
            </div>
            <div className="weui-cell__ft">说明文字</div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><img src="" alt="" style={imgStyle}/></div>
            <div className="weui-cell__bd">
              <p>标题文字</p>
            </div>
            <div className="weui-cell__ft">说明文字</div>
          </div>
        </div>

        <div className="weui-cells__title">带跳转的列表项</div>
        <div className="weui-cells">
          <a className="weui-cell weui-cell_access" href="javascript:;">
            <div className="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div className="weui-cell__ft">
            </div>
          </a>
          <a className="weui-cell weui-cell_access" href="javascript:;">
            <div className="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div className="weui-cell__ft">
            </div>
          </a>
        </div>

        <div className="weui-cells__title">带说明、跳转的列表项</div>
        <div className="weui-cells">
          <a className="weui-cell weui-cell_access" href="javascript:;">
            <div className="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div className="weui-cell__ft">说明文字</div>
          </a>
          <a className="weui-cell weui-cell_access" href="javascript:;">
            <div className="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div className="weui-cell__ft">说明文字</div>
          </a>

        </div>

        <div className="weui-cells__title">带图标、说明、跳转的列表项</div>
        <div className="weui-cells">

          <a className="weui-cell weui-cell_access" href="javascript:;">
            <div className="weui-cell__hd"><img src="" alt="" style={imgStyle}/></div>
            <div className="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div className="weui-cell__ft">说明文字</div>
          </a>
          <a className="weui-cell weui-cell_access" href="javascript:;">
            <div className="weui-cell__hd"><img src="" alt="" style={imgStyle}/></div>
            <div className="weui-cell__bd">
              <p>cell standard</p>
            </div>
            <div className="weui-cell__ft">说明文字</div>
          </a>
        </div>


        <a href="/test">前往test</a>
        <script src="/js/page1.js"> </script>
      </DefaultLayout>
    )
  }
}

export default HelloMessage;
