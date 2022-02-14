import React from 'react'
import { Card, InputGroup, FormControl } from 'react-bootstrap'
import { getWeather } from '../../apis';

export default function Search() {
    const [search, setSearch] = React.useState('hanoi');
    const [input, setInput] = React.useState('');
    const [data, setData] = React.useState('');
    let flat = true;

    const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
            setSearch(e.target.value);
            setInput('');
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setInput('');
    }

    const handleOnChange = (e) => {
        setInput(e.target.value);
    }

    React.useEffect(() => {
        if (flat) {
            getWeather(search)
                .then((res) => {
                    setData(res.data);
                })
        }

        return () => {
            flat = false;
        }
    }, [search])

    let emoji = null;
    if (typeof data.main != 'undefined') {
        if (data.weather[0].main === 'Clouds') {
            emoji = 'fa-cloud';
        }
        else if (data.weather[0].main === 'Thunderstorm') {
            emoji = 'fa-bolt';
        }
        else if (data.weather[0].main === 'Drizzle') {
            emoji = 'fa-cloud-rain';
        }
        else if (data.weather[0].main === 'Rain') {
            emoji = 'fa-cloud-shower-heavy';
        }
        else if (data.weather[0].main === 'Snow') {
            emoji = 'fa-snow-flake';
        }
        else if (data.weather[0].main === 'Clear') {
            emoji = 'fa-solid fa-cloud-sun';
        }
        else {
            emoji = 'fa-smog'
        }
    }

    //data
    let temp = '';
    let tempMin = '';
    let tempMax = '';
    let weather = '';
    if (typeof data.main != "undefined") {
        temp = (data.main.temp - 273.15).toFixed(0);
        tempMin = (data.main.temp_min - 273.15).toFixed(0);
        tempMax = (data.main.temp_max - 273.15).toFixed(0);
        weather = data.weather[0].main;
    }

    // date 
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default", { month: 'long' });
    let day = d.toLocaleString("default", { weekday: 'long' });

    // time  
    function formartTime(date) {
        if (!date) return '';
        const hour = `0${date.getHours()}`.slice(-2);
        const minute = `0${date.getMinutes()}`.slice(-2)
        const second = `0${date.getSeconds()}`.slice(-2)

        return `${hour}:${minute}:${second}`
    }

    // clock
    const [time, setTime] = React.useState('');
    React.useEffect(() => {
        setInterval(() => {
            let now = new Date();
            const newTimeString = formartTime(now);
            setTime(newTimeString);
        }, 1000);
    }, [])


    return (
        <div>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4 col-xs-4 col-sm-4">
                        <Card className="bg-dark text-white text-center border-0" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                            <Card.Img src={`https://source.unsplash.com/600x900/?${weather}`} alt="Card image" />
                            <Card.ImgOverlay>
                                <form onSubmit={handleOnSubmit}>
                                    <InputGroup className="mb-3 mx-auto">
                                        <FormControl
                                            type="text"
                                            placeholder="Search country..."
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={input}
                                            onKeyPress={handleOnKeyPress}
                                            onChange={handleOnChange}
                                        />
                                        <InputGroup.Text id="basic-addon2">
                                            <i className="fa fa-search"></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-4">
                                    <h2 className="card-title">{data.name}</h2>
                                    <Card.Text>
                                        {day}, {month} {date}, {year}
                                        <br />
                                        {time}
                                    </Card.Text>
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x mt-1`}></i>
                                    <h1 className="mt-1 fw-border mb-5">{temp} &deg;C</h1>
                                    <p className="fw-border mb-0 lead">{weather}</p>
                                    <p className="lead">{tempMin} &deg;C | {tempMax} &deg;C</p>
                                </div>
                            </Card.ImgOverlay>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
