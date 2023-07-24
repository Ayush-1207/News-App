//package me.aryanrawlani.BackendHackerNews.service.firebase;
//
//import com.google.api.core.ApiFuture;
//import com.google.cloud.firestore.DocumentReference;
//import com.google.cloud.firestore.DocumentSnapshot;
//import com.google.cloud.firestore.Firestore;
//import com.google.cloud.firestore.WriteResult;
//import com.google.firebase.cloud.FirestoreClient;
//import me.aryanrawlani.BackendHackerNews.model.User;
//
//import java.util.concurrent.ExecutionException;
//
//public class temp {
//    public String saveUserData(User user) throws ExecutionException, InterruptedException {
//        Firestore fireDB = FirestoreClient.getFirestore();
//
//        ApiFuture<WriteResult> collectionsApiFuture = fireDB.collection("users").document('ddd').set(fields);
//
//        return collectionsApiFuture.get().getUpdateTime().toString();
//    }
//
//    public User getUserDetails(String userID) throws ExecutionException, InterruptedException {
//        Firestore fireDB = FirestoreClient.getFirestore();
//
//        DocumentReference docRef = fireDB.collection("users").document(userID);
//
//        ApiFuture<DocumentSnapshot> future = docRef.get();
//
//        DocumentSnapshot doc = future.get();
//
//        User user = null;
//
//        if (doc.exists()) {
//            user = doc.toObject(User.class);
//            return user;
//        }
//
//        return null;
//    }
//}
