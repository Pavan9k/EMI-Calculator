import { useState,useEffect } from "react";
import { Chart } from "react-google-charts";
import React from "react";
import Pdf from "react-to-pdf";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Newcal } from "../actions/auth";




function Emi() {



    const [loanAmount, setLoanAmount] = useState(100000);
    const [interestRate, setInterestRate] = useState(10);
    const [loanPeriod, setLoanPeriod] = useState(1);
    const [totalInterest, setTotalInterest] = useState(5499.06);
    const [totalAmount, setTotalAmount] = useState(105499.06);
    const [emi, setEmi] = useState(8791.59)
    const [clsForInput, setClassForInput] = useState("form-control")
    const [style1, setStyle1] = useState("none");
    const [style2, setStyle2] = useState("none");
    const [style3, setStyle3] = useState("none");
    const [errClsForText, setErrClsForText] = useState("text-danger");
    const [errMsg1, setErrMsg1] = useState("Please Enter Amount");
    const [errMsg2, setErrMsg2] = useState("Please Enter Interest Rate");
    const [errMsg3, setErrMsg3] = useState("Please Enter Loan Period");
    const [authInfo,setAuthInfo]=useState("")
    const [name,setName]=useState("pavan")



    const ref = React.createRef(); // For pdf download
    const dispatch = useDispatch();
    const history = useHistory();

    const { auth } = useSelector((state) => ({ ...state }));

    console.log(authInfo)




   
    let data = [
        ["Name", "Amount"],
        ["Total Amount", totalAmount],
        ["Total Interest Amount ", totalInterest],
        ["EMI", emi],

    ];


    const options = {
        title: "Loan Details:",
    };

    const logout = () => {
        // dispatch({
        //     type: 'LOGOUT',
        //     payload: null,
        // });
        window.localStorage.removeItem('auth');
        history.push("/");
    };

  
    const calculateEmi = async (e) => {

        e.preventDefault();
        setAuthInfo(auth.user.email);

        const userAmount = Number(loanAmount);
        const calculatedInterest = Number(interestRate) / 100 / 12;
        const calculatedPayments = Number(loanPeriod) * 12
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (userAmount * x * calculatedInterest) / (x - 1);

        const monthlyPaymentCalculated = monthly.toFixed(2);
        const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
        const totalInterestCalculated = (
            monthly * calculatedPayments -
            userAmount
        ).toFixed(2);

        setEmi(Number(monthlyPaymentCalculated))
        setTotalAmount(Number(totalPaymentCalculated))
        setTotalInterest(Number(totalInterestCalculated))


        try {
            const result = await Newcal({ name:authInfo,emi , totalInterest, totalAmount })

        }
        catch(err){
            console.log(err)
        }





    }
    function checkForErrors() {
        if (loanAmount == "") {
            setStyle1('block')
        }
        else {
            setStyle1("none")
            if (loanAmount > 0) {
                setStyle1("none")
                setErrMsg1("Please Enter Amount")

            }
            else {
                setErrMsg1("Amount cannot be  negative ")
                setStyle1('block')
            }

        }
        if (interestRate == "") {
            setStyle2('block')
        }
        else {
            setStyle2("none")
            if (interestRate < 0) {
                setErrMsg2("Interest Rate cannot be  negative ")
                setStyle2('block')
            }
            else {
                setStyle2("none")
                setErrMsg2("Please Enter Interest Rate")
            }
        }
        if (loanPeriod == "") {
            setStyle3('block')
        }
        else {
            setStyle3("none")
            if (loanPeriod < 0) {
                setErrMsg3("Loan Period cannot be  negative ")
                setStyle3('block')
            }
            else {
                setStyle3("none")
                setErrMsg1("Please Enter Loan Period")
            }
        }
    }



    return (
<div>
{auth.user.isAdmin ? 

    <div>
    <Link to="/AdminTable" className="btn btn-info">User Details</Link> 
    
        hai
    </div>

    
: 


        <div className=".container ">


            <div className=".container float-container">


                <div className="bg">
                    <h3 className="headingCal">EMI CALCULATOR</h3>

                    <div className="floatchild4">

                      


                        <button className="btn btn-outline-light" onClick={logout}>LogOut</button>


                    </div>

                    <div className=".container float-child floatchild1">


                        <h5>Loan Amount</h5>
                        <input className={clsForInput} min={1} type="number" value={loanAmount} onClick={(e) => { setLoanAmount(Number(e.target.value)) }} onInput={(e) => { setLoanAmount(Number(e.target.value)) }} />
                        <label style={{ display: style1 }} className={errClsForText}>{errMsg1}</label>


                        <h5>Interest Rate (%) </h5>
                        <input className={clsForInput} min={1} type="number" value={interestRate} onClick={(e) => { setInterestRate(Number(e.target.value)) }} onInput={(e) => { setInterestRate(Number(e.target.value)) }} />
                        <label style={{ display: style2 }} className={errClsForText}>{errMsg2}</label>


                        <h5>Loan Tenure(Years)</h5>
                        <input type="number" className={clsForInput} min={0} value={loanPeriod} onClick={(e) => { setLoanPeriod(Number(e.target.value)) }} onInput={(e) => { setLoanPeriod(Number(e.target.value)) }} />
                        <label style={{ display: style3 }} className={errClsForText}>{errMsg3}</label>


                        <button className="btn btn-outline-light" onClick={(e) => { calculateEmi(e); checkForErrors() }}>Calculate EMI</button>

                        <Pdf targetRef={ref} filename="emidetails.pdf" className="float-child">
                            {({ toPdf }) => <button className="btn btn-outline-light downloadbutton" onClick={toPdf} >Download</button>}
                        </Pdf>


                    </div>

                    <div className=".container float-child">

                        <Chart className="Chart"
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width={"100%"}
                            height={"400px"}
                        />

                    </div>


                    <div className="p-3 mb-2 text-dark float-child floatchild3">


                        <div ref={ref}>


                            <h6 className="d-inline">      EMI            - {emi}</h6>  <br />
                            <h6 className="d-inline">   Total Interest    - {totalInterest}</h6><br />
                            <h6 className="d-inline">    Total Amount      - {totalAmount}</h6><br />


                        </div>

                    </div>

                </div>


            </div>


        </div>

        
}
</div>

    );
}
export default Emi;

