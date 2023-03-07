import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { StoredUser } from '../interfaces/stored-user';

@Injectable({
  providedIn: 'root',
})
export class FirestoreFirebaseService {
  private usersCollectionRef: AngularFirestoreCollection<StoredUser> =
    this.ngFirestore.collection<StoredUser>('Users');
  allUsers?: Observable<StoredUser[]>;

  constructor(private ngFirestore: AngularFirestore) {}

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
}
