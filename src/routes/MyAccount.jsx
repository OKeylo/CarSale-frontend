import axios from 'axios';
import { useState, useEffect } from 'react'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';


function MyAccount() {
  const navigate = useNavigate()
  const [user, setUser] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      const username = localStorage.getItem("username");

      if (!username) {
        navigate("/");
      }

      const user = await axios.get(`http://127.0.0.1:8000/user/me/${username}`);
      setUser(user.data);

      const cars = await axios.get(`http://127.0.0.1:8000/cars/${user.id}`);
      setCars(cars.data);
    }

    getCars();
  }, []);

  const deleteCar = async (event, car_id) => {
    event.preventDefault();
  
    await axios.delete(
      `http://127.0.0.1:8000/cars/${car_id}`,
      {
        auth: {
          username: user.username,
          password: user.password
        }
      }
    )
    .then(response => {
      setCars(cars.filter((car) => car.id != car_id));
    })
    .catch(error => {
      console.log(error);
    })
  }

  function Car({car}) {
    return (
      <div className='car'>
        <p className='carName'>
          {car.mark} {car.model}, {car.year}
        </p>
        <p style={{fontSize: "20px", fontWeight: "600", marginBottom: "5%"}}>
          {car.price} ₽
        </p>
        <p>Характеристики</p>
        <p>{car.fuel} ({car.power} л.с.)</p>
        <p>{car.mileage} км</p>
        <div style={{display: "flex", justifyContent: "center", marginTop: "5%"}}>
          <button onClick={(event) => deleteCar(event, car.id)} className='remove_car'>Убрать объявление</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h1 style={{fontSize: "32px"}}>Мой профиль</h1>
        <h2>Мои данные</h2>
        <div style={{fontSize: "20px", marginBottom: "1%"}}>
          <p>Имя пользователя: {user.username}</p>
          <p>Номер телефона: {user.phone}</p>
        </div>
        <h2>Мои объявления</h2>
        <div className='carlist'>
          {cars?.map((car, i) => {
            return <Car key={i} car={car} />
          })}
        </div>
      </div>
    </div>
  )
}

export default MyAccount
