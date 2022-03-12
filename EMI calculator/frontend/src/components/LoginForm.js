import TopNav from "./TopNav";


const LoginForm = ({handleSubmit, email, setEmail, password, setPassword})  => (
    <div>


    <form onSubmit={handleSubmit} className="mt-3 regbody">

        <div className='form-group mb-3'>

            <label  className='form-label'><h5>Email Address</h5></label>
            <input 
                type="email" 
                className='form-control' 
                placeholder="Enter the email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
        </div>
        <div className='form-group mb-3'>
            <label  className='form-label'><h5>Password</h5></label>
            <input 
                type="password" 
                className='form-control' 
                placeholder="Enter the password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
        </div>

        <button disabled={!email || !password} className='btn btn-warning submit'>Submit</button>
             <TopNav />

        
    </form>
    </div>
);

export default LoginForm;