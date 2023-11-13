import axios from 'axios';
import { useState, useEffect } from 'react'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { encode } from 'js-base64';


function MyAccount() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const username = localStorage.getItem("username");

      if (!username) {
        navigate("/");
      }

      const user = await axios.get(`http://127.0.0.1:8000/user/me/${username}`);
      setUser(user.data);

      const cars = await axios.get(`http://127.0.0.1:8000/cars/${user.data.id}`);
      setCars(cars.data);
    }

    getData();
  }, []);

  const createCar = async (event) => {
		event.preventDefault();
		setErrorMessage("");

		const { mark, model, year, price, fuel, power, mileage } = document.forms[0];
		const data = {
      "author_id": user.id,
      "mark": mark.value,
      "model": model.value,
      "year": year.value,
      "price": price.value,
      "fuel": fuel.value,
      "power": power.value,
      "mileage": mileage.value
    }
		
		await axios.post("http://127.0.0.1:8000/cars", data,
    {
      auth: {
        username: encode(user.username),
        password: encode(user.password)
      }
    })
		.then(response => {
			window.location.reload();
		})
		.catch(error => {
      console.log(error);
			//setErrorMessage(error.response.data.detail);
		});
	}

  const deleteCar = async (event, car_id) => {
    event.preventDefault();

    await axios.delete(
      `http://127.0.0.1:8000/cars/${car_id}`,
      {
        auth: {
          username: encode(user.username),
          password: encode(user.password)
        },
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

        <h2>Написать объявление</h2>
        <div className="form" style={{display: "flex", flexDirection:"column", alignItems: "center", marginBottom: "1%"}}>
          <form onSubmit={(event) => createCar(event)}>
            <div className="input-container">
              <label>mark </label>
              <input type="text" name="mark" required />
            </div>
            <div className="input-container">
              <label>model </label>
              <input type="text" name="model" required />
            </div>
            <div className="input-container">
              <label>year </label>
              <input type="text" name="year" required />
            </div>
            <div className="input-container">
              <label>price </label>
              <input type="text" name="price" required />
            </div>
            <div className="input-container">
              <label>fuel </label>
              <input type="text" name="fuel" required />
            </div>
            <div className="input-container">
              <label>power </label>
              <input type="text" name="power" required />
            </div>
            <div className="input-container">
              <label>mileage </label>
              <input type="text" name="mileage" required />
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
          <div>{errorMessage}</div>
        </div>

        <h2>Мои объявления</h2>
        <div className={cars.length>0 ? 'carlist' : ''}>
          {cars.length > 0?
          cars.map((car, i) => {
            return <Car key={i} car={car} />
          })
          :
          <h3>У вас нет объявлений</h3>
          }
        </div>
      </div>
    </div>
  )
}

export default MyAccount
