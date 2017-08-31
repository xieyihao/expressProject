/**
 * Created by Administrator on 2017/8/30.
 */

import React,{Component} from "react";
import PropTypes from 'prop-types';
import DefaultLayout from "./layout";

class HelloMessage extends Component {
  render(){
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello react{this.props.name}</div>
      </DefaultLayout>
    )
  }
}

HelloMessage.propTypes = {
  title: PropTypes.string,
};

export default HelloMessage;
