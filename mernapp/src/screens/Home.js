import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'


export default function Home() {

  const [search,setSearch]=useState('');
  const [foodCat,setFoodCat]=useState([])
  const [foodItem,setFoodItem]=useState([])

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      // Ensure response[0] and response[1] are valid arrays
      setFoodItem(Array.isArray(data[0]) ? data[0] : []);
      setFoodCat(Array.isArray(data[1]) ? data[1] : []);
    } catch (error) {
      console.error("Failed to load data:", error);
      setFoodItem([]);
      setFoodCat([]);
    }
  };
  

  useEffect(()=>{
    loadData()
  },[])








  return (
    <div>
        <div><Navbar/></div>
        <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !imporatant"}}>
    <div className="carousel-inner" id="carousel">
        <div className='carousel-caption' style={{zIndex:"10"}}>
        <div className="d-flex justify-content-center">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" values={search} onChange={(e)=>{setSearch(e.target.value)}}/>
    {/* <button className="btn btn-outline-success text-white bg-success m-3 my-2 my-sm-0" type="submit">Search</button> */}
  </div>
        </div>
      <div className="carousel-item active">
        <img id="img1" src="https://tse1.mm.bing.net/th?id=OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8&pid=Api&P=0&h=180" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
      </div>
      <div className="carousel-item">
        <img id="img1" src="https://tse2.mm.bing.net/th?id=OIP.Jd-H-LHiVSkNBlLR65nuVwHaEK&pid=Api&P=0&h=180" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://sp.yimg.com/ib/th?&id=ODL.30953ba33f8d5d33cfd638bc58dbba2b&w=200&h=107&c=4&dpr=2&rs=1" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
        </div>
        <div className="container">
  {foodCat.length > 0 ? (
    foodCat.map((data) => (
      <div key={data._id} className="row mb-3">
        <div className="fs-3 m-3">{data.CategoryName}</div>
        <hr />
        {foodItem.length > 0 ? (
          foodItem
            .filter(
              (item) =>
                item.CategoryName === data.CategoryName &&
                item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((filterItems) => (
              <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                <Card
                  foodItem={filterItems}
                  options={filterItems.options[0]}
                />
              </div>
            ))
        ) : (
          <div>No such data found</div>
        )}
      </div>
    ))
  ) : (
    <div>Loading categories...</div>
  )}
</div>

        <div><Footer/></div>
    </div>
  )
}
