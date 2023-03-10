import React, { useEffect, useState } from 'react'
import './Buynow.css'
import { Divider } from '@mui/material'
import Option from './Option'
import Subtotal from './Subtotal'
import Right from './Right'

const Buynow = () => {

    const [cartdata, setCartdata] = useState('');
    console.log(cartdata);

    const getdatabuy = async () => {
        const res = await fetch(`http://localhost:406/api/cartdetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await res.json();

        if (res.status !== 201) {
            console.log('error occured');
        } else {
            setCartdata(data.carts);
        }
    };

    useEffect(() => {
        // Getting the cart data
        getdatabuy();
    }, []);

    return (
        <>
            {
                cartdata.length ?
                    <div className='buynow_section'>
                        <div className="buynow_container">
                            <div className="left_buy">
                                <h1>Shopping Cart</h1>
                                <p>Select all items</p>
                                <span className='leftbuyprice'>Price</span>
                                <Divider />

                                {
                                    cartdata.map((e, k) => {
                                        return (
                                            <>
                                                <div className="item_containert" key={k}>
                                                    <img src={e.url} alt="imagepicture" />
                                                    <div className="item_details">
                                                        <h3>{e.title.longTitle}</h3>
                                                        <h3>{e.title.shortTitle}</h3>
                                                        <h3 className='diffrentprice'>₹4048.00</h3>
                                                        <p className="unusuall">Usually dispatched in 8 days.</p>
                                                        <p>Eligible for FREE Shipping</p>
                                                        <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                                                        <Option deletedataID={e.id} get={getdatabuy}/>
                                                    </div>
                                                    <h3 className='item_price'>₹{e.price.cost}.00</h3>
                                                </div>
                                                <Divider />

                                            </>
                                        )
                                    })
                                }
                                <Divider />
                                <Subtotal item={cartdata} />
                            </div>
                            <Right item={cartdata}/>
                        </div>
                    </div> : ''
            }
        </>
    )
}

export default Buynow
