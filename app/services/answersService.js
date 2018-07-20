
var correctAnswers = [
    {
        answer: "Up to 115kg",
    },
    {
     answer: "80 years"
    },
    {
     answer: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Alligator_snapping_turtle_-_Geierschildkr%C3%B6te_-_Alligatorschildkr%C3%B6te_-_Macrochelys_temminckii_01.jpg"
    },
    {
     answer: "http://www.what-do-turtles-eat.com/wp-content/uploads/2014/10/Sea-Turtles-Habitat.jpg"
    },
    {
     answer: "Coastal North Atlantic"
    },
    {
     answer: "Loggerhead turtle"
    },
    {
     answer: "Leatherback"
    },
    {
     answer: "http://images.nationalgeographic.com/wpf/media-live/photos/000/006/cache/ridley-sea-turtle_688_600x450.jpg"
    },
    {
     answer: "900kg"
    },
    {
     answer: "Leatherback Turtle"
    },

];
app.service('AnswerService',function(){
    return {
        isCorrect: function(questionIndex, answer){
            if(correctAnswers[questionIndex] != null){
                return correctAnswers[questionIndex].answer == answer.answer;
            }
            return false;
        },

        getCorrectAnswer: function(questionIndex){
            if(correctAnswers[questionIndex] != null){
                return correctAnswers[questionIndex];
            }
            return {};
        }
    }
});