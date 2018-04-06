import promiseMiddleware from 'redux-promise';
import cantiqueMiddleware from './cantiqueMiddleware'

export default [cantiqueMiddleware, promiseMiddleware]
