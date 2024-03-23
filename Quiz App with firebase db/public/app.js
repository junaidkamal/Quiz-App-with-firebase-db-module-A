
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8ttOoypJj-cv7oQbEfhiD8U3TBnR9cdE",
  authDomain: "quizapp-with-firebase-db.firebaseapp.com",
  projectId: "quizapp-with-firebase-db",
  storageBucket: "quizapp-with-firebase-db.appspot.com",
  messagingSenderId: "728092997104",
  appId: "1:728092997104:web:e5596a03533cbfb5e25935",
  measurementId: "G-21JTWZ8X2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();


var questions = [
  {
    question: "HTML Stands For _________",
    options: [
      "Anchor Text Language",
      "HTML",
      "Case Cading Style Sheet",
      "HyperText markup language",
    ],
    correctAns: "HyperText markup language",
  },
  {
    question: "CSS Stands For _________",
    options: [
      "Casecading Style Sheet",
      "Java",
      "Ram",
      "Hypertext markup language",
    ],
    correctAns: "Casecading Style Sheet",
  },
  {
    question: "JS Stands For _________",
    options: ["Java Style", "Java Script", "Script", "Script Src"],
    correctAns: "Java Script",
  },
  {
    question: "DOM Stands For _________",
    options: ["Document Object Model", "html", "Css", "Java"],
    correctAns: "Document Object Model",
  },
  {
    question: "RAM Stands For _________",
    options: ["Read Only Memory", "Dom", "Random Acccess Memory", "For Pc"],
    correctAns: "Random Acccess Memory",
  },
  {
    question: "ROM Stands For _________",
    options: [
      "Hyper Text Markup Language",
      "html",
      "HTml",
      "Read Only Memory",
    ],
    correctAns: "Read Only Memory",
  },
]

// QUESTIONSS.........
//  var questions = [

//  ]
 window.getQues = function(){
  const getQuest = ref(database, `Quiz/`)
  onChildAdded(getQuest,function(data){
    questions.push(data.val())
  })
 };
 getQues();
 console.log(questions);
// QUESTIONSS............

 var currentQuestion = document.getElementById("currentQuestion")
var totalQuestion = document.getElementById("totalQuestion")
var displayQuestion = document.getElementById("displayQuestion")
var option = document.getElementById("options")
var maind = document.getElementById("maind")
// Show Result
var showResult = document.getElementById("showResult")
var displayMarks = document.getElementById("displayMarks")
var displayGrade = document.getElementById("displayGrade")
var displayPercentage = document.getElementById("displayPercentage")
var displayStatus = document.getElementById("displayStatus")
var marks = 0;
var currentIndex = 0;

setTimeout(function(){
  initRender(currentIndex);
},1000)

window.initRender = function() {
  totalQuestion.innerHTML = questions.length
  currentQuestion.innerHTML = currentIndex + 1;
  displayQuestion.innerHTML = questions[currentIndex].question
  option.innerHTML = ''
  for (var i = 0; i < questions[currentIndex].options.length; i++) {
    option.innerHTML += `
        <div class="col-6 text-center">
                <button class="rounded-pill btn-outline-warning opt"
                 onclick ="checkAns('${questions[currentIndex].options[i]}','${questions[currentIndex].correctAns}')">
         ${questions[currentIndex].options[i]}</button>
            </div>
        `
  }
}
window.next = function() {
  if (currentIndex + 1 == questions.length) {
    showResult.style.display = "flex"
    maind.style.display = "none"
    var totalmarks = questions.length

    var percentage = (marks / totalmarks) * 100
      displayMarks.innerHTML = marks
    displayPercentage.innerHTML = percentage.toFixed(2)+"%"
    if(percentage > 79){
      displayGrade.innerHTML = "A+"
    }
    if(percentage >= 60 ){
      displayGrade.innerHTML = "B+"
    }
    if(percentage <= 59 ){
      displayGrade.innerHTML ="C"
    }
    if (percentage <= 50) {
      displayStatus.innerHTML = "Fail"
      displayGrade.innerHTML = "F"
    }
    else {
      displayStatus.innerHTML = "Pass"
    }
  }
  else {
    currentIndex++
    initRender()
  }
}

window.checkAns = function(a,b){
  if(a==b){
    marks++
  }
  next()
}
