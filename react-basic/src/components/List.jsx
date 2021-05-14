import React from 'react';
import { Link } from 'react-router-dom';

import Api from '../services/api';


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded:    false,
            list_employees: []
        };
    }

    deleteData = (id) => {
        fetch(Api + "/?borrar="+id)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.loadData();
            })
            .catch((err) => {
            })
    }

    loadData() {
        fetch(Api)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({
                    loaded:  true,
                    list_employees: data
                });
            })
            .catch((err) => {
            })
         
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const {loaded, list_employees} = this.state;

        if (!loaded) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-success" to={"/create"}>Agregar empleado</Link>
                    </div>
                    <div className="card-body">
                        <h3>Lista de empleados</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list_employees.map((employee) => {
                                        return (
                                            <tr key={employee.id}>
                                                <td>{employee.id}</td>
                                                <td>{employee.nombre}</td>
                                                <td>{employee.correo}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="">
                                                        <Link className="btn btn-warning" to={"/edit/" + employee.id}>Editar</Link>
                                                        <button type="button" className="btn btn-danger" onClick={() => this.deleteData(employee.id)}>Borrar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">
                    </div>
                </div>
               
            );
        }
    }
}
 
export default List;