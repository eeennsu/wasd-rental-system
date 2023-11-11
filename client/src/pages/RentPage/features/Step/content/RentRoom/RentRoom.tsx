import type { FC } from 'react';
import { useStepStore } from '../../../../../../zustand';
import Schedule from '../dates/Schedule';
import RoomList from './RoomList';
import RentalRoomForm from './RentalRoomForm';
import Template from '../../templates/Template';
import DescRoomButtons from './DescRoomStepButtons';
import RentRoomButtons from './RentRoomStepButtons';

const RentRoom: FC = () => {

    const { systemStep } = useStepStore();

    return (
        <Template className='h-full mb-5 3xl:mb-0'>
            <Schedule />
            <div className='h-[348px]'>
                {
                    systemStep === 'LR_DESC' ? (
                        <RoomList />
                    ) : systemStep === 'LR_RENT' ? (
                        <RentalRoomForm />
                    ) : null
                }   
            </div>      
            {
                systemStep === 'LR_DESC' ? (
                    <DescRoomButtons />
                ) : systemStep === 'LR_RENT' ? (
                    <RentRoomButtons />
                ) : null
            }                          
        </Template>
    );
};

export default RentRoom;