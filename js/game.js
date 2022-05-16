// global consts
const TRIVIA_API_URL = "https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple"; // see https://opentdb.com/api_config.php
const TENOR_API_URL = "https://g.tenor.com/v1/search?q=QUERY&key=API_KEY&limit=10";
const TENOR_API_KEY = ""; // you need to add your own API key from Tenor and replace API_KEY in TENOR_API_URL. See https://tenor.com/gifapi

function on_page_load() {
    console.log("Page has loaded ...");
    fetch_a_question();
}
function on_question_fetched(question_text,correct_answer,incorrect_answers){
    update_question_ui();
    fetch_image();
}
function on_image_fetched(){
    update_image_ui();
}
function fetch_a_question(){
    console.log("Fetch a question...");
    fetch(TRIVIA_API_URL)
       .then(response => response.json())
         .then(data => {
             console.log(data);
             const question_text = data["results"][0]["question"];
             const correct_answer = data["results"][0]["correct_answer"];
             const incorrect_answers = data["results"][0]["incorrect_answers"];
             on_question_fetched(question_text,correct_answer,incorrect_answers);
         });

}
function update_question_ui(question_text,correct_answer,incorrect_answers){
     document.getElementById("question_text").innerHTML = question_text;
     answer_buttons = getElementByClassName("answer_button");
     const answer_options = incorrect_answers;
     const insertion_index = Math.floor(Math.random * 4);
     answer_options.splice(0,0,correct_answer);
     for(let i = 0; i<4;i++){
        answer_buttons[i].innerHTML = answer_options[i];
     }
}
function fetch_image(correct_answer){
    console.log("Fetch image...");
    fetch(TENOR_API_URL)
    .then(response => response.json())
      .then(data => {
          console.log(data);
          const question_text = data["results"][0]["question"];
          const correct_answer = data["results"][0]["correct_answer"];
          const incorrect_answers = data["results"][0]["incorrect_answers"];
          on_question_fetched(question_text,correct_answer,incorrect_answers);
      });

}


window.onload = on_page_load;