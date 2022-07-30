import {takeLatest, put, all, call} from 'redux-saga/effects';
import { handleAddProduct,handleFetchProducts } from './productsHelpers';
import productsTypes from './productsTypes';
import { auth } from '../../firebase/firebase';

export function* addProduct({payload: {
        productCategory,
        productName,
        productThumbnail,
        productPrice
}}){

    try{
        const timestamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        });

    } catch(err){
        //console.log(err);
    }

}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}


export function* fetchProducts() {
    try {
        const products = yield handleFetchProducts();
    }catch (err) {
        //console.log(err);
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START,fetchProducts)
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
    ])
}