/**
 * Created by Administrator on 2017/8/31.
 */
import React,{Component} from "react";
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import DefaultLayout from "./layout";
import Content from "./Content";

class Error extends Component {
  render(){
    const data = {
      items: [
        'document your code',
        'drop the kids off at the pool',
        '</script><script>alert(666)</script>'
      ],
      text: ''
    };
    const contentHtml = ReactDOMServer.renderToString(<Content {...data}/>);

    return (
      <DefaultLayout title={this.props.title}>

        <div id="content" dangerouslySetInnerHTML={{__html: contentHtml}}/>
      </DefaultLayout>
    )
  }
}

Error.propTypes = {
  title: PropTypes.string,
};

export default Error;
