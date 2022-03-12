import {useState} from 'react';
import {toast} from 'react-toastify';
import {login} from '../actions/auth';
import LoginForm from '../components/LoginForm';
import {useDispatch} from 'react-redux'

const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('SEND LOGIN DATA', {email, password});
        try{    
            let res = await login({email, password})
            console.log(res)
            if(res.data){

                
                    console.log('SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===>');
                    // console.log(res.data);
                    //save user and token to local storage
                    // window.localStorage.setItem('auth', JSON.stringify(res.data));
                    console.log(res.data)
                    //save user and token to redux
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: res.data,
                    });

                    history.push("/Emi");
                }

        }
    catch(err){
            console.log(err);
            if (err.response.status === 400) toast.error(err.response.data);
        }
    };

    return (

    <div>
        <div className='login'>

        <div className="Reghead bg-warning">

            <h1>Login</h1>
        </div>

        <div className='loginbody'>
                <div >
                    <LoginForm 
                     handleSubmit={handleSubmit}
                     email={email}
                     setEmail={setEmail}
                     password={password}
                     setPassword={setPassword}/>
                </div>
        </div>
        </div>
        </div>
    )
};

export  default Login;