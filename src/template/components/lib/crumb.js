import React, {Component} from 'react';
import {Link} from 'react-router';

class Crumb extends Component{
  render(){
    let _icon = this.props.icon?this.props.icon:"";
    if(this.props.active){
      return (
        <li className="active">
          <i className={_icon}></i> {this.props.label}
        </li>
      );
    } else {
      return (
        <li>
          <Link to={this.props.to}>
            <i className={_icon}></i> {this.props.label}
          </Link>
        </li>
      );
    }
  }
}

export default Crumb;
