import type { FC } from 'react';
import { useModalStore, useTabsStore } from '../../../../../../zustand';
import { initModalStep } from '../../../../utils/modal';
import { getToolsAvailability } from '../../../../utils/tables';
import { memo } from 'react';
import TrTemplate from './TrTemplate';

type Props = {
    toolData: Tool;
}

const ToolTr: FC<Props> = ({ toolData }) => {

    const { activeTab } = useTabsStore();
    const { setIsModalOpen, setDetailTool, setModalStep } = useModalStore();

    const handleClick = () => {
        initModalStep(activeTab, setModalStep);

        setDetailTool(toolData);

        setIsModalOpen(true);
    }

    return (
        <TrTemplate onClick={handleClick}>
            <td>
                {toolData.tool_code}
            </td>
            <td className='flex gap-1 mx-1'>               
                <span>
                    /
                </span>
                {toolData.tool_name}             
                <span>
                    /
                </span>                   
            </td>
            <td>
                {getToolsAvailability(toolData)}
            </td>
        </TrTemplate>
    );
};

export default memo(ToolTr);