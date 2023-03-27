export interface Ishift {
  uid?: string;
  fullname?: string | void;
  shiftSlug: string;
  shiftDate: string;
  shiftStartTime: string;
  shiftEndTime: string;
  shiftWage: string;
  shiftDepartment: string;
  shiftComments?: string;
  totalEarnings?: number;
}

export interface IshiftObject {
  fullname?: string | void;
  shiftsUID?: string;
  shifts: Ishift[];
}
