import React from 'react';
import BookingForm from './components/bookingform';


const style = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold', 

  },
  image: {
    height: '50px',
    marginRight: '10px',
  },
}

function App() {
  
  return (
    <div>
      <div style={style.headerContainer}>
        <img src="https://storage.googleapis.com/mixo-files/logos/1698925507587-cabRide-9o1z.svg" style={style.image} alt="CabRide" />
        <div>CabRide</div>
      </div>
      <h1 style={style.mainContainer}>Cab Booking System</h1>
      <div style={style.mainContainer}>
        <BookingForm />
      </div>
    </div>
  );
}

export default App;
