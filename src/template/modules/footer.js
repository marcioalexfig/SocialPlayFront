import React, {Component} from 'react';

class Footer extends Component{
  render(){
    return (
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Versão</b> 0.0.1
        </div>
        <strong>{(new Date()).getFullYear()} <a href="http://www.localhost.com.br">Itaguaí Construções Navais</a>.</strong> Todos os direitos reservados.
      </footer>
    )
  }
}

export default Footer;
