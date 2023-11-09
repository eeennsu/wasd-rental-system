import type { FC } from 'react';
import Table from './Table/Table'
import Loading from '../../../../../components/Loading';
import Pagination from '../Pagination/Pagination';
import Tabs from './Tabs/Tabs';

type Props = {
    isAnyoneLoading: boolean;
}

const Supplies: FC<Props> = ({ isAnyoneLoading }) => {

    return (
        <div className=''>
            <div className='flex flex-col min-h-[550px] gap-7'>
                <Tabs />
                {
                    isAnyoneLoading ? (
                        <Loading />
                    ) : (
                        <Table /> 
                    )
                }         
            </div>
            <div className='flex justify-center w-full my-12'>                
                <Pagination />            
            </div>   
        </div> 
    );
};

export default Supplies;