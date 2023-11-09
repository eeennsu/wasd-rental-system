import type { FC } from 'react';
import { Modal as AntdModal } from 'antd';
import { useModalStore, useTabsStore } from '../../../../zustand';

import DescTool from './content/DescTool';

const Modal: FC = () => {

    const { activeTab } = useTabsStore();
    const { 
        isModalOpen, setIsModalOpen,
        isProcessLoading,
        systemStep, setSystemStep, 
        setText
    } = useModalStore();

    const handleModalClose = () => {        
        if (isProcessLoading) return;

        // handleInit(setSystemStep, setText); 필x

        setIsModalOpen(false);      
    }

    return (
        <AntdModal        
            centered            
            open={isModalOpen}
            onCancel={handleModalClose} 
            width={800}
            footer={null}
        >
            <DescTool />
        </AntdModal>
    );
};

export default Modal;