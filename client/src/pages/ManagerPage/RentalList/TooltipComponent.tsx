import type { FC } from 'react';
import { useState } from 'react';


interface TooltipProps {
  showTooltip: boolean;
  toggleTooltip: () => void;
}
const TooltipComponent: FC<TooltipProps> = ({ showTooltip, toggleTooltip }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleOnClick = () => {
    // 툴팁을 토글하고 클릭 상태를 변경
    toggleTooltip();
    setIsClicked(!isClicked);
  };

  return (
    <div className="w-[400px] h-[560px] top-416 rounded-8 bg-02 p-4 pl-10 rounded-b-lg relative">
      <div
        className={`w-80 h-11 top-91 bg-03 rounded-md text-sm p-2.5 ${isClicked ? 'bg-01' : ''}`}
        onClick={handleOnClick}
      >
        기자재 대여 목록1
      </div>
      {showTooltip && (
        <div className="w-[180px] h-[76px] absolute top-[-50px] left-[300px] z-[99] p-4 bg-gray-200 rounded shadow-md text-sm">
          <p>기자재 이름: 김소연</p>
          <p>대여자 정보: 타블렛</p>
        </div>
      )}
    </div>
  );
};

export default TooltipComponent;





