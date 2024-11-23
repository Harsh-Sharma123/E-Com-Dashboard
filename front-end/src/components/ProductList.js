import React, { useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';

export const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
        console.log(products);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE"
        })

        result = await result.json();

        if(result){
            toast.dismiss();
            toast.success("Product Deleted Successfully !!");
            getProducts();
        }

    }

    return (
        <div className='maxOuter productlist'>
            <h1 className='text-center'>Product List</h1>
            <ul>
                <li>S.No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li className='buttonsContainer'>Actions</li>
            </ul>
            {
                products.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li className='buttonsContainer'>
                            <Link to={`/update/${item._id}`} className='updateProductButton' >Update</Link>
                            <span onClick={() => deleteProduct(item._id)} className='deleteButton'>Delete</span>
                        </li>
                    </ul>
                ))
            }
            <Toaster />
        </div>
    )
}
