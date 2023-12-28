import type { FC } from 'react';
import Button_o from './Mainelement/Button_o';
import Openchat from './Mainelement/Openchat';
import Rentlist from './Mainelement/Rentlist';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import MainLogo from '../../components/MainLogo';
import Personal from './SignUp/Personal';
import Info from './Mainelement/Info';

const MainPage: FC = () => {

    return (
        <div className='w-full'>
          <MainLogo />
          <div className='fixed w-full top-28 bg-03 h-2/5'>       
            <Button_o/>
            <Openchat/>
            <Rentlist/>
            <Info/>
            <div>
            <Button bgColor='02'>
              <Link to = {'/main/sign-up'}>
                회원가입 &gt;
              </Link>
            </Button>
          </div>
        </div>
      </div>     
    );
};

export default MainPage;