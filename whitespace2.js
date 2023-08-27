// Token tests:
const SSTS = "   \t\t\n \t \t\n";
const indx23 = "   \t\t\n   \t \n   \t\n   \t  \n";
const SLS = indx23 + " \n ";
const SLL = index23 + " \n\n";
const TSSS = indx23 + "\t   ";
const TSST = indx23 + "\t  \t";
const TSSL = indx23 + "\t  \n";

const indx44 = indx23 + "   \t\t \n   \t \t\n   \t\t\t\n";
const TTS = indx44 + "\t\t ";
const TSTS = indx44 + "\t \t ";
const TSTT = indx44 + "\t \t\t";
let whiteSpaceStream = TSTT;
//  "   \t\t\n   \t \n   \t\n   \t  \n   \t\t \n   \t \t\n   \t\t\t\n \n\t \t\n \t\t\n\t\n \t\t\n \t\t\n \t\t\n \t\n\n\n"; // 5123

console.log("white space length is " + whiteSpaceStream.length);
// sssllssttlssstltsssslstlstslsssststsltsstlttttllll

const stack = [];
const heap = new Array(16777216); // 16MB

let output = "";

// reusableFuncs['pushValue'](v)
const reusableFuncs = {
  pushValue: (v) => {
    console.log(`Pushing ${v} onto stack.`);
    // v is an array of values to be pushed onto the stack

    for (const val of v) {
      stack.push(val);
    }
  },
  popValue: (start, count) => {
    console.log(
      `Popping ${count} values off stack starting from indx ${start}.`
    );

    // Make sure there are values on the stack before popping:
    if (stack.length === 0) {
      console.log(
        "ERROR: Attempting to pop value from stack, but stack is empty."
      );
      throw new Error();
    }
    // Make sure there are enough values on the stack:
    if (stack.length < count) {
      console.log(
        `ERROR: Attempting to pop ${count} values off of stack, but stack length is only ${stack.length}.`
      );
      throw new Error();
    }

    const poppedItems = stack.splice(start, count);

    return poppedItems;
  },
  getNum: (indx) => {
    console.log(`Getting N number.`);
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
      num << 1; // 011101
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
    console.log(`Returning N = ${num} from getNum()`);
    return [num * sign, indx];
  },
  doMath: (operands, operation) => {
    console.log(`Doing math: ${operands[1]} ${operation} ${operands[0]}`);
    // operands is an array of the operands
    const a = operands[0];
    const b = operands[1];

    // operation...
    switch (operation) {
      case "+":
        return b + a;
      case "-":
        return b - a;
      case "*":
        return b * a;
      case "/":
        return Math.floor(b / a);
      case "%":
        return b % a;
    }
  },
  storeAtHeapAddress: (value, address) => {
    console.log(`Storing value ${value} at heap address ${address}`);

    // Make sure there is enough space in heap:
    if (address >= heap.length) {
      console.log(
        `ERROR: there is not enough space on the heap for this address: ${address}`
      );
      throw new Error();
    }

    heap[address] = value;
    console.log(`HEAP at address ${address}: ${heap[address]}`);
  },
};

let $ = reusableFuncs;

// console.log("Testing popValue()")
// const stack = [1,2,3,4,5,6,7]
// const testpop = $.popValue(2, 2)
// console.log("Testpop: "+ testpop + " stack: "+ stack)

