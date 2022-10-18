import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie'


const baseURL = 'http://api-library-service.herokuapp.com/api/registry'
const cookies = new Cookies()


class Login extends Component {
    
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
         this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    registrarse(){
        window.location.href="./registro"
    }


    iniciarSesion=async()=>{
        await axios.get(baseURL,{params: {user: this.state.form.username, password: this.state.form.password}})
        .then(res=>{
           
            return res.data;
        })
        .then(res=>{
            if(res.length>0){
              
                var respuesta=res[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('user', respuesta.user, {path: "/"});
                cookies.set('email', respuesta.email, {path: "/"});
                alert(`Bienvenido ${respuesta.user}`);
                window.location.href="./menu";
            
            }else{
                alert('El usuario o la contraseña no son correctos');
            }
        })
       
        .catch(error=>{
            console.log(error)
        })
    }

    componentDidMount() {
        if(cookies.get('user')){
            window.location.href="./menu";
        }
    }

    render() {
        return (
    <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary p-2 m-2" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
            <button className="btn btn-primary p-2 m-2" onClick={()=> this.registrarse()}>Registrarse</button>

          </div>
        </div>
      </div>
        );

















        <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario:</label>
            <br />
            <input type="text" className="form-control" name="user" onChange={(e) => setUser(e.target.value)} />
             <label>Correo: </label>
            <br />
            <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)}/>
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password" className="form-control"name="password" id='psw1' onChange={(e) => setPassword1(e.target.value)}/>

            <label>Repetir contraseña: </label>
            <br />
            <input type="password" className="form-control"name="password" id='psw2' onChange={(e) => setPassword2(e.target.value)}/>
            <br />
            <button className="btn btn-primary p-2 m-2" onClick={()=>window.location.href="./"}>Iniciar Sesión</button>
            <button className="btn btn-primary p-2 m-2" onClick={()=>{
        fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(
            {
                id: (parseInt(lastID)+1).toString(),
                user: user,
                email: email, 
                password: password2   
            }   
        )
    }).then((res)=>res.json()).then((resJson)=>alert(resJson.message)).then(()=>window.location.href="./");} }>Registrarse</button>

          </div>
        </div>
      </div>
    }
}

export default Login;