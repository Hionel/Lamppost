import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreFirebaseService {
  constructor(private ngFirestore: AngularFirestore) {}

  // Create user collection
  async createUserCollection(UID: string, userInformation: any) {
    const userCollectionRef = this.ngFirestore.collection(UID);
    const userData = {
      email: userInformation.email,
      firstame: userInformation.firstName,
      lastname: userInformation.lastName,
      age: userInformation.age,
      adminAccount: userInformation.adminAccount,
    };

    return userCollectionRef.doc('userData').set({ ...userData });
  }
}
