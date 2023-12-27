import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Forms = () => {
    // state to check if the form is submitted
    const [formSubmit,setformSubmit]=useState(false);

    // state to keep track of all errors
    const [formErr,setFormErr]=useState({});

    // state to keep all formdata
    const[formData,setFormData]=useState({
        email : "",
        firstName : "",
        lastName : "",
        phoneNo : ""
    })

    // function to store all the values of input in the formData object
    const handleInputChange = (e)=>{
        let {name,value} = e.target
        setFormData({
            ...formData,
            [name] : value
        })
    }
    //Submit function
    const formSubmithandler = (e)=>{
        e.preventDefault()
        let errors = validate(formData);
        setFormErr(errors)

        let errorkeyArray = Object.keys(errors);
        if(errorkeyArray.length == 0){
            toast("Form submitted Successfully!")
            setformSubmit(true);
        } else{
            setformSubmit(false);
        }
    }

    const validate = (data)=>{
        // make an error object 
        let error = {}

        if(data.firstName.trim()==""){
            error.firstName="Please enter your First Name"
        }
        if(data.lastName.trim()==""){
            error.lastName="Please enter your Last Name"
        }
        if(data.email.trim()==""){
            error.email="Please enter your Email"
        }
        if(data.phoneNo.trim()==""){
            error.phoneNo="Please Enter your phone number"
        }
        if(data.phoneNo.trim().length !==10){
            console.log(data.phoneNo.trim().length)
            error.phoneNo="Please enter 10-digit Phone number"
        }
        return error;
    }
  return (
    <div className='form-container'>
         <ToastContainer />
        <fieldset>
            <legend>Fill this Form</legend>
            <form onSubmit={formSubmithandler}>
                {/* Success Message  */}
                {formSubmit && <div className='success'>
                                 <p>Registration Successful</p>
                              </div> }

                <label> First Name </label>
                <input type="text" name='firstName' onChange={handleInputChange}/>
                {formErr.firstName && <p className='err'>{formErr.firstName}</p>}

                <label> Last Name </label>
                <input type="text" name='lastName' onChange={handleInputChange} />
                {formErr.lastName && <p className='err'>{formErr.lastName}</p>}

                <label>Email</label>
                <input type="email" name='email' onChange={handleInputChange}/>
                {formErr.email && <p className='err'>{formErr.email}</p>}

                <label> Phone number </label>
                <input type="number"  name='phoneNo' onChange={handleInputChange}/>
                {formErr.phoneNo && <p className='err'>{formErr.phoneNo}</p>}

                <input className='button' type="submit" value={"Register"} />
            </form>
        </fieldset>
    </div>
  )
}

export default Forms