type MyUserInfo = {
    user_id: string;
    user_email: string;
    user_student_number: string;
    user_name: string;
    department: {
        department_name: string;
        university: {
            university_name: string;
        }
    }
}

interface ResViewInfo {
    '200': OK;
    result?: MyUserInfo
    err?: string;
}

interface ChangeInfo {
    user_email: string;
    user_student_number: string;
    user_name: string;
}

interface ResChangeInfo {
    '200': OK;
    suc?: string;
    result?: number[];
    err?: string;
}