import React, { Component } from 'react';

import MenuItem from '../components/menuItem';
import MenuDivider from '../components/menuDivider';
import zeroFill from 'zero-fill';

export default class SideMenu extends Component {

  constructor(args) {
    super(args);

    //let currentLocation = window.location;
    //console.log(currentLocation.hash);

    this.state = {};
  }

  fetchNome(nome) {
    if (!nome) return "Carregando...";
    let arNome = nome.split(" ");
    return arNome[0] + " " + arNome[arNome.length - 1];
  }

  componentWillReceiveProps(props){
    
    if(props.eu){
      this.setState(props.eu);
    }
  }

  render() {
    return (     
      <aside className="main-sidebar">
        <section className="sidebar">
          
          <ul className="sidebar-menu">
            
            <MenuDivider label="SOCIAL PLAY"  className="header"/>
            <MenuItem icon="fa fa-instagram" title="XVideos" > 
              <MenuItem to='/xvideos' icon="fa fa-nada" title="Video" />  
            </MenuItem>
            <MenuItem icon="fa fa-tumblr" title="Tumblr" > 
              <MenuItem to='/tumblr' icon="fa fa-nada" title="Video" />   
              <MenuItem to='/tumblr' icon="fa fa-nada" title="Picture" />
            </MenuItem>
            <MenuItem icon="fa fa-instagram" title="Instagram" > 
              <MenuItem to='/instagram' icon="fa fa-nada" title="Video" />  
              <MenuItem to='/instagram' icon="fa fa-nada" title="Picture" /> 
            </MenuItem>
            <MenuItem to='/login' icon="fa fa-user" title="Login" /> 

            
          </ul>
        </section>
      </aside>
    );
  }
}


