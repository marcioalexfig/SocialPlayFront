import React, { Component } from 'react';
import {Breadcrumb, Crumb} from '../../template/components/breadcrumbs';
import Dialog from 'react-bootstrap-dialog';
import { connect } from 'react-redux';
import HoldOn from 'react-hold-on';

import FormUsuario from './_form';
import {newUsuario, done} from '../../actions/usuariosActions';

class NovoUsuario extends Component {
  constructor(params) {
    super(params);

    this.isSaving = false;
    this._submitData = this._submitData.bind(this);
  }

  _submitData(data) {    
    this.props.dispatch(newUsuario(data));
  }

  componentWillReceiveProps(props){

    console.log(props);

    if(props.fetching){
      HoldOn.open({ theme: 'sk-cube-grid', message: "Carregando..." });
    }

    if(props.nwstate === "FETCHED"){

      this.props.dispatch(done());

      HoldOn.close();

      this.refs.dialog.show({
        title: <span><i className="fa fa-exclamation-circle"></i> Sucesso!</span>,
        body: `O usuario '${props.usuario.nome}' foi adicionada com sucesso.`,
        actions: [
          Dialog.Action(
            "OK",
            (dialog) => {
              dialog.hide();
              window.location.assign("/#/usuarios");
            },
            'btn-primary btn-flat'
          )
        ],
        onHide: (dialog) => {
          dialog.hide();
          window.location.assign("/#/usuarios");
        },
        bsSize: 'medium'
      });

    }

    if(props.nwstate === "REJECTED"){

      this.refs.dialog.show({
        title: <span><i className="fa fa-exclamation-triangle"></i> Erro :(</span>,
        body: `Erro ao tentar editar o usuarios.`,
        actions: [
          Dialog.Action(
            "OK",
            (dialog) => {
              dialog.hide();
            },
            'btn-danger btn-flat'
          )
        ],
        onHide: (dialog) => {
          dialog.hide();
        },
        bsSize: 'medium'
      });

    }
  }

  render() {
    return (
      <div>
        <section className="content-header">
          <h1>Novo Usuário</h1>
          <Breadcrumb>
            <Crumb icon="fa fa-address-card" label="Usuarios" to="/usuarios" />
            <Crumb icon="fa fa-asterisk" label="Novo" active={true} />
          </Breadcrumb>
        </section>

        <FormUsuario onSubmit={this._submitData} />
        <Dialog ref="dialog" />
      </div>
    );
          
  }
}

export default connect((store)=>{
  return {
    usuario : store.usuarios.usuario,
    nwstate: store.usuarios.nwstate,
    error: store.usuarios.error
  }
})(NovoUsuario);
