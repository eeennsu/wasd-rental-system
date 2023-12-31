import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../zustand';

const SampleNav: FC = () => {

    const id = useUserStore(state => state.user?.user_id);

    return (
        <ul className='grid min-h-screen space-y-6 text-center place-content-center'>
            <li className='underline'>
                <Link to='/main'>
                    메인 페이지
                </Link>
            </li>
            <li className='underline'>
                <Link to='/rental'>
                    대여 페이지
                </Link>
            </li>
            <li className='underline'>
                <Link to={`/my-page/${id}`}>
                    마이 페이지
                </Link>
            </li>
            <li className='underline'>
                <Link to='/manager'>
                    관리자 페이지
                </Link>
            </li>
            <li className='underline'>
                <Link to='/example'>
                    메인 페이지 예시
                </Link>
            </li>
            <li className='underline'>
                <Link to='/sampleLogin'>
                    임시 로그인
                </Link>
            </li>
        </ul>
    );
}

export default SampleNav;