/**
 * Created by Administrator on 2017/8/31.
 */

import React,{Component} from "react";
import PropTypes from 'prop-types';
import DefaultLayout from "./layout";

class Index extends Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <h1>{this.props.title}</h1>
        <p> Welcome to {this.props.title}</p>
      </DefaultLayout>
    )
  }
}

Index.propTypes = {
  title: PropTypes.string,
};

export default Index;
