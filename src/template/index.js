import React, {Component} from 'react';
import { connect } from 'react-redux';
import HoldOn from 'react-hold-on';
import _ from 'lodash';
import Menu from './modules/sideMenu';

class Index extends Component{
  
  constructor(params){
    super(params);

    this.state = {}

  }
  

  render(){
    
    return (
        <div className="wrapper" >
        <Menu />
        <div className="content-wrapper">
          {this.props.children }
        </div>
      </div>
    );
  }

}

export default connect((store) => {
  return {
    nwstate: store.usuarios.nwstate,
    logado: store.usuarios.usuario,
    error: store.usuarios.error
  }
})(Index);
