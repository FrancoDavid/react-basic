import React from 'react'
import { Link } from 'react-router-dom';
import Api from '../services/api';
 
class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loaded: false,
            employee: []
        };
    }

    sendForm = (e) =>  {
        e.preventDefault();
        const {employee} = this.state;
 
        const data_send = {
            id: employee.id,
            nombre: employee.nombre,
            correo: employee.correo
        };
 
        fetch(Api   +   "/?actualizar=1", {
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
        const state = this.state.employee;
        state[e.target.name] = e.target.value;
        this.setState({employee: state});
    }
    
    loadEmployee(id) {
        fetch(Api   +   "/?consultar="+id)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({
                loaded: true,
                employee: data[0]
            })
        })
        .catch((err) => {
        })
    }

    componentDidMount() {
        const id_employee = this.props.match.params.id;
        this.loadEmployee(id_employee);
    }

    render() {
        const {loaded, employee} = this.state;
        if (!loaded) {
            return(<div>Loading...</div>)
        } else {
            return (
                <div className="card">
                    <div className="card-header">
                        Editar empleado Num. {employee.id}
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.sendForm}>
                            <div className="form-group">
                              <label>Clave:</label>
                              <input type="text" name="clave" id="clave" className="form-control" placeholder="" aria-describedby="helpId" readOnly value={employee.id} onChange={this.changeValue}/>
                            </div>
                            <div className="form-group my-2">
                                <label>Nombre Empleado</label>
                                <input type="text" name="nombre" id="nombre" onChange={this.changeValue} value={employee.nombre} className="form-control" placeholder="ingresa nombre del empleado" aria-describedby="helpId"/>
                            </div>
                            <div className="form-group my-2">
                                <label>Correo empleado</label>
                                <input type="email" name="correo" id="correo" onChange={this.changeValue} value={employee.correo} className="form-control" placeholder="ingresa correo del empleado" aria-describedby="helpId"/>
                            </div>
                            <div className="btn-group my-4" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Guardar cambios</button>
                                <Link className="btn btn-danger" to={"/"}>Cancelar</Link>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-muted"></div>
                </div>
            );
        }
    }
}
 
export default Edit;