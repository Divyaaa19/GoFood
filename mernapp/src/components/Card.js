import React , {useState ,useEffect, useRef} from "react";
import { useDispatchCart,useCart } from "./ContextReducer";
export default function Card(props) {
  let dispatch =useDispatchCart();
  let data =useCart();
  const priceRef= useRef();
  let options= props.options;
  let priceOptions= Object.keys(options);
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("")

  const handleAddToCart = async () => {
    let food = data.find(item => item.id === props.foodItem._id);
  
    if (food) {
      if (food.size === size) {
        // Update the item if the size is the same
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
      } else {
        // If the size is different, add a new item
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
      }
    } else {
      // If no matching food item found, add it as a new item
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };
  
  let finalPrice= qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  })

  return (
    <div>
      <div>
        <div
          className="card mt-3 "
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            className="card-img-top"
            src={props.foodItem.img}
            alt="Card image cap"
            style={{height:"120px", objectFit:"fill"}}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select
                className="m-2 h-100  rounded "
                style={{ backgroundColor: "purple" }}
                onChange={(e)=>setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select
                className="m-2 h-100  rounded " ref={priceRef}
                style={{ backgroundColor: "purple" }}
                onChange={(e)=>setSize(e.target.value)}
              >
                {priceOptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
          </div>
          <hr/>
          <button className={"btn btn-sm btn-success w-auto px-2 py-2 m-2"} onClick={handleAddToCart}> Add to Cart</button>
          
        </div>
      </div>
    </div>
  );
}
