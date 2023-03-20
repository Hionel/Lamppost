import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { map } from 'rxjs';
import { Ishift, IshiftObject } from '../interfaces/ishift';
import { StoredUser } from '../interfaces/stored-user';

import { SnackbarNotificationService } from './snackbar-notification.service';

@Injectable({
  providedIn: 'root',
})
export class FirestoreFirebaseService {
  private usersCollectionRef: AngularFirestoreCollection<StoredUser> =
    this.ngFirestore.collection<StoredUser>('Users');
  private shiftsCollectionRef: AngularFirestoreCollection<IshiftObject> =
    this.ngFirestore.collection<IshiftObject>('Shifts');
  constructor(
    private ngFirestore: AngularFirestore,
    private snackbar: SnackbarNotificationService
  ) {}

  // Create user collection
  async createUserDocument(UID: string, userInformation: StoredUser) {
    try {
      const userData = {
        email: userInformation.email,
        firstname: userInformation.firstname,
        lastname: userInformation.lastname,
        age: userInformation.age,
        adminAccount: userInformation.adminAccount,
      };

      return await this.usersCollectionRef.doc(UID).set({ ...userData });
    } catch (error) {
      console.log('create error:', error);
    }
  }
  // Get logged user data
  getLoggedUserData(UID: string) {
    return this.usersCollectionRef.doc(UID).snapshotChanges();
  }

  // Get all users data
  getAllUsersData() {
    return this.usersCollectionRef.snapshotChanges().pipe(
      map((docs) => {
        return docs.map((res) => {
          const data = res.payload.doc.data() as StoredUser;
          const uid = res.payload.doc.id;
          return { uid, ...data };
        });
      })
    );
  }
  // Update specifci user Data
  updateUserData(UID: string, userUpdated: StoredUser) {
    try {
      this.usersCollectionRef.doc(UID).update(userUpdated);
      this.snackbar.openSuccessSnack(`Successfully updated the user's data`);
    } catch (error: any) {
      this.snackbar.openErrorSnack(`Error updating ${error}`);
    }
  }
  // Delete user data form firestore
  async deleteUserData(UID: string) {
    try {
      await this.usersCollectionRef.doc(UID).delete();
      this.snackbar.openSuccessSnack(`Successfully deleted the user`);
    } catch (error: any) {
      this.snackbar.openErrorSnack(`Error deleting ${error}`);
    }
  }

  // Get fullname
  async getFullname(UID: string) {
    try {
      let fullname;
      await this.usersCollectionRef
        .doc(UID)
        .get()
        .forEach((user) => {
          fullname = user.data()?.firstname + ' ' + user.data()?.lastname;
        });
      return fullname;
    } catch (error) {
      return this.snackbar.openErrorSnack('Failed fetching the names');
    }
  }
  // Add shift to
  async addShift(newShiftData: Ishift, UID: string) {
    try {
      const db = getFirestore();
      const ref = doc(db, 'Shifts', UID);
      getDoc(ref)
        .then((res) => {
          let shiftsArray: IshiftObject;
          if (res.data()) {
            shiftsArray = res.data() as IshiftObject;
            const updatedArray = {
              shifts: [...shiftsArray.shifts, newShiftData],
            };
            this.snackbar.openSuccessSnack(`Added a new shift`);
            return this.shiftsCollectionRef.doc(UID).set(updatedArray);
          } else {
            shiftsArray = { shifts: [newShiftData] };
            this.snackbar.openSuccessSnack(`Added a new shift`);
            return this.shiftsCollectionRef.doc(UID).set(shiftsArray);
          }
        })
        .catch((error) => {
          return this.snackbar.openErrorSnack(`Error adding shift: ${error}`);
        });
    } catch (error) {
      return this.snackbar.openErrorSnack(`Error adding shift: ${error}`);
    }
  }
  // Get all shifts

  getAllShifts() {
    return this.shiftsCollectionRef.snapshotChanges().pipe(
      map((userShifts) => {
        return userShifts.map((res) => {
          const shiftData = res.payload.doc.data() as IshiftObject;
          const shiftsUID = res.payload.doc.id;
          return { shiftsUID, ...shiftData };
        });
      })
    );
  }
  //  Update specific shift

  updateShift(UID: string, ShiftSlug: string, updatedShiftData: Ishift) {
    try {
      const userShiftsDocument = this.shiftsCollectionRef.doc(UID);
      return userShiftsDocument.get().subscribe((res) => {
        const shiftsArray = res.data()!.shifts;
        if (res.exists) {
          const modifiedShiftIndex = shiftsArray.findIndex(
            (shift: Ishift) => shift.shiftSlug === ShiftSlug
          );
          shiftsArray[modifiedShiftIndex] = {
            shiftSlug: ShiftSlug,
            shiftDate: updatedShiftData.shiftDate,
            shiftStartTime: updatedShiftData.shiftStartTime,
            shiftEndTime: updatedShiftData.shiftEndTime,
            shiftWage: updatedShiftData.shiftWage,
            shiftDepartment: updatedShiftData.shiftDepartment,
          };
          this.snackbar.openSuccessSnack(`Modified shift's data successfully`);
          return userShiftsDocument.update({ shifts: shiftsArray });
        }
        return this.snackbar.openErrorSnack(
          'No response exists for this document'
        );
      });
    } catch (error: any) {
      return this.snackbar.openErrorSnack(`Error updating ${error}`);
    }
  }

  deleteShift(UID: string, ShiftSlug: string) {
    try {
      const userShiftsDocument = this.shiftsCollectionRef.doc(UID);
      return userShiftsDocument.get().subscribe((res) => {
        const shiftsArray = res.data()!.shifts;
        if (res.exists) {
          const removedShiftIndex = shiftsArray.findIndex(
            (shift: Ishift) => shift.shiftSlug === ShiftSlug
          );
          shiftsArray.splice(removedShiftIndex, 1);
          return userShiftsDocument
            .update({ shifts: shiftsArray })
            .then(() => {
              this.snackbar.openSuccessSnack('Shift deleted successfully');
            })
            .catch((error) => {
              return this.snackbar.openErrorSnack(
                `Error deleting shift: ${error}`
              );
            });
        }
        return this.snackbar.openErrorSnack(
          'No response exists for this document'
        );
      });
    } catch (error: any) {
      return this.snackbar.openErrorSnack(`Error deleting: ${error}`);
    }
  }
}
