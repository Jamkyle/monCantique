import promiseMiddleware from 'redux-promise';
import cantiqueMiddleware from './cantiqueMiddleware'
// import liturgieMiddleware from './liturgieMiddleware'
import { compose } from 'redux';

export default [ cantiqueMiddleware , promiseMiddleware]
