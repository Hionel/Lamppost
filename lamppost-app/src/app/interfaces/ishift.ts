export interface Ishift {
  shiftSlug: string;
  shiftDate: string;
  shiftStartTime: string;
  shiftEndTime: string;
  shiftWage: string;
  shiftDepartment: string;
  shiftComments: string;
}

export interface IshiftObject {
  shifts: Ishift[];
}
