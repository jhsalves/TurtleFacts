'use strict';

angular.module('myApp.quiz', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/quiz', {
    templateUrl: 'quiz/quiz.html',
    controller: 'QuizCtrl'
  });
}])

.controller('QuizCtrl', ['$scope','$location', 'TurtleService','QuestionService','AnswerService', function($scope,$location,TurtleService,QuestionService, AnswerService) {
    $scope.questions = QuestionService.getQuestions();
    $scope.totalAnswers = 0;
    $scope.quizOpen = true;
    $scope.totalCorrectAnswers = 0;
    $scope.quizResult = 0.0;
    $scope.selectedQuestion = $scope.questions[0];
    $scope.questionSelected = $scope.selectedQuestion != null;
    $scope.questionIndex = 0;
    $scope.currentAnswer = $scope.selectedQuestion.selected;
    $scope.completed = false;
    $scope.correctAnswer = {};
    
    
    $scope.startQuiz = function(){
      $scope.selectedQuestion = $scope.questions[0];
      $scope.questionSelected = $scope.selectedQuestion != null;
      $scope.questionIndex = 0;
      $scope.currentAnswer = $scope.selectedQuestion.selected;
      $scope.completed = false;
      $scope.correctAnswer = {};
      $scope.selectQuestion($scope.selectedQuestion);
    }

    $scope.resetQuiz = function(){
      QuestionService.resetQuizData();
      $scope.questions = QuestionService.getQuestions();
      $scope.selectedQuestion = $scope.questions[0];
      $scope.totalAnswers = 0;
      $scope.quizOpen = true;
      $scope.totalCorrectAnswers = 0;
      $scope.quizResult = 0.0;
      $scope.startQuiz();
      $location.path('list');
    }

    $scope.selectQuestion = function(question){
      $scope.selectedQuestion = question;
      $scope.questionSelected = true;
      $scope.questionIndex = $scope.questions.indexOf(question);
      $scope.currentAnswer = question.seleted;
      $scope.correctAnswer = AnswerService.getCorrectAnswer($scope.questionIndex);
    }

    $scope.startQuiz();

    function setIndex(index){
      $scope.questionIndex = typeof(index) != 'undefined' ? index < 10 ? index : 0 : $scope.questionIndex + 1;
    }

    $scope.isQuestionMarked = function(){
        return $scope.currentAnswer != null;
    }

    $scope.completeQuiz = function(){
        $scope.completed = $scope.totalAnswers >= $scope.questions.length;
        return $scope.completed;
    }

    $scope.computeQuizResult = function(){
      $scope.totalCorrectAnswers = QuestionService.getTotalCorrectAnswers();
      $scope.quizResult = ($scope.questions.length / $scope.totalCorrectAnswers) * 10;
      return $scope.quizResult
    }

    $scope.closeQuiz = function(){
      $scope.startQuiz();
      $scope.quizOpen = false;
      $scope.computeQuizResult();
    }

    $scope.questionAnswered = function(){
     if($scope.selectedQuestion != null && $scope.currentAnswer != null){
        QuestionService.setAnswer($scope.selectedQuestion,$scope.currentAnswer);
        setIndex($scope.questionIndex + 1);
        $scope.totalAnswers += 1;
        $scope.selectedQuestion = $scope.questions[$scope.questionIndex];
        $scope.currentAnswer = null;
        $scope.completeQuiz();
       }else{
        $scope.startQuiz();
       }
    }

    $scope.setAnswer = function(answer){
        $scope.currentAnswer = answer;
    }
}]);