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
const rawStory = '[n] [v] to the [n], and it was [a]. He [v] the [n].';

function parseStory(rawStory) {
  // Your code here.
  const storyParts = rawStory.split(/(\[n\]|\[a\]|\[v\])/);
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

  return processedStory;
  // return {}; // This line is currently wrong :)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory().then(parseStory).then((processedStory) => {
  const editView = document.getElementsByClassName("madLibsEdit")[0];
  const previewView = document.getElementsByClassName("madLibsPreview")[0];

  processedStory.forEach((wordObj) => {
    const span = document.createElement("span");

    if (wordObj.pos) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = wordObj.word;
      input.addEventListener("input", () => {
        span.textContent = input.value;
      });

      span.appendChild(input);
      previewView.appendChild(document.createTextNode(`[${wordObj.pos}]`));
    } else {
      span.textContent = wordObj.word;
      previewView.appendChild(document.createTextNode(wordObj.word));
    }

    editView.appendChild(span);
  });
  console.log(processedStory);
});
