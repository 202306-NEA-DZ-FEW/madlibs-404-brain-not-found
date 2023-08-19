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
       const previewView = document.querySelector(".madLibsPreview");
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
  // Hotkeys
    const input_edit = document.querySelectorAll("input")
    for (let j = 0; j < input_edit.length; j++) {
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
          input_preview[j].textContent = e.target.value;
        }
      });
    }
             
  })


  // event
  // live update
  document.addEventListener("input", (e) => {
    const input=e.target
    const span=document.getElementById(input.name)
    span.style.visibility = "visible"
    span.textContent=input.value
   });


   // reset button
   const resetButton=document.createElement('button')
   resetButton.textContent='Reset'
   const body=document.querySelector('body')
   body.appendChild(resetButton)
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




























































