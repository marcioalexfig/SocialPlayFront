import React, { Component } from 'react';
import { Row, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import 'icheck/skins/all.css'; // or single skin css
import { Checkbox } from 'react-icheck';
import dateFormat from 'dateformat';
import HoldOn from 'react-hold-on';
import { connect } from 'react-redux';

import {getSSO, done} from '../../actions/SSOActions';

class FormUsuario extends Component {
    constructor(params) {
        super(params);

        this.state = {
            ativo: true,
            nome: "",
            rid: ""
        }

        this.onChange = this.onChange.bind(this);
        this.findUser = this.findUser.bind(this);
        this.salvar = this.salvar.bind(this);
    }

    componentWillReceiveProps(props){
        //console.log(props);

        if(props.data){
            this.setState(props.data)
        }

        switch(props.nwstate){
            case "FETCHING":{
                HoldOn.open({ theme: 'sk-cube-grid', message: "Carregando..." });
                break;
            }

            case "FETCHED":{
                this.setState(props.SSO);
                this.props.dispatch(done());
                break;
            }

            case "REJECTED": {
                alert("Login não encontrado!")
                this.setState({
                    ativo: true,
                    nome: "",
                    rid: ""
                });
                this.props.dispatch(done());
                break;
            }

            case "DONE": {
                HoldOn.close();
                break;
            }

            default:
            break;
        }
    }

    onChange(el){
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    findUser(el){
        if(el.target.value)
            this.props.dispatch(getSSO(el.target.value))
    }

    salvar(){
        let mt = {...this.state};
        this.props.onSubmit(mt);
    }

    render() {
        return (
            <div>
                <section className="content">
                    <Row>
                        <Col md={9}>
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">Dados do Usuário</h3>
                                </div>

                                <div className="box-body">
                                    <Row>
                                    <Col md={3}>
                                            <ControlLabel>Login de Rede</ControlLabel>
                                            <FormControl
                                                placeholder=""
                                                value={this.state.rid}
                                                name="rid"
                                                onBlur={this.findUser}
                                                onChange={this.onChange} />
                                        </Col>
                                        <Col md={6}>
                                            <ControlLabel>Nome</ControlLabel>
                                            <FormControl
                                                disabled
                                                placeholder="Nome do Usuário"
                                                value={this.state.nome}/>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">Informações e Ações</h3>
                                </div>
                                <div className="box-body">
                                    <Row>
                                        <Col md={4}>
                                            <ControlLabel>Criado Por:</ControlLabel>
                                        </Col>
                                        <Col md={8}>
                                            {this.state.autor ? this.state.autor : "Não Cadastrado"}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <ControlLabel>Criado Em:</ControlLabel>
                                        </Col>
                                        <Col md={8}>
                                            {this.state.dataCriacao ? dateFormat(this.state.dataCriacao, 'dd/mm/yyyy HH:MM') : "Não Cadastrado"}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <ControlLabel>Modificado Em:</ControlLabel>
                                        </Col>
                                        <Col md={8}>
                                            {this.state.dataModificacao ? dateFormat(this.state.dataModificacao, 'dd/mm/yyyy HH:MM') : "Não Cadastrado"}
                                        </Col>
                                    </Row>
                                </div>
                                <div className="box-footer">
                                    <Button bsStyle="primary" className="pull-right btn-flat" onClick={this.salvar}>
                                        <i className="fa fa-save"></i> Salvar
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col mdOffset={9} md={3}>
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">Opções</h3>
                                </div>
                                <div className="box-body">
                                    <Checkbox
                                        checkboxClass="icheckbox_square-blue"
                                        checked={this.state.ativo}
                                        onChange={(ev, val) => {
                                            this.setState({ ativo: ev.target.checked });
                                        }}
                                        increaseArea="20%"
                                        label="&nbsp;&nbsp;Ativo" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
            </div>
        );
    }
}

export default connect((store)=>{
    return {
        SSO: store.SSO.SSO,
        nwstate: store.SSO.nwstate
    }
})(FormUsuario)