/*
    Cada reducer tiene su propio state y el reducer siempre
    es una funcion que va a tomar un parametro 'state' y un 
    'action'. 
    El store le pasa el estado y la accion que se va a ejecutar, 
    pero si no le pasa nada, incia por default con initialState.

    Todo el reducer es un switch que va a tomar por parametro el
    'action.type'. Dentro del switch vamos a ir describiendo todos
    los case que van a decribir lo que va a pasar en nuestra app y
    van a ir cambiando el state de acuerdo a algo llamado el payload.
    Es importante poner un caso por default en el que se devuelve el
    state tal cual esta.
*/

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

const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoEliminar: null,
    productoEditar: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AGREGAR_PRODUCTO:
        case COMENZAR_DESCARGA_PRODUCTOS:
        case COMENZAR_EDICION_PRODUCTO:
            return {
                ...state,                   //retornamos el state
                loading: action.payload     //modificando la propiedad loading
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGA_PRODUCTOS_ERROR:
        case PRODUCTO_ELIMINADO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoEliminar: action.payload
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto =>
                    producto.id !== state.productoEliminar
                ),
                productoEliminar: null
            }
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoEditar: action.payload
            }
        default:
            return state;
    }
};

