import React from 'react'

export default function Carousel() {
  return (
    <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !imporatant"}}>
    <div className="carousel-inner" id="carousel">
        <div className='carousel-caption' style={{zIndex:"10"}}>
        <form className="d-flex">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button className="btn btn-outline-success text-white bg-success m-3 my-2 my-sm-0" type="submit">Search</button>
  </form>
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
  </div></div>
  )
}
