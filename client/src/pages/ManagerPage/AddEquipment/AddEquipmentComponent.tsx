import { Modal } from 'antd';
import React, { FC, useState } from 'react';
import AddModal from './AddModal';

const AddEquipmentComponent: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    return(
        <div>
           
          <div className='w-[400px] h-[117px] bg-01 rounded-md absolute top-[900px] ml-[-1300px] '>
            <div onClick={openModal} className='mt-[30px] ml-[110px] text-[36px] text-04 font-bold cursor-pointer'>
                기자재 추가

                
            </div>
      {isModalOpen && (
        <AddModal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
            </div>
        </div>
    );

};

export default AddEquipmentComponent;