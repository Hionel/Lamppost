import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { map, Observable, pipe } from 'rxjs';
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

  // Delete user data form firestore
  async deleteUserData(UID: string) {
    try {
      await this.usersCollectionRef.doc(UID).delete();
    } catch (error: any) {
      this.snackbar.openErrorSnack(`Error deleting ${error}`);
    }
  }
  // Update specifci user Data
  updateUserData(UID: string, userUpdated: StoredUser) {
    try {
      this.usersCollectionRef.doc(UID).update(userUpdated);
    } catch (error: any) {
      this.snackbar.openErrorSnack(`Error updating ${error}`);
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
            return this.shiftsCollectionRef.doc(UID).set(updatedArray);
          } else {
            shiftsArray = { shifts: [newShiftData] };
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
}
