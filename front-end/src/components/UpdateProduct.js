import React, { useEffect, useState } from 'react';

import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
// toast.configure();

export const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    const params = useParams();

    useEffect(() => {
        console.log(params);
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let product = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "GET",
            headers: {
                'authorization': `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        product = await product.json();
        console.log(product);
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setCompany(product.company);
    }

    const [error, setError] = useState(false);

    const user_id = JSON.parse(localStorage.getItem("user"))._id;

    const navigate = useNavigate();

    const updateProduct = async () => {
        console.log(name, price, category, company);
        console.log(params.id)

        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': "application/json",
                    'authorization': `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });

            let statuscode = result.status;
            result = await result.json();
            
            if (statuscode === 200) {
                toast.success("Product Updated Successfully !!");
            } else {
                toast.error("Product was not updated due to some error !!");
            }
            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (err) {

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
            <h1 className='text-center'>Update Product</h1>
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
                    <button type="submit" className='updateButton' onClick={updateProduct}>Update Product</button>
                    <button type="submit" className='clearButton' onClick={clearInput}>Clear</button>
                </div>
            </div>
            {/* <Toaster /> */}
        </div>
    )
}
