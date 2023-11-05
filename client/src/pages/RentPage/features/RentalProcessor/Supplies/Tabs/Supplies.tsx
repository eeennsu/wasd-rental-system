import type { FC } from 'react';



import Table from '../Table/Table'
import Loading from '../../../../../../components/Loading';
import Pagination from '../../Pagination/Pagination';
import Tabs from './Tabs';

type Props = {
    isAnyoneLoading: boolean;
}

const Supplies: FC<Props> = ({ isAnyoneLoading }) => {

    return (
        <div className='flex flex-col h-full'>
            <Tabs />
            <div className='border-t-[1px] border-black p-4 h-full'>
                {
                    isAnyoneLoading ? (
                        <Loading />
                    ) : (
                        <Table /> 
                    )
                }                
            </div>     
            <div className='flex justify-center w-full'>                
                <Pagination />
            </div>      
        </div>
    );
};

export default Supplies;