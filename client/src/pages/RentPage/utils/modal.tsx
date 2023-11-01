import DescLR from "../features/Modal/Content/DescLR";
import DetailSupply from "../features/Modal/Content/DescSupply"
import RentLR from "../features/Modal/Content/RentLR";
import RentSupply from "../features/Modal/Content/RentSupply";
import RepairSupply from "../features/Modal/Content/RepairSupply";
import MFDescLR from '../features/Modal/Footer/MFDescLR';
import MFDescSupply from '../features/Modal/Footer/MFDescSupply';
import MFRentSupply from '../features/Modal/Footer/MFRentSupply';
import MFRepairSupply from '../features/Modal/Footer/MFRepairSupply';

export const getModalContent = (step: ModalStep) => {
    switch (step) {
        case 'SUPPLY_DESC':
            return <DetailSupply />

        case 'SUPPLY_RENT':
            return <RentSupply />
        
        case 'SUPPLY_REPAIR':
            return <RepairSupply />

        case 'LR_DESC': 
            return <DescLR />

        case 'LR_RENT':
            return <RentLR />

        default: throw new Error(`Unknown step value : ${step}`);
    } 
}   

export const getModalFooter = (step: ModalStep) => {
    switch(step) {
        case 'SUPPLY_DESC':
            return <MFDescSupply />

        case 'SUPPLY_RENT':
            return <MFRentSupply />
        
        case 'SUPPLY_REPAIR':
            return <MFRepairSupply />

        case 'LR_DESC': 
            return null;

        case 'LR_RENT':
            return <MFDescLR />

        default: throw new Error(`Unknown step value : ${step}`);
    }
}

export const initModalStep = (activeTab: ActiveTab, setModalStep: (step: ModalStep) => void) => {
    switch(activeTab) {
        case 0:
        case 1:
            setModalStep('SUPPLY_DESC');
            break;
        
        case 2:
            setModalStep('LR_DESC');
            break;

        default: throw new Error(`Unknown activeTab value : ${activeTab}`);
    }
}