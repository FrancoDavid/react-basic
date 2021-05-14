import React from 'react'
import { Link } from 'react-router-dom';
import Api from '../services/api';


class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            errors: []
        };
    }

    verifyError(element) {
        return this.state.errors.indexOf(element) !== -1;
    }

    sendForm = (e) =>  {
       e.preventDefault();
       const {name, email} = this.state;

       var errors = [];

       if (!name) errors.push('error_nombre');

       if (!email) errors.push('error_email');

       this.setState({errors: errors});

       if (errors.length > 0) return false;

       const data_send = {
            nombre: name,
            correo: email
        };

       fetch(Api     +   "/?insertar=1", {
           method: 'POST',
           body: JSON.stringify(data_send)
       })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.props.history.push('/');
        })
        .catch((err) => {
        })
    }

    changeValue = (e)  => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state, errors: []});
    }

    render() {
        const {name, email} = this.state;

        return (
        <div className="card">
            <div className="card-header">
                Empleados
            </div>
            <div className="card-body">
               <form onSubmit={this.sendForm}>
                   <div className="form-group my-2">
                     <label>Nombre Empleado</label>
                     <input type="text" name="name" id="name" onChange={this.changeValue} value={name}
                     className={((this.verifyError("error_nombre")) ? "is-invalid": "")+" form-control"} placeholder="ingresa nombre del empleado" aria-describedby="helpId"/>
                     <small className="invalid-feedback">Campo ibligatorio</small>
                   </div>
                   <div className="form-group my-2">
                     <label>Correo empleado</label>
                     <input type="email" name="email" id="email" onChange={this.changeValue} value={email}
                     className={((this.verifyError("error_email")) ? "is-invalid": "")+" form-control"} placeholder="ingresa correo del empleado" aria-describedby="helpId"/>
                     <small className="invalid-feedback">Campo obligatorio</small>
                   </div>
                   <div className="btn-group my-4" role="group" aria-label="">
                       <button type="submit" className="btn btn-success">Agregar nuevo empleado</button>
                       <Link className="btn btn-danger" to={"/"}>Cancelar</Link>
                   </div>
               </form>
            </div>
            <div className="card-footer text-muted"></div>
        </div>  );
    }
}
 
export default Create;