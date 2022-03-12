const RegisterForm = ({handleSubmit, name, setName, email, setEmail, password, setPassword})  => (
    <form onSubmit={handleSubmit} className="mt-3">
        <div>
            <label><h5>User Name:</h5></label>
            <input 
                type="text" 
                className='form-control' 
                placeholder="Enter the name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
            />
        </div>
        <div>
            <label  className='form-label'><h5>Email Address:</h5></label>
            <input 
                type="email" 
                className='form-control' 
                placeholder="Enter the email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
        </div>
        <div className='form-group mb-3'>
            <label  className='form-label'><h5>Password:</h5></label>
            <input 
                type="password" 
                className='form-control' 
                placeholder="Enter the password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
        </div>

        <button disabled={!name || !email || !password} className='btn btn-warning'>Submit</button>
        
    </form>
);

export default RegisterForm;