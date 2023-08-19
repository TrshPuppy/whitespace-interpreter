let whiteSpaceStream =
  "   \t\t\n   \t \n   \t\n   \t  \n   \t\t \n   \t \t\n   \t\t\t\n \n\t \t\n \t\t\n\t\n \t\t\n \t\t\n \t\t\n \t\n\n\n"; // 5123
//   "   \t\t\n \t \t\n"; // tests ssts token
console.log("white space length is " + whiteSpaceStream.length);
// sssllssttlssstltsssslstlstslsssststsltsstlttttllll

const stack = [];
let output = "";

// reusableFuncs['pushValue'](v)
const reusableFuncs = {
  pushValue: (v) => {
    console.log(`Pushing ${v} onto stack.`);
    stack.push(v);
  },
  popValue: (start, count) => {
    console.log(
      `Popping value from ${start}, off stack from and returning to caller.`
    );
    const poppedItems = stack.splice(start, count);

    return poppedItems;
  },
  getNum: (indx) => {
    console.log(`Getting number.`);
    // move index to start consuming number
    indx++;

    if (whitespace[indx] === "\n") {
      console.log(
        `ERROR: this number is just a terminal character! \n
               The currentIndex is ${indx}, 
               the character is ${whiteSpaceStream[indx]}`
      );
      throw new Error();
    }

    let sign = whitespace[indx] === "\t" ? -1 : 1;
    indx++;
    let num = new Number(0);

    for (indx; whiteSpaceStream[indx] !== "\n"; indx++) {
      // Bit shift number to the left to increment it (in binary)
      num << 1;
      if (whiteSpaceStream[indx] === "\t") {
        num++;
      } else {
        if (whiteSpaceStream[indx] !== " ") {
          console.log(
            `ERROR: this character is not a number, line 214 \n
                           The currentIndex is ${indx}, 
                           the character is ${whiteSpaceStream[indx]}`
          );
          throw new Error();
        }
      }
    }

    // return array w/ number and new indx:
    return [num * sign, indx];
  },
};

let $ = reusableFuncs;

// Start at root for each new command, hit a leaf = new  command, start at root again
const tokenTrie = {
  " ": {
    // This token pushes N onto the stack
    " ": (indx) => {
      console.log(`FUNCTION: push N onto stack`);
      // Get number to be pushed
      let arrFromGetNum = $.getNum(indx);
      let numToPush = arrFromGetNum[0];

      // Set instruction pointer to new index from getNum()
      indx = arrFromGetNum[1];

      // Push num to stack
      $.pushValue(numToPush);

      return indx;
    },
    "\t": {
      // This token duplicateNthValueOnStackAndPushOntoStack,
      " ": (indx) => {
        console.log(
          `FUNCTION: duplicate Nth Value On Stack And Push Onto Stack`
        );
        // get num (Nth value)
        const getNumArr = $.getNum(indx)[0];
        const nthValue = getNumArr[0];
        indx = getNumArr[1];

        // pop
        // ** popValue() is returning an array of the values popped from stack
        let start = stack.length - nthValue;
        const popVal = $.popValue(start, 1)[0];

        // duplicate
        const copy = popVal;

        // push
        $.pushValue(popVal);
        $.pushValue(copy);

        // return new index:
        return indx;
      },
      // Discard top N Values from stack
      "\n": (indx) => {
        console.log(`FUNCTION: discard top N values from stack`);

        // get num for N value
        const getNumArr = $.getNum(indx);
        const nValue = getNumArr[0];
        indx = getNumArr[1];

        // pop nValue values off stack
        for (let i = 0; i <= nValue; i++) {
          let start = stack.length - 1;
          $.popValue(start);
        }

        // return new index:
        return indx;
      },
    },
  },
};

// function getNum(currentIndex) {
//   if (whiteSpaceStream[currentIndex] === "\n") {
//     console.log(
//       `ERROR: this number is just a terminal character! \n
//          The currentIndex is ${currentIndex},
//          the character is ${whiteSpaceStream[currentIndex]}`
//     );
//     throw new Error();
//   }
//   let sign = 1;

//   if (sign === "\t") {
//     sign *= -1;
//   }

//   currentIndex++; // <------------------------------------------------------------ Fix this
//   let num = new Number(0);

//   for (currentIndex; whiteSpaceStream[currentIndex] !== "\n"; currentIndex++) {
//     num << 1;
//     switch (whiteSpaceStream[currentIndex]) {
//       case " ":
//         // This a 0
//         break;
//       case "\t":
//         num += 1;
//         break;
//       default:
//         console.log(
//           `ERROR: this character is not a number, line 214 \n
//                  The currentIndex is ${currentIndex},
//                  the character is ${whiteSpaceStream[currentIndex]}`
//         );
//         throw new Error();
//     }
//     return [num * sign, currentIndex];
//   }
// }

function whitespace(stream) {
  let currentNode = tokenTrie;

  // go through stream char by char to find token in tokenTrie
  // ea token function should return the new index (or if the
  // index hasn't changed, return the same index as was given to it)
  for (
    let instructionPointer = 0;
    instructionPointer <= stream.length - 1;
    instructionPointer++
  ) {
    currentNode = currentNode[stream[instructionPointer]];

    if (typeof currentNode === "function") {
      // Set the instruction pointer to the returned value of ea token function
      // ** We might want to return more than the new index in the future
      // **
      instructionPointer = currentNode(instructionPointer);
      console.log(`INDEX: ${instructionPointer}`);

      // We've executed a function, so reset the currentNode
      currentNode = tokenTrie;

      console.log(`OUTPUT: ${output}`);
      console.log(`STACK: ${stack}`);
    }
  }

  return output;
}

whitespace(whiteSpaceStream);
