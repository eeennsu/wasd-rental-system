import type { FC, PropsWithChildren } from 'react';
import { useSearchStore, useSuppliesStore, useTabsStore } from '../../../../../../zustand';
import useModalStore from '../../../../../../zustand/suppliesStore/useStepStore';

type Props = {
    idx: number;
}

const CurTabButton: FC<PropsWithChildren<Props>> = ({ children, idx }) => {

    const { setActiveTab } = useTabsStore();
    const { setSearchTerm } = useSearchStore();
    const { resetAllDatas, resetPaginatedDatas } = useSuppliesStore();
    const { setSystemStep } = useModalStore();

    const handleSetActiveTab = () => {
        setSearchTerm('');
        // resetAllDatas();
        // resetPaginatedDatas();
       //  initModalStep(idx as ActiveTab, setSystemStep);
        setActiveTab(idx as ActiveTab);   
    }

    return (
        <div className='relative'>
            <button className='absolute -top-9 w-[132px] h-9 trapezoid' onClick={handleSetActiveTab}>
                <span className='flex items-center justify-center mt-2 text-sm font-semibold text-white'>
                    {children}
                </span>
            </button>
            <div className='w-[132px]'>
                
            </div>
        </div>
        // <button className='w-[132px] text-sm font-bold text-white bg-01' onClick={handleSetActiveTab}>
        //     {children}
        // </button>
    );
};

export default CurTabButton;