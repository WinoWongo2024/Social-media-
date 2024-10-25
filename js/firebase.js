<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCPef36oOqhFb7WhEXtTVEvmvNzz8nDoXI",
    authDomain: "messaging-app-f737b.firebaseapp.com",
    projectId: "messaging-app-f737b",
    storageBucket: "messaging-app-f737b.appspot.com",
    messagingSenderId: "1078452192834",
    appId: "1:1078452192834:web:60e7faf0418cf2f6f48fdb",
    measurementId: "G-EQ6W0QSEGZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
