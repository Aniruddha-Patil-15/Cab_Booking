import React, { useState } from 'react';
import './bookingform.css';

function BookingForm() {
    const [email, setEmail] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [cabs, setCabs] = useState([]);
    const [selectedCab, setSelectedCab] = useState(null);
    const [getShortestRoute, setShortestRoute] = useState('');
    const [popup, setPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleBooking = async (vehicle) => {

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cab/bookCab`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email : email, source, destination, vehicleNumber: vehicle, timeTaken: getShortestRoute.totalTime }),
            });

            if (response.ok) {
                console.log('Booking successful.');
                alert("Booking successful!");
            } else {
                console.error('Booking failed.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const openPopup = (e) => {
        const vehicle = e.target.className.split(' ')[1];
        setSelectedCab(vehicle);
        setPopup(true);
    }
    const closePopup = () => {
        handleBooking(selectedCab);
        setPopup(false);
    }


    const handleSearchCabs = async () => {
        if (!source || !destination) {
            alert('Source and destination are required.');
            return;
        }
    
        const validSources = ['A', 'B', 'C', 'D', 'E', 'F'];
        if (!validSources.includes(source) || !validSources.includes(destination)) {
            alert('Source and destination must be in the range A to F.');
            return;
        }
        setLoading(true);
        try {
                const routeResponse = await fetch(
                    `${process.env.REACT_APP_API_BASE_URL}/cab/getShortestRoute?src=${source}&dst=${destination}`
                );
                const routeData = await routeResponse.json();
                setShortestRoute(routeData.shortestRoute);
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cab/getAllCabStatus`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setCabs(data.CabStatus);
                } else {
                    alert('Please provide valid source and destination.');
                    return;
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        setLoading(false);   
    };
    
    
    return (
        <>        
        {popup ? <div className="popup">
            <div className="popup_inner">
                <label htmlFor="email">Enter your email to complete booking:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <button onClick={closePopup}>Confirm booking</button>
                <button onClick={() => {setPopup(false)}}>Go back</button>
            </div>
        </div> : <>
        <div className="booking-form">
            <h2>Book a Cab</h2>
            <label htmlFor="source">Source:</label>
            <input
                type="text"
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Source"
            />
            <label htmlFor="destination">Destination:</label>
            <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
            />
            <button onClick={handleSearchCabs}>Search for Cabs</button>
            
        </div>
        <hr/>
        <hr/>
        <h3 style={{textAlign: "center"}}>Available Cabs</h3>
         <div className='cab-box'>
                {loading ? <div className='loading'><p>Loading...</p></div> : <>
                {cabs.length > 0 && (
                    <>
                            {cabs.map((cab, index) => (
                                <button className='cab-button' key={index + 1} onClick={openPopup}>
                                    <div className={`cab-container ${cab.vehicleNumber}`}>
                                        <h3>Cab Name: {cab?.name}</h3>
                                        <h3>Vehicle Number: {cab?.vehicleNumber}</h3>
                                        <p>Price per minute: {cab?.rate}</p>
                                        <p>Time: {getShortestRoute.totalTime}</p>
                                        <p>Total price: {getShortestRoute.totalTime * cab.rate}</p>
                                    </div>
                                </button>
                            ))}
                    </>
                )}
                </> }
         </div>
         </>}
         </>
    );        
}

export default BookingForm;
