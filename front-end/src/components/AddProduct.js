import React, { useState } from 'react';

import toast, { Toaster } from "react-hot-toast";
// toast.configure();

export const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    const [error, setError] = useState(false);

    const user_id = JSON.parse(localStorage.getItem("user"))._id;

    const addProduct = async () => {
        console.log(name, price, category, company);

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        try {
            let result = await fetch("http://localhost:5000/addProduct", {
                method: "POST",
                body: JSON.stringify({ name, price, category, user_id, company }),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });
            let statuscode = result.status;
            result = await result.json();
            // console.log(statuscode);
            if (statuscode === 200) {
                toast.dismiss();
                toast.success("Product Added Successfully !!");
            } else {
                toast.dismiss();
                toast.error("Error in Adding Product !!");
            }
            setName("");
            setPrice("");
            setCategory("");
            setCompany("");
        } catch (err) {
            toast.dismiss();
            toast.error("Error in Adding Product !!");
        }

    }


    const clearInput = () => {
        toast.dismiss();
        toast("Form cleared !!")
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        setError(false);
    }

    return (
        <div className='maxOuter'>
            <h1 className='text-center'>Add Product</h1>
            <div className='inputWrapper'>
                <div className='inputSpanWrapper'>

                    <input className='inputBox' type="text" placeholder='Product Name' value={name} onChange={(e) => { setName(e.target.value) }} />{
                        error && !name && <span className='errorSpan'>*Please enter valid name</span>
                    }
                </div>
                <div className='inputSpanWrapper'>

                    <input className='inputBox' type="text" placeholder='Product Price' value={price} onChange={(e) => { setPrice(e.target.value) }} />{
                        error && !price && <span className='errorSpan'>*Please enter valid price</span>
                    }
                </div>
                <div className='inputSpanWrapper'>

                    <input className='inputBox' type="text" placeholder='Product Category' value={category} onChange={(e) => { setCategory(e.target.value) }} />{
                        error && !category && <span className='errorSpan'>*Please enter valid category</span>
                    }
                </div>
                <div className='inputSpanWrapper'>

                    <input className='inputBox' type="text" placeholder='Product Company' value={company} onChange={(e) => { setCompany(e.target.value) }} />{
                        error && !company && <span className='errorSpan'>*Please enter valid company</span>
                    }
                </div>
                <div className='buttonWrapper'>
                    <button type="submit" className='addProductButton' onClick={addProduct}>Add Product</button>
                    <button type="submit" className='clearButton' onClick={clearInput}>Clear</button>
                </div>
            </div>
            {/* <Toaster /> */}
        </div>
    )
}
