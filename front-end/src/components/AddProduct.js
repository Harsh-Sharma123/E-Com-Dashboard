import React, { useState } from 'react'

export const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    const user_id = JSON.parse(localStorage.getItem("user"))._id;

    const addProduct = async () => {
        console.log(name, price, category, company);
        let result = await fetch("http://localhost:5000/addProduct", {
            method: "POST",
            body: JSON.stringify({name, price, category, user_id, company}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.log(result);
    }


    const clearInput = () => {
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
    }

    return (
        <div className='maxOuter'>
            <h1 className='text-center'>Add Product</h1>
            <div className='inputWrapper'>
                <input className='inputBox' type="text" placeholder='Product Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                <input className='inputBox' type="text" placeholder='Product Price' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
                <input className='inputBox' type="text" placeholder='Product Category' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
                <input className='inputBox' type="text" placeholder='Product Company' value={company} onChange={(e)=>{setCompany(e.target.value)}} />
                <div className='buttonWrapper'>
                    <button type="submit" className='addProductButton' onClick={addProduct}>Add Product</button>
                    <button type="submit" className='clearButton' onClick={clearInput}>Clear</button>
                </div>
            </div>
        </div>
    )
}
