import type { FC } from 'react';
import logo from '../assets/images/logo1.png';

const MainLogo: FC = () => {

    return (
        <div className='flex justify-center w-full py-1'>
            <img src={logo} /> 
        </div>
    );
};

export default MainLogo;