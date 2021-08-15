import { firestore } from "./firebase";

const FUNC_TEST = "FUNC_TEST";
const FUNC_TEST_DETAIL = "FUNC_TEST_DETAIL";
const RESPONSE_TIME = "RESPONSE_TIME";

export default class FirestoreDatabase {
  getFuncTest() {
    firestore
      .collection(FUNC_TEST)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
  }
}
