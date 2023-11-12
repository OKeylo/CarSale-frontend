import axios from 'axios';
import { useState, useEffect } from 'react'
import './Home.css'
function Car({car}) {
    return (
        <div className='car'>
            <p className='carName'>
                {car.mark} {car.model}, {car.year}
            </p>
            <p style={{fontSize: "20px"}}>
                {car.price} ₽
            </p>
            <p style={{fontSize: "16px"}}>
                {car.fuel} ({car.power} л.с.)
            </p>
        </div>
    )
}

function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getCars = async () => {
        const cars = await axios.get("http://127.0.0.1:8000/cars");
        setCars(cars.data);
        console.log(cars.data);
    }

    getCars();
  }, []);

  return (
    <>
      <h2>Продажа автомобилей</h2>
      <div className='carlist'>
        {cars?.map((car, i) => {
            return <Car key={i} car={car} />
        })}
      </div>
    </>
  )
}

export default Home
