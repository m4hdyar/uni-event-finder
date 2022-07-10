export interface UniEvent {
    _id?: string,
    title: string,
    description:string,
    start_Date: string,
    end_Date: string,
    category?: string,
    is_International?: boolean,
    is_Job_Event?: boolean,
    is_Very_Important?: boolean;
    cost?: number;
}