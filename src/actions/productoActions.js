/* 
    Las actions son las funciones que modifican el state,
    desde ellas por ej, realizamos el trabajo de insertar en la DB
    o mandamos a ejecutar el reducer para modificar el state del store.
    Las acciones son objetos que llevan un siempre un argumento 'type' 
    y pueden llevar tambien un argumento 'payload' que son los datos 
    con los que queremos modificar el state.
*/
import Swal from 'sweetalert2';

import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import axios from 'axios';

// crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto())

        try {
            await clienteAxios.post('/productos', producto);
            // si guardo el producto en la DB actualiza el state
            dispatch(agregarProductoExito(producto));
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            console.log('error', error);
            // si hay error cambiar el state
            dispatch(agregarProductoError(true));
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta nuevamente'
            });
        };
    };
};

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// descargar productos de la db
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            //para probar state loading
            //setTimeout(async() => {}, 3000);
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargarProductosExitosa(respuesta.data));

        } catch (error) {
            dispatch(descargarProductosError());
            console.log(error);
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

// selecciona y elimina un producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            // si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto fue eliminado correctamente.',
                'success'
            );
        } catch (error) {
            console.log('error', error)
            dispatch(eliminarProductoError());
        };
    };
};

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

// obtener producto a editar
export function obtenerProductoEditarAction(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditar(producto));
    };
};

const obtenerProductoEditar = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

// editar el producto
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto());

        try {
            await axios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            console.log('error', error)
            dispatch(editarProductoError());
        };
    };
};

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: true
});

const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
});



