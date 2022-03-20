/*  
    { useDispatch, useSelector } son 2 hooks que vienen en redux. 
    useDispatch: nos sirve para mandar a ejecutar las acciones que tengamos.
    Nos devuelve una funcion que ejecuta las funciones de las actions.
    useSelector: es un hook que nos da redux para leer el state del
    store dentro de un componente.
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// actions de redux
import { crearNuevoProductoAction } from "../actions/productoActions";

const NuevoProducto = ({ history }) => {
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    const dispatch = useDispatch();

    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);

    const agregarProductos = producto => dispatch(crearNuevoProductoAction(producto))

    let navigate = useNavigate();
    const submitNuevoProducto = e => {
        e.preventDefault();
        if (nombre.trim() === '' || precio <= 0) {
            return;
        }
        agregarProductos({ nombre, precio });
        navigate('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form onSubmit={submitNuevoProducto}>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name='nombre'
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name='precio'
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                Agregar
                            </button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null }
                        { error ? 
                            <p className="alert alert-danger p2 mt-4 text-center">
                                Hubo un error
                            </p>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;