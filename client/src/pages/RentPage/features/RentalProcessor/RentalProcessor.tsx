import type { FC } from 'react';
import Search from './Search/Search';
import Supplies from './Supplies/Supplies';
import { useSuppliesStore } from '../../../../zustand';
import { useEffect } from 'react';
import useFetchAllSupplies from '../../../../hooks/test/useFetchAllSupplies';
import Template from '../Step/templates/Template';

const RentalProcessor: FC = () => {

    const { VRsData, setVRsData, tabletsData, setTabletsData, lectureRoomsData, setLectureRoomsData } = useSuppliesStore();
    const results = useFetchAllSupplies();
    const isAnyoneLoading = results.some(result => result.isLoading);

    useEffect(() => {
        if (!isAnyoneLoading) {
            const tools = results[0].data?.data;
            const lectureRooms = results[1].data?.data;

            if (tools && lectureRooms) {   
                setVRsData(tools?.filter((tool) => tool.tool_division === 'VR'));
                setTabletsData(tools?.filter((tool) => tool.tool_division === 'TABLET'));
                setLectureRoomsData(lectureRooms);
            }
        }      
    }, [isAnyoneLoading]);

    // useEffect(() => {
    //     console.log('VRsData', VRsData);
    //     console.log('tabletsData', tabletsData);
    //     console.log('lectureRoomsData', lectureRoomsData);
    // }, [VRsData, tabletsData, lectureRoomsData]);

    return (
        <Template className='-space-y-16'>
            <section className='flex justify-end'>
                <Search />
            </section>          
            <section className='w-full '>
                <Supplies isAnyoneLoading={isAnyoneLoading} />
            </section>        
        </Template>
    );
};

export default RentalProcessor;