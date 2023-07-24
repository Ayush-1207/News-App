//package me.aryanrawlani.BackendHackerNews.service.firebase;
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.PostConstruct;
//import java.io.FileInputStream;
//
//@Service
//public class FirebaseInit {
//
//    @PostConstruct
//    public void initialize() {
//        final String databaseURL = "https://ycomb-news-react-default-rtdb.firebaseio.com";
//
//        try {
//            FileInputStream serviceAccount =
//                    new FileInputStream("./secret/serviceAccountKey.json");
//
//            FirebaseOptions options = new FirebaseOptions.Builder()
//                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                    .setDatabaseUrl(databaseURL)
//                    .build();
//
//            FirebaseApp.initializeApp(options);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//    }
//}
