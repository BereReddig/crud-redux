import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";

const EditarProducto = () => {
    const [producto, guardarProducto] = useState({ 
        nombre: '',
        precio: ''
    });

    const productoEditar = useSelector(state => state.productos.productoEditar);
    
    useEffect(() => {
        guardarProducto(productoEditar);
    }, [productoEditar]);

    const { nombre, precio } = producto;

    const submitEditarProducto = e => {
        e.preventDefault();
        editarProductoAction()
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre Producto"
                                    name='nombre'
                                    value={nombre}
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
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarProducto;