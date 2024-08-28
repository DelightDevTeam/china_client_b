import React, { useContext, useEffect, useState } from "react";
import CurrentBalance from "../components/CurrentBalance";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { AuthContext } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";

const ExchangeBank = () => {
  const { auth, content } = useContext(AuthContext);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const { data: agent } = useFetch(BASE_URL + "/agent");
  const { data: banks } = useFetch(BASE_URL + "/payment-type");
  const bank = banks?.filter((bank) => bank.id == agent?.payment_type_id)[0];
  //   console.log(bank?.image_url);

  const { data: user } = useFetch(BASE_URL + "/user");
  const language = localStorage.getItem("lan");

  const handleCopyText = () => {
    if (agent?.account_number) {
      navigator.clipboard.writeText(agent?.account_number);
      toast.success("Copied", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const deposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (amount < 1000) {
      setLoading(false);
      toast.error("အနည်းဆုံး ၁၀၀၀ကျပ်မှ စဖြည့်ပေးပါရန်။", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
      return;
    }

    const inputData = {
      agent_payment_type_id: String(agent?.payment_type_id),
      amount,
    };

    try {
      const response = await fetch(BASE_URL + "/transaction/deposit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 422) {
          setErrMsg("");
          setError(errorData.errors || "Unknown error");
        } else if (response.status === 401) {
          setError("");
          setErrMsg(errorData.message || "Unauthorized");
        } else {
          throw new Error("Deposit Failed");
        }
        throw new Error("Deposit Failed");
      }

      const data = await response.json();
      setLoading(false);
      setAmount("");
      toast.success("ငွေသွင်းလွှာ ပို့ပြီးပါပြီ။", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
      navigate("/history");
    } catch (error) {
      console.error("Error during fetch:", error);
      setLoading(false);
    }
  };

  return (
    <div className="py-4 px-3 px-sm-4">
      <ToastContainer />
      <CurrentBalance user={user} />
      <p className=" my-4 fw-bold">{content?.choose_payment_method}</p>
      <div className="row">
        {type === "top-up" && agent?.payment_type_name && (
          <>
            <div className="border border-light bg-transparent rounded-4 p-2 px-3 my-3 shadow-lg">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div>
                    <img
                      className="rounded-3 shadow"
                      src={bank?.image_url}
                      width={100}
                      alt=""
                    />
                  </div>
                  <div className="ms-2">
                    <h6 className="fw-bold text-white">
                      {agent?.payment_type_name}
                    </h6>
                    <h6 className="fw-bold text-white">
                      {agent?.account_name}
                    </h6>
                    <h6 className="fw-bold text-white">
                      {agent?.account_number}
                    </h6>
                  </div>
                </div>
                <div>
                  <button className="btn btn-warning" onClick={handleCopyText}>
                    {/* <FaRegCopy size={25} /> */}
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <form onSubmit={deposit}>
              <div className="my-3">
                <div className="row mb-2">
                  <div className="text-white col-sm-3">
                    {content?.amount}
                  </div>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control w-full"
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                    {error.amount && <small>{error.amount}</small>}
                  </div>
                </div>
              </div>
              <button
                className="mt-4 w-max loginBtn py-2 px-5 mx-auto text-white rounded-5 text-center w-100"
                type="submit"
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <h5 className="mx-sm-3">
                    {content?.submit}
                  </h5>
                )}
              </button>
            </form>
          </>
        )}

        {type === "with-draw" &&
          banks &&
          banks.map((item, index) => {
            return (
              <div
                onClick={() => {
                  navigate(`/with-draw?bank=${item.id}`);
                }}
                key={index}
                className="col-md-1 col-4 mb-5"
              >
                <img
                  src={item?.image_url}
                  className="bankImg img-fluid rounded-3 shadow"
                />
                <small className="d-block mt-3 text-center">{item?.name}</small>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ExchangeBank;
