import React, { useEffect } from "react";
// components
import Producto from "./Producto";
// redux
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";

const Productos = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        //CONSULTAR LA API
        const cargarProductos = () => dispatch(obtenerProductosAction());
        cargarProductos();
    }, []);

    // obtener el state
    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);
    //console.log('productos',productos)
    return (
        <>
            <h2 className="text-center my-5">
                Listado de Productos
            </h2>
            {error ?
                <p className="font-weight-bold alert alert-danger text-center">
                    Hubo un error
                </p>
                : null
            }
            {cargando ?
                <p className="text-center">Cargando...</p>
                : null
            }
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precios</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                {productos.length === 0
                    ? 'No hay productos'
                    : (productos.map(producto => {
                        return (
                            <tbody>
                                <Producto
                                    key={producto.id}
                                    producto={producto}
                                />
                            </tbody>
                        );
                    })
                )}
            </table>
        </>
    );
}

export default Productos;