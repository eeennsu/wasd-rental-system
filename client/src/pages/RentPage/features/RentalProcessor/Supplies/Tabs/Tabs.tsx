import type { FC } from 'react';
import { getTabName } from '../../../../utils/tables';
import { tabs } from '../../../../constants';
import { useTabsStore } from '../../../../../../zustand/index';
import TabButton from './TabButton';
import CurTabButton from './CurTabButton';

const Tabs: FC = () => {

    const { activeTab } = useTabsStore();

    return (
        <div className='flex mt-4 bg-01'>
            {
                tabs.map((tab, i) => {
                    return i === activeTab ? (
                        <CurTabButton key={tab} idx={i}>
                            {getTabName(tab)}
                        </CurTabButton>
                    ) : (
                        <TabButton key={tab} idx={i}>
                            {getTabName(tab)}
                        </TabButton>
                    )
                })
            }
        </div>
    );
};

export default Tabs;