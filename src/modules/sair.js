import React, { Component } from 'react';
import baseConf from '../configurations/config.js';

class Sair extends Component {
 
    async doLogout() {

        let response = await fetch(baseConf.remoteServer.baseURL + "/api/usuario/SSO/logout", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if(response.status === 401){
            window.location.assign("/#/login");
            window.location.reload();
        }

        if(response.status === 200){
            this.doLogout();
        }
    }

    render() {
        this.doLogout();
        return (
            <h3>&nbsp;&nbsp;Saindo...</h3>
        )
    }
}

export default Sair;