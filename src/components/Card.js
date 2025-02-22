import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
    let dispatch = useDispatchCart();
    let options = props.options;
    let data = useCart();
    const priceRef = useRef();
    let priceOptions = Object.keys(options)
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(Object.keys(props.foodItem.options[0])[0]);
    const [finalPrice, setFinalPrice] = useState(parseInt(props.foodItem.options[0][Object.keys(props.foodItem.options[0])[0]]));
    // console.log(priceOptions);

    const handleAddToCart = async () => {
        let food=[];
        console.log(food.length);
        for(const item of data){
            if(item.id===props.foodItem._id){
                food=item;
                break;
            }
        }
        if(food !=[]){
            if(food.size === size){
                await dispatch({type:"UPDATE",id:props.foodItem._id,price: finalPrice,qty:qty})
                return
            }
            else if(food.size!=size){
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return
                // await console.log(data);
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        // await console.log(data);
    }
    const handleQtyChange = (newQty) => {
        setQty(newQty);
    }

    const handleSizeChange = (newSize) => {
        setSize(newSize);
    }
    useEffect(() => {
        const price = parseInt(props.foodItem.options[0][size]);
        setFinalPrice(qty * price);
    }, [qty, size, props.foodItem.options]);

    // let finalPrice=qty*parseInt(options[size]);
    // useEffect(()=>{
    //     setSize(priceRef.current.value)
    // },[])

    return (
        <div>
            <div>
                <div className="card mt-4" style={{ "width": "18rem", "maxHeight": "400px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' value={qty} onChange={(e) => handleQtyChange(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded' value={size} onChange={(e) => handleSizeChange(e.target.value)}>
                                {Object.keys(props.foodItem.options[0]).map((data) => {
                                    return (<option key={data} value={data}>{data}</option>);
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'> Rs.{finalPrice}/- </div>
                        </div>
                        <hr />
                        <button className={`btn btn-success justify-centre ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
