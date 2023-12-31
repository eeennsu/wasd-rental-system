import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTabsStore } from '../../../zustand';

const Button_o: FC = () => {

    const setActiveTab = useTabsStore(state => state.setActiveTab);

    const handleToolTab = () => {
      setActiveTab(1);
    }
    
    const handleClassRoomTab = () => {
      setActiveTab(3);
    }

    return (
      <div className='w-full'>
        <div className='max-w-4xl mx-auto mt-14'> 
          <div className='flex items-center justify-center gap-10'>
            <div className='justify-center gap-10 py-4 text-xl font-bold px-28 bg-02'>
              <Link to = {'/rental'} onClick={handleToolTab}>
              기자재 대여 바로 가기 &gt;
              </Link>
            </div>
            <div className='justify-center gap-10 py-4 text-xl font-bold px-28 bg-02'>
              <Link to = {'/rental'} onClick={handleClassRoomTab}>
                강의실 대여 바로 가기 &gt;
              </Link>
            </div>
          </div>            
        </div>           
      </div>
    );
};

export default Button_o;