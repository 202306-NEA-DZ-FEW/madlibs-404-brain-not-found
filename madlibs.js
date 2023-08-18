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
// const rawStory = '[n] [v] to the [n], and it was [a]. He [v] the [n].';

function parseStory(rawStory) {
  const updatedRawStory = rawStory.replace(
    /(\w+)\s*(\[n\]|\[a\]|\[v\])/g,
    "$2"
  );
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
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const editView = document.getElementsByClassName("madLibsEdit")[0];
    const previewView = document.getElementsByClassName("madLibsPreview")[0];
    const storyParts = processedStory.map((wordObj) => wordObj.word);
    console.log(storyParts);
    let j = 0;
    
    const userInput = {}; // Object to store user input

    for (let i = 0; i < processedStory.length; i++) {
      const wordObj = processedStory[i];
      const span_edit = document.createElement("span");
      const span_preview = document.createElement("span");

      if (wordObj.pos) {
        j++;
        const input_edit = document.createElement("input");
        input_edit.type = "text";
        input_edit.maxLength = "20";
        input_edit.name = "input-" + j;
        span_preview.textContent = "_____";

        input_edit.addEventListener("input", (e) => {
          const inputValue = e.target.value;
          span_preview.textContent = inputValue ? inputValue : "____";

        });

        if (wordObj.pos === "noun") {
          input_edit.placeholder = "noun";
        } else if (wordObj.pos === "verb") {
          input_edit.placeholder = "verb";
        } else if (wordObj.pos === "adjective") {
          input_edit.placeholder = "adjective";
        }

        span_edit.appendChild(input_edit);
        previewView.appendChild(span_preview);
      } else {
        span_edit.textContent = wordObj.word;
        console.log(span_edit);
        span_preview.textContent = wordObj.word;
        console.log(previewView);
      }

      editView.appendChild(span_edit);
      previewView.appendChild(span_preview);
    }
  });
