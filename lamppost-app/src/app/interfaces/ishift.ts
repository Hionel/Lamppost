export interface Ishift {
  fullname?: string;
  shiftSlug: string;
  shiftDate: string;
  shiftStartTime: string;
  shiftEndTime: string;
  shiftWage: string;
  shiftDepartment: string;
  shiftComments: string;
  totalEarnings?: number;
}

export interface IshiftObject {
  shiftsUID?: string;
  shifts: Ishift[];
}