// Start at root for each new command, hit a leaf = new  command, start at root again
const tokenTrie = {
  // Stack Manipulation TOKENS
  " ": {
    // TOKEN: SS: Pushes N onto the stack
    " ": (indx) => {
      console.log(`TOKEN: SS: Push N onto stack`);
      // Get number to be pushed
      let arrFromGetNum = $.getNum(indx);
      let numToPush = arrFromGetNum[0];

      // Set instruction pointer to new index from getNum()
      indx = arrFromGetNum[1];

      // Push num to stack
      $.pushValue([numToPush]);

      return indx;
    },
    "\t": {
      // TOKEN: STS: DuplicateNthValueOnStackAndPushOntoStack
      " ": (indx) => {
        console.log(
          `TOKEN: STS: Duplicate Nth Value On Stack And Push Onto Stack`
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

        // push copy and popVal
        $.pushValue([popVal, copy]);

        // return new index:
        return indx;
      },
      // TOKEN: STL: discard top N Values from stack
      "\n": (indx) => {
        console.log(`TOKEN: STL: Discard top N values from stack`);
        // get num for N value
        const getNumArr = $.getNum(indx);
        const nValue = getNumArr[0];
        indx = getNumArr[1];

        // pop nValue values off stack
        // let start = stack.length - (1 + nValue);
        // $.popValue(start, );

        for (let i = 1; i <= nValue; i++) {
          let start = stack.length - 1;
          $.popValue(start, 1);
        }

        // return new index:
        return indx;
      },
      // TOKEN: STT: "\t": this TOKEN doesn't exist (STS)
    },
    "\n": {
      // TOKEN: SLS = Duplicate top value on stack
      " ": (indx) => {
        console.log("TOKEN: SLS: Duplicate top value on stack");

        // pop top value off the stack (the last value in the array)
        // ** popValue() returns an array of values popped from stack
        const start = stack.length - 1;
        const popVal = $.popValue(start, 1)[0];

        // push both onto stack:
        const copy = popVal;
        $.pushValue([popVal, copy]);

        return indx;
      },
      // TOKEN: SLT = Swap two values on stack
      "\t": (indx) => {
        console.log("TOKEN: SLT: Swap two values on stack");

        // pop top two top values on the stack:
        // ** popValue() returns the values popped in an array
        const start = stack.length - 2; // [x,y,x,y,x,y]
        const poppedVals = $.popValue(start, 2);

        // push them back on to the stack, swapped:
        $.pushValue([poppedVals[1], poppedVals[0]]);

        return indx;
      },
      // TOKEN: SLL = Discard the top value on stack
      "\n": (indx) => {
        console.log(`TOKEN: SLL: Discard the top value on stack`);

        // pop top value from stack:
        const start = stack.length - 1;
        $.popValue(start, 1);

        return indx;
      },
    },
  },
  // Arithmetic && Heap Access & I/O TOKENS:
  "\t": {
    // Arithmetic TOKENS:
    " ": {
      " ": {
        // TOKEN: TSSS: Pop a & b, add them, push them back onto stack
        " ": (indx) => {
          console.log(
            "TOKEN: TSSS: Pop A & B, add them, push them back onto stack"
          );

          // Pop A and B:
          const start = stack.length - 2;
          const poppedVals = $.popValue(start, 2);

          const a = poppedVals[0];
          const b = poppedVals[1];

          // Add them:
          const sum = $.doMath([a, b], "+");

          // push answer onto stack
          $.pushValue([sum]);

          return indx;
        },
        // TOKEN: TSST: Pop a & b, then push b-a
        "\t": (indx) => {
          console.log("TOKEN: TSST: Pop a &b, then push b-a");

          // Pop A and B:
          const start = stack.length - 2;
          const poppedVals = $.popValue(start, 2);

          const a = poppedVals[0];
          const b = poppedVals[1];

          // do math:
          const operation = "-";
          const answer = $.doMath([a, b], operation);

          // push result onto stack
          $.pushValue([answer]);

          return indx;
        },
        // TOKEN: TSSL: Pop a & b, and push b * a onto stack
        "\n": (indx) => {
          console.log("TOKEN: TSSL: Pop a & b, and push b * a onto stack");
          // Pop A and B:
          const start = stack.length - 2;
          const poppedVals = $.popValue(start, 2);

          const a = poppedVals[0];
          const b = poppedVals[1];

          // do math:
          const operation = "*";
          const answer = $.doMath([a, b], operation);

          // push result onto stack
          $.pushValue([answer]);

          return indx;
        },
      },
      "\t": {
        // TOKEN: TSTS: DIVISION
        " ": (indx) => {
          console.log(
            " TOKEN: TSTS: DIVISION of a and b and then push on stack"
          );
          // Pop A and B:
          const start = stack.length - 2;
          const poppedVals = $.popValue(start, 2);

          const a = poppedVals[0];
          if (a === 0) {
            console.log(
              `ERROR: a cannot be used in division operation b/c it's 0`
            );
            throw new Error();
          }
          const b = poppedVals[1];

          // do math:
          const operation = "/";
          const answer = $.doMath([a, b], operation);

          // push result onto stack
          $.pushValue([answer]);

          return indx;
        },
        // TOKEN: TSTT: Modulo
        "\t": (indx) => {
          console.log(
            "TOKEN: TSTT Mmodulo a and b and put the answer on the stcak"
          );
          // Pop A and B:
          const start = stack.length - 2;
          const poppedVals = $.popValue(start, 2);

          const a = poppedVals[0];
          if (a === 0) {
            console.log(
              `ERROR: a cannot be used in division operation b/c it's 0`
            );
            throw new Error();
          }
          const b = poppedVals[1];

          // do math:
          const operation = "%";
          const answer = $.doMath([a, b], operation);

          // push result onto stack
          $.pushValue([answer]);

          return indx;
        },
      },
    },
    // Heap Access TOKENS:
    "\t": {
      // TOKEN: TTS: Pop a & b store a at heap address b
      " ": (indx) => {
        console.log("TOKEN: TTS: Pop a & b store a at heap address b");

        // Pop A and B:
        const start = stack.length - 2;
        const poppedVals = $.popValue(start, 2);

        const a = poppedVals[0];
        const b = poppedVals[1];

        // store a on heap at address b
        $.storeAtHeapAddress(a, b);

        return indx;
      },
    },
  },
};

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

      console.log(`type of stack value 0 = ${typeof stack[0]}`);
    }
  }

  return output;
}

whitespace(whiteSpaceStream);
