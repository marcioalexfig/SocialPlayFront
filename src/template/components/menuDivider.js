import React, {Component} from 'react';


class MenuDivider extends Component {
  render(){
    return (
      <li className={this.props.className}>
        {this.props.label}
      </li>
    );
  }
}

export default MenuDivider;
