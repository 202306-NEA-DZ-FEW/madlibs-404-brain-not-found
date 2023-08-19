
/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */



// function parseStory(rawStory) {
  // Your code here.
  // return {};
   // This line is currently wrong :)
// }

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */


// getRawStory().then(parseStory).then((processedStory) => {
//   console.log(processedStory);
// });

function parseStory(rawStory) {
  // Your code here.
  const updatedRawStory = rawStory.replace(/(\w+)\s*(\[n\]|\[a\]|\[v\])/g, '$2');

  const storyParts = updatedRawStory.split(/(\[n\]|\[a\]|\[v\])/);
  const processedStory = [];

  for (let i = 0; i < storyParts.length; i++) {
    const word = storyParts[i];
    if (word === "[n]") {
      processedStory.push({ word: "", pos: "noun" });
    } else if (word === "[v]") {
      processedStory.push({ word: "", pos: "verb" });
    } else if (word === "[a]") {
      processedStory.push({ word: "", pos: "adjective" });
    } else {
      processedStory.push({ word });
    }
  }
  console.log(rawStory);
  console.log(updatedRawStory);

  return processedStory;
  // return {}; // This line is currently wrong :)
}

 document.addEventListener("DOMContentLoaded", () => {  
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
       //creating input
       const editView = document.querySelector(".madLibsEdit");
       editView.setAttribute('id', 'edit_story');
       const previewView = document.querySelector(".madLibsPreview");
       previewView.setAttribute('id','preview_story');
    let j=0
    for (let i = 0; i < processedStory.length; i++) {
      const wordObj = processedStory[i];
      const span_edit = document.createElement("span");
      const span_preview=document.createElement("span");

      if (wordObj.pos) {
        j++
        const input_edit = document.createElement("input");
        input_edit.type = "text";
        input_edit.maxLength = '20';
        input_edit.name = "input-" + j;
        input_edit.setAttribute('class', 'case');
        span_preview.id="input-" + j;
        
    
        if (wordObj.pos === "noun") {
          input_edit.placeholder = "noun";
         span_preview.textContent="(noun)"
         span_preview.style.visibility="hidden"
        }
        
        else if (wordObj.pos === "verb") {
          input_edit.placeholder = "verb";
          span_preview.textContent= "(verb)"
          span_preview.style.visibility="hidden"
           } 


          else if (wordObj.pos === "adjective") {
            input_edit.placeholder = "adjective";
            span_preview.textContent = "(adjective)";
            span_preview.style.visibility="hidden"
                  }
        span_edit.appendChild(input_edit);
      }
       else {
        span_edit.textContent = wordObj.word;
        span_preview.textContent=wordObj.word;
      }

      editView.appendChild(span_edit);
      previewView.appendChild(span_preview)
    }
   
    // event
//   Hotkeys
  const input_edit = document.querySelectorAll("input")
  for (let j = 0; j< input_edit.length; j++) {
    input_edit[j].addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const nextIndex = j + 1;
        if (nextIndex < input_edit.length) {
          input_edit[nextIndex].focus();
   
  
        }else {
          input_edit[0].focus();
        }}
        else {
        input_edit[j].textContent = e.target.value;
  
      }
    })



  }



//   const input_edit = document.querySelectorAll("input");
//   for (let j = 0; j < input_edit.length; j++) {
//     input_edit[j].addEventListener("keydown", (e) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         const nextIndex = j + 1;
//         if (nextIndex < input_edit.length) {
//           input_edit[nextIndex].focus();
//         } else {
//           input_edit[0].focus();
//         } }else {
//          input_edit[j].textContent = e.target.value;
//           }
//          input_edit.forEach((input, index) => {
//           if (index === j) {
//             input.style.backgroundColor = "#E094ED";
//           } else {
//             input.style.backgroundColor = ""; 
//           }
//         });
//       }
//  )};

  })

  // event
  // live update
  document.addEventListener("input", (e) => {
    const input=e.target
    const span=document.getElementById(input.name)
    span.style.visibility = "visible"
    span.textContent=input.value
   });
   

  
//   const input_edit = document.querySelectorAll("input");
//   for (let j = 0; j < input_edit.length; j++) {
//     input_edit[j].addEventListener("keydown", (e) => {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         const nextIndex = j + 1;
//         if (nextIndex < input_edit.length) {
//           input_edit[nextIndex].focus();
//         } else {
//           input_edit[0].focus();
//         } }else {
//          input_edit[j].textContent = e.target.value;
//           }
//          input_edit.forEach((input, index) => {
//           if (index === j) {
//             input.style.backgroundColor = "#E094ED";
//           } else {
//             input.style.backgroundColor = ""; 
//           }
//         });
//       }
//  )};
  
   // reset button
   const resetButton=document.querySelector('#resetbutton')
   resetButton.addEventListener('click',()=>{
   const inputs=document.querySelectorAll('input')
   inputs.forEach((item)=>{
   const span=document.querySelector(`#${item.name}`)
   console.log(span)
   span.textContent=`(${item.placeholder})`
   span.style.visibility="hidden"
   item.value=""
  })
   })
  });

  // This is for Landing-Page Button 
  document.addEventListener("DOMContentLoaded", function () {
    const landingPageButton = document.querySelector("#glitchedBtn");
    const landingPage = document.getElementById("landing-page");
    const parsingStory = document.getElementById("story-page");
  
    landingPageButton.addEventListener("click", function () {
      landingPage.style.display = "none";
      parsingStory.style.display = "block";
    });
  });

  // Video Background Function 
  // const video = document.querySelector(".video-background");
  // video.forEach(video => {
  //   video.addEventListener('ended', function(){
  //     video.currentTime = 0;
  //     video.play();
  //   });
  // });
