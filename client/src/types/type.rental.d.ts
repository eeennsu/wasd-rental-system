type RoomStatus = 'DISABLED' | 'SELECTABLE';
type SelectStatus = 'NONE' | 'FIRST_SELECT' | 'LAST_SELECT';
type RentalState = '대여' | '미반납' | '반납';

type ExistCurRental = {
    D_day: string;
    result: RentalInfo
}

type ClassroomRentalInfo = {
    rental_date: string;
    rental_due_date: string;
    rental_extend: boolean;
    rental_id: number;
    rental_state: string;
    tool_id: ClassRoomName;
    user: {
        user_name: string;
    }
    user_id: string;
}

interface ViewTool extends Tool{
    rentals: Array<{ user_id: string }>;
}

interface RentalInfo {
    rental_id: number;
    rental_date: string;
    rental_due_date: string;
    rental_state: RentalState;
    rental_extend: false;
    user_id: string;
    tool_id: string;
    tool: {
        tool_content: string;   // 오큘러스 퀘스트2 7번 기기
        tool_state: ToolState;     // 대여중
        tool_name: ToolName;      // "VR 실습기기"
    }
}

interface RentalTool {
    tool_id: string;
    user_id: string;
    rental_reason: string;
    department_id: string;
}

interface ResRentalTool {
    '200': OK;
    result?: string;
    err?: string;   
}

interface ReturnTool {
    tool_id: string;
    user_id: string;
}

interface ResReturnTool {
    '200': OK;
    result?: string;
    err?: string;
}

interface ExtentionTool {
    tool_id: string
}

interface ResExtensionTool {
    '200': OK;
    result?: string;
    err?: string;
}

interface RentalClassroom {
    tool_id: string;
    user_id: string;
    rental_date: string;
    rental_due_date: string;
    rental_reason: string;
    department_id: string;
}

interface ResRentalClassroom {
    '200': OK;
    result: {
        log_id: number;
        log_type: string;
        log_title: string;
        log_content: string;
        log_create_at: string;
    }
}

interface ReturnClassroom {
    tool_id: string;
    user_id: string;
    rental_id: string;
}

interface ResReturnClassroom {
    '200': OK;
    result: {
        log_id: number;
        log_type: number;
        log_title: string;
        log_content: string;
        log_create_at: string;
    }
}

interface NotClassroomCount {
    tool_id: string;
}

interface ResNotClassroomCount {
    '200': OK;
    result?: ClassroomRentalInfo[];
    msg?: string;
}

interface ResViewRental {
    '200': OK;
    result?: ViewTool[]
    msg?: string;
}

interface ResMyRentalList {
    '200': OK;
    total?: number;
    result?: ExistCurRental[];
    msg?: string;
}

// 오류 수정 중
interface ResDeleteTool {
    '200': OK;
    suc: string;
    result: Array<{
        tool: number;
        img: number;
    }>
}

interface ResMyAllRentalList {
    '200': OK;
    total?: number;
    result?: RentalInfo[];
    msg?: string;
}

interface ResMyAllRentalList_MY_PAGE {
    '200': OK;
    total?: number;
    result?: Array<{ D_day: string; result: RentalInfo }>;
}

interface ResMyLateRentalList {
    '200': OK;
    result?: ExistCurRental[];
    msg: string;
}

interface ResLateRentalList {
    '200': OK;
    result?: ExistCurRental[];
    msg?: string;
}

interface ResRentalTableAll {
    '200': OK;
    result: Array<{
        rental_id: number;
        rental_date: string;
        rental_due_date: string;
        rental_state: string;
        rental_extend: boolean;
        user_id: string;
        tool_id: string;
    }>;
}