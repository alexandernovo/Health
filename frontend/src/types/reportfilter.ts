export interface ReportFilterParam {
    reportType: string;
    dateFrom: string;
    dateTo: string;
    user_id: number;
}

// Define initialReportFilter as a plain object
export const initialReportFilter: ReportFilterParam = {
    reportType: "",
    dateFrom: "",
    dateTo: "",
    user_id: 0
};
