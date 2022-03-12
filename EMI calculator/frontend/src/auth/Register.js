import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { toast } from 'react-toastify';
import { register } from "../actions/auth";


const Register = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bmiDetails, setBmiDetails] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        name,
        email,
        password,
        bmiDetails
      });
      console.log('REGISTER USER ====>', res);
      toast.success('Register success.Please login.');
      history.push('/');
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };
  return (
    <>
      <div className="regbackground" >
        <div className="Reghead bg-warning">
          <h1>Register</h1>
        </div>


        <div className="Regbody">
            <div >
              <RegisterForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            </div>
        </div>
      </div>

    </>
  );
};

export default Register;


