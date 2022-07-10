export interface Profile{
    _id?: string,
    is_International: boolean | string,
    need_Job: boolean | string,
    program: string,
    major: string,
    interest_List: string[],
    user?: string,
    username:''
}