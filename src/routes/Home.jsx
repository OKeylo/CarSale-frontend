import axios from 'axios';
import { useState, useEffect } from 'react'
import Header from '../components/Header';
import Phone from '../assets/phone.png';
import User from '../assets/user.png';

function Car({car}) {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async (id) => {
      const user = await axios.get(`http://127.0.0.1:8000/user/${id}`);
      return user.data;
    };

    getUser(car.author_id)
    .then(user => {
      setUser(user);
    })
    .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className='car'>
      <p className='carName'>
        {car.mark} {car.model}, {car.year}
      </p>
      <p style={{fontSize: "20px", fontWeight: "600", marginBottom: "5%"}}>
        {car.price} ₽
      </p>
      <div style={{marginBottom: "5%"}}>
        <p style={{fontWeight: "600"}}>Характеристики</p>
        <p>{car.fuel} ({car.power} л.с.)</p>
        <p>{car.mileage} км</p>
      </div>
      {user?
        <div style={{display: "flex", flexDirection:"column"}}>
          <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
            <img src={User} style={{height: "20px"}} alt='phone' />
            <p>{user?.username}</p>
          </div>
          <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
            <img src={Phone} style={{height: "20px"}} alt='phone' />
            <p>{user?.phone}</p>
          </div>
          
        </div>
        :
        <></>
      }
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
    <div>
      <Header />
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h2>Продажа автомобилей</h2>
        <div className='carlist'>
          {cars?.map((car, i) => {
              return <Car key={i} car={car} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
