import type { FC } from 'react';
import { useState } from 'react';


interface TooltipProps {
  
  showTooltip: boolean;
  toggleTooltip: () => void;
}
const TooltipComponent: FC<TooltipProps> = ({ showTooltip, toggleTooltip }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleOnClick = () => {
    toggleTooltip();
    setIsClicked(!isClicked);
  };


  const test = [
    {id: 1, 학번: '2021001', 이름: '홍길동', 기자재: 'vr'},
    // {id: 2, 학번: '2021001', 이름: '김소연', 기자재: '타블렛'},
    // {id: 3, 학번: '2021001', 이름: 'ㅁㅁㅁ', 기자재: '강의실'},
    // {id: 4, 학번: '2021001', 이름: 'ㅇㅇㅇ', 기자재: 'vr'},
    // {id: 5, 학번: '2021001', 이름: 'ㅇㄱㄱ', 기자재: '강의실'},
    // {id: 6, 학번: '2021001', 이름: 'ㅎㅎㅎ', 기자재: '타블렛'},

  ]

  // 이름과 기자재 정보만을 가지는 배열 생성
const tooltipData = test.map(({ id,이름, 기자재 }) => ({ id, 이름, 기자재 }));

  return (

    <div>

   
    <div className="w-[400px] h-[560px] space-y-4  rounded-8 bg-02 p-4 pl-10 rounded-b-lg relative">
      <div
        className={`w-80 h-11 top-91 bg-03 rounded-md text-[18px] p-1 ${isClicked ? 'bg-01' : ''}`}
        onClick={handleOnClick}
      >
        기자재 대여 목록
      </div>
      {showTooltip && (
        <div className="w-[180px] h-[76px] absolute top-[-50px] left-[300px] z-[99] p-4 bg-gray-200 rounded shadow-md text-sm">
         {tooltipData.map(({id, 이름, 기자재}) =>(
          <div key={id}>
            <p>기자재 이름: {이름}</p>
            <p>대여자 정보: {기자재}</p>
             </div>
         )
         )}
        </div>
      )}
      
    </div>
    </div>

    
    
  );
};

export default TooltipComponent;




