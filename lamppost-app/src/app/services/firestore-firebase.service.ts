import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StoredUser } from '../interfaces/stored-user';

@Injectable({
  providedIn: 'root',
})
export class FirestoreFirebaseService {
  constructor(private ngFirestore: AngularFirestore) {}

  // Create user collection
  async createUserCollection(UID: string, userInformation: StoredUser) {
    const userCollectionRef = this.ngFirestore.collection(UID);
    const userData = {
      email: userInformation.email,
      firstame: userInformation.firstname,
      lastname: userInformation.lastname,
      age: userInformation.age,
      adminAccount: userInformation.adminAccount,
    };

    return userCollectionRef.doc('userData').set({ ...userData });
  }
}
