/**
 * Created by Administrator on 2017/8/31.
 */
import React,{Component} from "react";
import PropTypes from 'prop-types';
import DefaultLayout from "./layout";

class NoFound extends Component {
  render(){
    return (
      <DefaultLayout title={this.props.title}>
        <h1>{this.props.message}</h1>
        <h2>{this.props.error.status}</h2>
      </DefaultLayout>
    )
  }
}

export default NoFound;
