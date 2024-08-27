import React, { useContext, useEffect, useState } from "react";
import "../assets/css/topup.css";
import { Form, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const WithDrawPage = () => {
  const {auth, lan, content} = useContext(AuthContext);
  // const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if(!auth){
      navigate('/login');
    }
  }, [auth, navigate]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("bank");
  const {data:user} = useFetch(BASE_URL + '/user');
  const balance = user?.balance;

  const {data:banks} = useFetch(BASE_URL + '/payment-type');
  const bank = banks && banks.find(bank => bank.id == parseInt(id));

  const [accountName, setAccountName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState(bank && bank.id);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
      setPaymentType(id)
  }, [id]);

  const withdraw = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(balance < 1000){
      setLoading(false)
      toast.error("ငွေထုတ်ယူရန် လက်ကျန်ငွေ အနည်းဆုံး ၁၀၀၀ကျပ် ရှိရပါမည်။", {
        position: "top-right",
        autoClose: 1000,
        theme: 'dark',
        hideProgressBar: false,
        closeOnClick: true
      })
      return;
    }
    
    if (amount < 1000) {
    setLoading(false)
      toast.error("အနည်းဆုံး ၁၀၀၀ကျပ်မှ စထုတ်ပေးပါရန်။", {
        position: "top-right",
        autoClose: 1000,
        theme: 'dark',
        hideProgressBar: false,
        closeOnClick: true
      });
      return;
    }

    if(amount > balance){
      setLoading(false)
      toast.error("ငွေထုတ်ယူမည့် ပမာဏမှာ လက်ကျန်ငွေ ထပ် ကျော်လွန်နေပါသည်။", {
        position: "top-right",
        autoClose: 3000,
        theme: 'dark',
        hideProgressBar: false,
        closeOnClick: true
      })
      return;
    }
    
    const inputData = {
        "account_name": accountName,
        "account_no": accountNo,
        "amount": amount,
        "payment_type_id": paymentType,
        "note": note,
    }

    try {
        const response = await fetch(BASE_URL + '/transaction/withdraw', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(inputData)
        });
    
        if (!response.ok) {
          let errorData = await response.json().catch(() => ({}));
    
          if (response.status === 422) {
            setErrMsg("");
            setError(errorData.errors || "Unknown error");
          } else if (response.status === 401) {
            setError("");
            setErrMsg(errorData.message || "Unauthorized");
          } else {
            throw new Error('Deposit Failed');
          }
    
          throw new Error('Deposit Failed');
        }
    
        const data = await response.json();
        setLoading(false);
    
        toast.success("Submitted successfully.", {
          position: "top-right",
          autoClose: 1000,
          theme: 'dark',
          hideProgressBar: false,
          closeOnClick: true
        });
    
        setTimeout(() => {
          navigate("/history");
        }, 2000);
      } catch (error) {
        console.error('Error during fetch:', error);
        setLoading(false);
      }
  }

  return (
    <div className="py-4 px-3 px-sm-4 pb-5 mb-5">
        <ToastContainer />
      <div className="topupContainer p-3 rounded-3">
        <h5 className="fw-bold">{content?.withdraw}</h5>
        <img src={bank && bank.image_url} width={100} className="rounded-4 shadow mt-3" alt="" />
        <small className="d-block mt-3">{content?.please_fill}</small>
        <form onSubmit={withdraw}>
        <div className="row my-3">
          <div className="col-sm-6 pe-2">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{content?.account_name}</Form.Label>
              <Form.Control 
              type="text" 
              placeholder={content?.enter_account_name}
              onChange={e => setAccountName(e.target.value)} 
              value={accountName}
              />
              {error.account_name && (
                  <span className="text-danger">*{error.account_name}</span>
              )}
            </Form.Group>
          </div>
          <div className="col-sm-6 ">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{content?.account}</Form.Label>
              <Form.Control 
              type="text" 
              placeholder={content?.enter_account}
              onChange={e => setAccountNo(e.target.value)}
              value={accountNo}
              />
            {error.account_no && (
                  <span className="text-danger">*{error.account_no}</span>
              )}
            </Form.Group>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-sm-6 pe-2">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{content?.amount}</Form.Label>
              <Form.Control 
              type="number" 
              placeholder={content?.enter_amount}
              onChange={e => setAmount(e.target.value)}
              value={amount}
              />
            </Form.Group>
          </div>
          <div className="col-sm-6 pe-2">
            <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{content?.note}</Form.Label>
                <Form.Control
                    placeholder={content?.enter_note}
                    as="textarea"
                    rows={3}
                    onChange={e => setNote(e.target.value)}
                    value={note}
                />
            </Form.Group>
          </div>
        </div>
        
        {loading ? <Spinner /> : <button className="loginBtn w-full fw-bold py-2 rounded-3" type="submit">
          {content?.submit}
        </button>}
        
        </form>
      </div>
    </div>
  );
};

export default WithDrawPage;
