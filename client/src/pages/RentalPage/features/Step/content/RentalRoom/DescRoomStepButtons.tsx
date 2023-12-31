import type { FC } from 'react';
import { useStepStore } from '../../../../../../zustand';
import { shallow } from 'zustand/shallow';
import Button from '../../../../../../components/Button';

const DescRoomButtons: FC = () => {

    const { setSystemStep, selectedRoom, setSelectedRoom } = useStepStore(state => ({
        setSystemStep: state.setSystemStep,
        selectedRoom: state.selectedRoom,
        setSelectedRoom: state.setSelectedRoom
    }), shallow);

    const handleInitStep = () => {
        setSystemStep('INIT');
        selectedRoom && setSelectedRoom(null);
    }

    const handleRentStep = () => {
        setSystemStep('CLASSROOM_RENT');
    } 

    return (
        <footer className='flex justify-center gap-3 p-1 md:p-4 md:justify-end'>
            <Button onClick={handleInitStep} bgColor='02'>
                돌아가기
            </Button> 
            <Button onClick={handleRentStep} bgColor='01' disabled={!Boolean(selectedRoom)}>
                대여 하기
            </Button>           
        </footer>
    );
}

export default DescRoomButtons;