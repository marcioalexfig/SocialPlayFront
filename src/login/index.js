import React, { Component } from 'react';
import { FormControl, FormGroup, InputGroup, Col, Row, Button } from 'react-bootstrap';
import { login, done } from '../actions/SSOActions';
import { connect } from 'react-redux';

class Login extends Component {

    constructor() {
        super();

        this.state = {
            login: "alex",
            password: "zzzz",
            perfil: 'mafr.tumblr.com',
            social:'tumblr'
        };

        this.mensagemErro = "";
        this.btnDisabled = false;

        this.doLogin = this.doLogin.bind(this);
        this.onChange = this.onChange.bind(this);

        this.passwordInput = {};
    }

    onChange(el) {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    async doLogin() {

        let label = this.refs.lblEntrar;
        let spinner = this.refs.icSpinner;

        this.mensagemErro = "";
        this.btnDisabled = true;
        this.forceUpdate();
        
        label.style.display = "none";
        spinner.style.display = "block";
console.log('LOGIN',this.state.login)
        if (!this.state.login) {
            label.style.display = "block";
            spinner.style.display = "none";
            this.btnDisabled = false;
            this.mensagemErro = "Login obrigatório"
            this.forceUpdate();
            return;
        }

        this.props.dispatch(login(this.state));
    }

    componentDidMount() {
        document.activeElement.className = "login-page";
    }

    parseError(cod) {
        let label = this.refs.lblEntrar;
        let spinner = this.refs.icSpinner;

        switch (cod) {
            case 401:
                this.mensagemErro = "Login e/ou senha inválido";
                label.style.display = "block";
                spinner.style.display = "none";
                this.btnDisabled = false;
                this.forceUpdate();
                break;

            case 404:
                this.mensagemErro = "Servidor não encontrado";
                label.style.display = "block";
                spinner.style.display = "none";
                this.btnDisabled = false;
                this.forceUpdate();
                break;

            case 500:
                this.mensagemErro = "Erro no servidor, tente mais tarde";
                label.style.display = "block";
                spinner.style.display = "none";
                this.btnDisabled = false;
                this.forceUpdate();
                break;
            default:
                this.mensagemErro = "Erro desconhecido";
                label.style.display = "block";
                spinner.style.display = "none";
                this.btnDisabled = false;
                this.forceUpdate();
                break;
        }
    }

    componentWillReceiveProps(props) {
        switch (props.nwstate) {
            case 'FETCHING': {
                this.mensagemErro = "";
                this.btnDisabled = true;
                this.forceUpdate();
                let label = this.refs.lblEntrar;
                let spinner = this.refs.icSpinner;
                label.style.display = "none";
                spinner.style.display = "block";
                break;
            }

            case 'FETCHED': {
                this.props.dispatch(done());
                window.location.assign("/#/");
                window.location.reload();
                break;
            }

            case 'REJECTED': {
                this.props.dispatch(done());
                console.log('REJECT')
                console.log(props)
                if (props.error.response) {
                    this.parseError(props.error.response.status);
                }else{
                    this.parseError(404);
                }
                
                break;
            }

            default: 
            break;
        }
    }

    render() {
        return (
            <div className="login-box">
                <div className="login-logo">
                    <a>Movimentação de Pessoal</a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Informe seu login e senha</p>
                    <form>
                        <FormGroup>
                            <InputGroup>
                                <FormControl 
                                    placeholder="Usuário" 
                                    name="login" 
                                    onChange={this.onChange}
                                    onKeyPress={(e) => {
                                        if(e.key === "Enter"){
                                            document.getElementsByName("password").item(0).focus();
                                        }
                                    }} />
                                <InputGroup.Addon>
                                    <span className="fa fa-user"></span>
                                </InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <FormControl 
                                    placeholder="Social" 
                                    name="social" 
                                    onChange={this.onChange}
                                     />
                                <InputGroup.Addon>
                                    <span className="fa fa-social"></span>
                                </InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <FormControl 
                                    placeholder="Perfil" 
                                    name="perfil" 
                                    onChange={this.onChange}
                                    />
                                <InputGroup.Addon>
                                    <span className="fa fa-perfil"></span>
                                </InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <FormControl 
                                    type="password" 
                                    placeholder="Senha"
                                    name="password"
                                    onKeyPress={(e)=>{
                                        if(e.key === "Enter"){
                                            this.doLogin();
                                        }
                                    }}
                                    onChange={this.onChange} />
                                <InputGroup.Addon>
                                    <span className="fa fa-lock"></span>
                                </InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        <Row>
                            <Col xs={8}>
                                {this.mensagemErro &&
                                    <span className="text-red"><i className="fa fa-exclamation-triangle"></i> {this.mensagemErro}</span>
                                }
                            </Col>
                            <Col xs={4}>
                                <Button bsStyle="primary" className="pull-right btn-block btn-flat" onClick={this.doLogin} disabled={this.btnDisabled}>
                                    <span ref="lblEntrar">
                                        Entrar
                                    </span>
                                    <span ref="icSpinner" style={{ display: "none" }}>
                                        <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
                                    </span>
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        SSO: store.SSO.SSO,
        error: store.SSO.error,
        nwstate: store.SSO.nwstate
    }
})(Login);