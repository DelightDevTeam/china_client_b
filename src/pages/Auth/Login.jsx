import React, { useEffect, useState } from 'react'
import logo from "../../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import BASE_URL from '../../hooks/baseURL';
import en_data from '../../lang/en';
import ch_data from '../../lang/ch';

export default function Login() {
  const [eye, setEye] = useState(false);
  
  const [content, setContent] = useState(en_data);
  const language = localStorage.getItem("lan");
  useEffect(() => {
      if(language === "en"){
          setContent(en_data);
      }
      else if(language === "ch"){
          setContent(ch_data);
      }
  }, [language]);

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error , setError] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success , setSuccess] = useState('');
    const [loading , setLoading] = useState(false);
    const [data, setData] = useState('');
    const navigate = useNavigate();

    const auth = localStorage.getItem('token');

    // console.log(language);
    
    

    useEffect(() => {
        if(auth){
          navigate('/');
        }
      }, [auth, navigate]);

      const login = (e) =>{
        e.preventDefault();
        setLoading(true);
        const loginData = {
            phone: phone,
            password: password
        };
        // console.log(loginData);
        
        fetch(BASE_URL + '/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        })
          .then(async response => {
            if (!response.ok) {
              setLoading(false);
              let errorData;
              try {
                errorData = await response.json();
              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
        
              if (response.status === 422) {
                setErrMsg("");
                setError(errorData.errors);
              }else if (response.status === 401) {
                setError("");
                setErrMsg(errorData.message)
                // console.log(errorData.message);
              }else{
              }
              throw new Error('Login Failed');
            }
            return response.json();
          })
          .then(data => {
            setData(data);
            setLoading(false);
            if (data.data.token) {
                localStorage.setItem('token', data.data.token);
                // window.location.href = "/";
                // console.log("success");
            } else {
                throw new Error('Token not found in response');
            }
          })
          .catch(error => {
          });
      }


  return (
    <div className='container mt-5'>
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="p-3 pt-4 bg-transparent rounded-4 border border-1">
                    <div className="text-center mb-4">
                        <img src={logo} width={100} className='rounded-3 shadow border border-warning' alt="" />
                    </div>
                    
                    <h4 className="text-center">{content?.login}</h4>
                    <form onSubmit={login}>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">{content?.phone}</label>
                            <input type="text" 
                            className="form-control" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={content?.enter_phone}
                            />
                            {error && error.phone && <p className="text-danger">{error.phone}</p>}
                            {errMsg && <p className="text-danger">{errMsg}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">{content?.password}</label>
                            <div className="password">
                              <input type={`${eye ? "text" : "password"}`} 
                              className="form-control" 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder={content?.enter_password}
                              />
                              <i className={`fas fa-${eye ? "eye-slash" : "eye"} cursor-pointer eye`} onClick={()=>setEye(!eye)}></i>
                            </div>

                            {error && error.password && <p className="text-danger">{error.password}</p>}
                        </div>
                        <div className="mt-2 mb-3">
                            {loading ? <Spinner /> : <button type='submit' className="btn btn-outline-light w-100">
                              {content?.login}
                            </button>}
                        </div>
                        <div className="text-center">
                        <Link className='underline' to={'/register'}>{content?.register}</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
