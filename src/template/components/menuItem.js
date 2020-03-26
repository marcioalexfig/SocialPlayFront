import React, { Component } from 'react';
import { Link} from 'react-router';

class MenuItem extends Component {

  isActive (to){
    return true;
  }

  render(){
    let _itemClasses = "";
    if (this.props.className) _itemClasses = this.props.className;
    if(this.isActive(this.props.to) && this.props.activeClassName && typeof(this.props.activeClassName) === "string"){
      if(_itemClasses !== "") _itemClasses += " ";
      _itemClasses += "active";
    }

    if(this.props.children){
      if(_itemClasses !== "") _itemClasses += " ";
      _itemClasses += "treeview";
      return (
        <li className={_itemClasses}>
          <Link to={this.props.to}>
            <i className={this.props.icon}></i>
            <span>{this.props.title}</span>
            <i className="fa fa-angle-left pull-right"></i>
          </Link>
          <ul className="treeview-menu">
            {this.props.children}
          </ul>
        </li>
      );
    } else {
      return (
        <li className={_itemClasses}>
          <Link to={this.props.to}><i className={this.props.icon}></i> <span>{this.props.title}</span></Link>
        </li>
      );
    }
  }
}

export default MenuItem;
