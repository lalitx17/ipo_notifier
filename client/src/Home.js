import {useState} from 'react';
import axios from 'axios';
import Sub from './Sub';
import { redirect } from 'react-router-dom';



function Home() {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData, 
      [event.target.name]: event.target.value,
    })
    console.log(formData);
  }; 

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/submit-form', formData)
    .then((response) =>{
      if (response.data === 'yes'){
        confirm();
      }
    })
    .catch((error) =>{
      console.log(error);
    })
  }


  return (
    <>
      {/* Navbar */}
      <nav className="relative container mx-auto py-12 px-4 ">
        <div className="flex items-center justify-between">
          <div className="md:ml-[12em]">
            <img
              src="images/logo_ipo.png"
              width="300em"
              height="10em"
              alt="logo"
            />
          </div>
        </div>
      </nav>

      {/* HomeScreen */}

      <section id="hero">
        <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-12 md:w-2/5 md:justify-between md:ml-[11.5em]">
            <h1 className="max-w-md text-4xl font-bold font-primary text-center md:text-5xl md:text-left ">
              We monitor the <br /> <span className="text-primary">IPOs</span> ,
              you reap the rewards!
            </h1>
            <p className="max-w-sm text-center font-primary font-[400] md:text-left">
              Get IPO alerts via Email. No need to check Meroshare all the time.
            </p>
            <div className="flex justify-center md:justify-start">
              <a
                href="#CTA"
                className="p-3 px-6 pt-2 text-black bg-secondary hover:bg-[#FFCF1A] rounded-lg w-60 text-center font-primary font-[400] "
              >
                Get Started
              </a>
            </div>
          </div>

          <div className="md:w-1/2">
            <img
              src="images/growth_ipo.png"
              width="500em"
              height="1500em"
              alt="illustration"
            />
          </div>
        </div>
      </section>


      {/*  call to action */}
      <section>
        <div className="bg-heroPattern bg-cover h-full pt-[140px] pb-[50px] md:pt-[280px] bg-no-repeat mt-[5em] md:mt-0">
          <div className="flex flex-col justify-center items-center" id="CTA">
            <div className="text-4xl font-complementry text-white font-bold border-b-4 border-secondary">
              GET NOTIFIED
            </div>

            <div className="w-full max-w-[25em] mt-12">
              <form
                className="px-8 pt-6 pb-8 mb-4 space-y-8 font-secondary"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label className="block text-white text-sm mb-2" htmlFor="firstname">
                    First Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter your first name"
                    name="FNAME"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-white text-sm mb-2" htmlFor="lastname">
                    Last Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter your last name"
                    name="LNAME"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-white text-sm mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="email"
                    placeholder="Enter your email address"
                    name="EMAIL"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center justify-between">
            
                 <button
                    className="bg-secondary hover:bg-[#FFCF1A] mt-6 rounded-lg mx-auto w-full text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Join In
                  </button>
               
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>



      {/* JIBE */}
      <section></section>

      <section id="hero">
        <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-12 md:w-2/5 md:justify-between md:ml-[11.5em]">
            <h1 className="max-w-md text-3xl font-bold font-primary text-center md:text-5xl md:text-left ">
              Services
            </h1>

            <div className="flex flex-row space-x-5">
              <img src="images/tick.svg" width={30} height={30} alt="tick" />
              <p className="max-w-sm text-2xl text-center font-primary font-[500] md:text-left">
                Notification of the latest IPO.
              </p>
            </div>

            <div className="flex flex-row space-x-5">
              <img src="images/tick.svg" width={30} height={30} alt="tick" />
              <p className="max-w-sm  text-2xl text-center font-primary font-[500] md:text-left">
                Regular emails in the interval of three days.
              </p>
            </div>

            <div className="flex flex-row space-x-5">
              <img src="images/cross.svg" width={33} height={33} alt="cross" />
              <p className="max-w-sm text-2xl text-center font-primary font-[500] md:text-left">
                Good Luck for IPO allotment.
              </p>
            </div>
          </div>

          <div className="md:w-1/2">
            <img
              src="images/ipoStocks.png"
              width="500em"
              height="1500em"
              alt="IPO stocks"
            />
          </div>
        </div>
      </section>

      {/* footer */}

      <footer className="mt-[4em] md:mt-0">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="/"
              className="flex items-center justify-center md:justify-start mb-4 sm:mb-0"
            >
              <img
                src="images/logo_ipo.png"
                className="md:ml-[12em] h-6 md:h-8 mr-3"
                alt="Logo"
              />
            </a>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-center text-sm text-gray-500 dark:text-gray-400">
            © 2023 IPO Notifer™ . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

function confirm(){
    return(
        <>
            <redirect to='/sub' />
        </>
    )
}

export default Home;
