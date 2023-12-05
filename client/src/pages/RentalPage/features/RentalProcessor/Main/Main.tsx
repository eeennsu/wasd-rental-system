import type { FC } from 'react';
import ToolPagination from '../Pagination/ToolPagination';
import Tabs from './Tabs/Tabs';
import Datas from './Datas/Datas';

const Main: FC = () => {

    return (
        <>
            <div className='flex flex-col min-h-[520px] 3xl:min-h-[526px] gap-7 '>
                <Tabs />
                <Datas />    
            </div>
            <div className='flex justify-center w-full my-6'>                
                <ToolPagination />            
            </div>   
        </> 
    );
};

export default Main;