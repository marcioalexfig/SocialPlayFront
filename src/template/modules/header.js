import React, {Component} from 'react';
import {Link} from 'react-router';

class Header extends Component{

  render(){
    return(
      <header className="main-header">
        <Link to="/" className="logo">
          <span className="logo-mini"><span className="logo-lg"><b>MA</b></span></span>
          <span className="logo-lg"><font size='3'><b>Social Play</b></font></span>
        </Link>

        <nav className="navbar navbar-static-top">
          <a href="" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Mudar Navegação</span>
          </a>

          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li>
                <a href="/#/sair"><i className="fa fa-times"></i></a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
