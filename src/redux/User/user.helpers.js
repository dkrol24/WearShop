import {auth} from './../../firebase/firebase';

export const handleResetPasswordAPI = (email) => {
    const config = {
        url: 'http://localhost:3000/login'
      };

    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email, config)
        .then(()=>{
          resolve();
         // props.history.push('/login');
        })
        .catch(()=>{
          const err = ['Email not found'];
            reject(err);
         // setErrors(err);
        })
    })
}