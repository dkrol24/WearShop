import userTypes from "./user.types";
import {takeLatest, call,all,put} from 'redux-saga/effects'
import { signInSuccess } from "./user.actions";
import { auth, handleUserProfile, getCurrentUser } from "../../firebase/firebase";

export function* getSnapshotFromUserAuth(user){
    try {
         const userRef = yield call(handleUserProfile, { userAuth: user });
         const snapshot = yield userRef.get();
          yield put(
                signInSuccess({
                      id: snapshot.id,
                    ...snapshot.data()
                })
          );

    }catch(err){
        // console.log(err)
    }
}
export function* emailSignIn({payload: {email,password}}){
    try{
           const {user} = yield auth.signInWithEmailAndPassword(email,password);
           yield getSnapshotFromUserAuth(user);
          }catch (err){
            //consolelog errr
          }
};


export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}


export function* isUserAuthhenticated() {
    try{
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }catch(err){
       // console.log(err)
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthhenticated);
}


export default function* userSagas() {
    yield all([call(onEmailSignInStart), call(onCheckUserSession)])
}