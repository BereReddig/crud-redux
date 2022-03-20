/*
    Solo tenemos 1 store por app y es el encargado de el state 
    de toda la app. Siempre que se crea una app se require un 
    reducer que va a manejar el estado de cada componente.
    Todos los reducer se van a combinar en el archivo 
    /reducers/index.js.
    Un store basico creado con createStore() solo puede ser 
    modificado despachando acciones de forma sincrona, Los 
    middleware extienden la capacidad del store para escribir
    logica asincrona que interactua con el store.
    Al store le pasamos los reducers y con compose() podemos 
    combinar funciones para potenciar el store, por ej podemos 
    pasarle la Funcion applyMiddleware() que nos permite usar
    redux-thunk en nuestro store.
    Los middlewares te dajan envolver el método dispatch del Store.
    El uso más común de los middlewares es soportar acciones asíncronas.
*/

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(
    reducers,
    compose(applyMiddleware(thunk),
        typeof window === 'object' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
            !== 'undefined' 
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() 
        : f => f
    )
);

export default store;
