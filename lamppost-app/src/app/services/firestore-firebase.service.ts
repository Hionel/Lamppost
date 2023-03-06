import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StoredUser } from '../interfaces/stored-user';

@Injectable({
  providedIn: 'root',
})
export class FirestoreFirebaseService {
  constructor(private ngFirestore: AngularFirestore) {}

  private usersCollectionRef = this.ngFirestore.collection('Users');

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

      return this.usersCollectionRef.doc(UID).set({ ...userData });
    } catch (error) {
      console.log('create error:', error);
    }
  }

  getLoggedUserData(UID: string) {
    return this.usersCollectionRef.doc(UID).snapshotChanges();
  }
}
