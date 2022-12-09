import AsyncStorage from "@react-native-async-storage/async-storage";
import configData from '../global.json';

export const Init = () => {
    return async dispatch => {
        let token = await AsyncStorage.getItem('token');
        let user = await AsyncStorage.getItem('user');
        if (token !== null) {
            dispatch({
                type: 'LOGIN',
                payload: { token: token, user: JSON.parse(user) }
            })
        }else{
            LogoutAction();
        }
    }
}


// export const SetByToken = () => {
//     try {
//         return async dispatch => {
//             let authToken = await AsyncStorage.getItem('authToken');
//             if (authToken !== null) {
//                 const result = await fetch(configData.apiURLTahu+'user_detail?key=token&value='+authToken, {
//                     method: 'GET',
//                     headers: {
//                         'Tahuorization': configData.apiKeyTahu ,
//                     },
//                 });
//                 const json = await result.json();
//                 if (json) {
//                     dispatch({
//                         type: 'SET_USER',
//                         payload: json.data
//                     })
//                 } else {
//                     console.log('Unable to fetch!');
//                     LogoutAction();
//                 }
//             }
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }



export const LoginAction = (token, user) => {
    return async dispatch => {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch({
            type: 'LOGIN',
            payload: { token: token, user: user }
        })
    }
}

export const LogoutAction = () => {
    return async dispatch => {
        const token = null;
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        dispatch({
            type: 'LOGOUT',
            payload: token
        })
    }
}

