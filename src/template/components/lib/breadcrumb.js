import React, {Component} from 'react';
import {Link} from 'react-router';

class Breadcrumb extends Component{
  render(){
    return (
      <ol className="breadcrumb">
        <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
        {this.props.children}
      </ol>
    )
  }
}

export default Breadcrumb;
