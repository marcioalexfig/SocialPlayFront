import React, { Component } from 'react'
import { Row, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Breadcrumb, Crumb } from '../../template/components/breadcrumbs';
import { connect } from 'react-redux';
import * as ActUsuarios from '../../actions/usuariosActions';

class TodosUsuarios extends Component {

    constructor(params) {
        super(params);
        this.state = {
            nome: ""
        };

        this.onChange = this.onChange.bind(this);
        this.doFind = this.doFind.bind(this);
        this.doClear = this.doClear.bind(this);
        this.onSwitchClick = this.onSwitchClick.bind(this);

        this.props.dispatch(ActUsuarios.getUsuarios());
    }

    onChange(el) {
        this.setState({
            [el.target.name]: el.target.value
        })
    }

    onSwitchClick(row){
        var self = this;
        
        const toEdit = {
            ...row,
            ativo: !row.ativo
        }

        return (e) => {
            self.props.dispatch(ActUsuarios.edtUsuario(toEdit));        
        }
    }

    doClear() {
        this.setState({
            nome: "",
            empresa: ""
        });

        this.props.dispatch(ActUsuarios.getUsuarios());
    }

    doFind() {
        this.props.dispatch(ActUsuarios.findUsuario(this.state));
    }

    componentWillReceiveProps(props) {
        if (props.nwstate === 'FETCHED') {
            this.props.dispatch(ActUsuarios.done());
        }

        if (props.nwstate === 'REJECTED') {
            //Error
        }
    }

    render() {
        return (
            <div>
                <section className="content-header">
                    <h1>Todos os Usuários</h1>
                    <Breadcrumb>
                        <Crumb icon="fa fa-address-card" to="/usuarios" label="Usuários" />
                        <Crumb icon="fa fa-circle-o" label="Todos" active={true} />
                    </Breadcrumb>

                    <section className="content">
                        <Row>
                            <Col md={9}>
                                <div className="box box-primary">
                                    <div className="box-header">
                                        <h3 className="box-title">Usuários</h3>
                                        <div className="box-tools">
                                            <a href="/#/usuarios/novo" className="btn btn-flat"><i className="fa fa-plus"></i> Novo Usuário</a>
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <BootstrapTable
                                            data={this.props.usuarios}
                                            striped
                                            hover
                                            bordered={false}
                                            pagination
                                            tableHeaderClass="bg-blue"
                                            options={{
                                                sizePerPage: 20,
                                                hideSizePerPage: true,
                                                noDataText: "Nenhum motorista encontrado"
                                            }}>
                                            <TableHeaderColumn sortOrder="asc" dataField="rid">ID</TableHeaderColumn>
                                            <TableHeaderColumn sortOrder="asc" dataField="nome" isKey={true}>Nome</TableHeaderColumn>
                                            <TableHeaderColumn dataAlign="right" dataField="_id" dataFormat={(cel, row) => {
                                                if(row.ativo){
                                                    return <a onClick={this.onSwitchClick(row)} className="text-green"><i className="fa fa-toggle-on"></i></a>
                                                } else {
                                                    return <a onClick={this.onSwitchClick(row)} className="text-red"><i className="fa fa-toggle-off"></i></a>
                                                }
                                            }}>Ativo</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="box box-primary">
                                    <div className="box-header">
                                        <h3 className="box-title">Filtro</h3>
                                    </div>
                                    <div className="box-body">
                                        <Row>
                                            <Col md={12}>
                                                <ControlLabel>Nome</ControlLabel>
                                                <FormControl value={this.state.nome} name="nome" onChange={this.onChange} />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="box-footer">
                                        <Button bsStyle="primary" style={{ marginLeft: 10 }} className="pull-right btn-flat" onClick={this.doFind}>
                                            <span>
                                                <i className="fa fa-filter"></i>
                                                &nbsp;
                                                Filtrar
                                            </span>
                                        </Button>
                                        <Button bsStyle="warning" className="pull-right btn-flat" onClick={this.doClear}>
                                            <span>
                                                <i className="fa fa-times"></i>
                                                &nbsp;
                                                Limpar
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </section>
                </section>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        usuarios: store.usuarios.usuarios,
        nwstate: store.usuarios.nwstate
    };
})(TodosUsuarios);