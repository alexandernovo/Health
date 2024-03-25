import React from 'react'
import doctor from '@images/backround-avatar.png'

const Login: React.FC = () => {
    return (
        <div className='flex flex-1 flex-wrap pb-[60px] md:pb-[0px] lg:pb-[0px] lg:flex-nowrap md:flex-nowrap bg-[#219EBC]'>
            <div className='md:w-1/2 lg-1/2 w-full px-[40px] md:h-full lg:h-full mt-3 lg:mt-0 md:mt-0 flex items-center justiy-center'>
                <div>
                    <h2 className='text-[15px] md:text-[45px] lg:text-[45px] text-center font-bold text-white tracking-wider'>ALIGTOS BARANGAY HEALTH STATION AND BIRTHING CLINIC MANAGEMENT SYSTEM</h2>
                </div>
            </div>
            <div className='md:w-1/2 lg-1/2 w-full px-5 h-full'>
                <div className='w-full flex flex-col items-center mt-5'>
                    <div className='md:w-1/2 lg:w-1/2'>
                        <img src={doctor} className='md:w-[200px] md:h-[220px] lg:w-[200px] lg:h-[220px] mx-auto bg-blend-normal' />
                        <p className='font-semibold text-[20px] mb-2 text-white tracking-wide'>LOGIN HERE</p>
                        <label className="input input-bordered flex items-center mb-3 w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input type="text" className="grow" placeholder="Username" />
                        </label>
                        <label className="input input-bordered flex items-center w-full mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 mr-1"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" placeholder='Password' />
                        </label>
                        <button className="btn btn-active btn-primary w-full">LOGIN</button>
                        <p className='text-[14px] text-center mt-1 text-white'>Don't have account? <a className='text-white'>Register Here</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
