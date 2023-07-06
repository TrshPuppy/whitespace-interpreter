let whiteSpaceStream = "   \t\n\t\n \t\n\n\n"; // whitespaceStream @codeCore
// sssllssttlssstltsssslstlstslsssststsltsstlttttllll

const stack = [];

// Stack Manipulation funcs:
const pushN = (currentIndex) => {
  console.log("We made it to push N DAWGH");
  currentIndex += 1;
  const objectThing = getNum(currentIndex);
  const binaryArrToPush = objectThing.array;
  stack.push(binaryArrToPush);

  return objectThing.index;
  // let numToPush = getNum(currentIndex);
};

const duplicateTopStackValue = () => {
  return "this is duplicat top stack value";
};

const discardTopStackValue = () => {
  return "this discraps the top value on the stack";
};

const swapTopTwoStackValues = () => {
  return "this swaps top two stack values";
};

const duplicateNthValueOnStackAndPushOntoStack = () => {
  return "this duplates the nth valuye on stack and pushes it on the stack";
};

const discardTopNValuesFromStack = () => {
  return "this discratd the top n values from the stack";
};

// Arithmetic funcs:
const popTwoNumsAddThemThenPush = () => {
  return "this pops a an b , adds them and pushes the sum on the stack";
};

const popTwoNumsSubtractThemThenPush = () => {
  return "this pops a and b, subtract them and pushes the difference on the stack";
};

const popTwoNumsMultiplyThenPush = () => {
  return "this pops twho nums, multiplies, then pushes on the stack";
};

const popTwoNumsDivideThenPush = () => {
  return "this multiplies two nums then pushges on stack";
};

const popTwoNumsModuloThenPush = () => {
  return "this modulos two nums and pushes them on stack";
};

// Heap Access
const popTwoNumsStoreAAtAddressB = () => {
  return "this pops twho nums and stores A at address B";
};

const popAPushValueAtAOnStack = () => {
  return "this is pop a and push value at addresss an on stack";
};

// Input/ Output:
const popValueAndOutputAsChar = () => {
  return "this outputs a value popped off stack as a char";
};

const readInputCharAPopBStoreASCII_A_AtB = () => {
  return " this reads input char a and pops b and stores ASCII a at address b";
};

const readInputNumAPopBStoreA_AtB = () => {
  return " this reads input num a and pops b and stores a at address b";
};

const popValueAndOutputAsNum = () => {
  return "this Pop a value off the stack and output it as a number.";
};

const makeLocationWithLabelN = () => {
  return "this is makeLocationWithLabelN";
};

const callSubroutineAtLabelN = () => {
  return "this us callSubroutineAtLabelN";
};

const unconditionalJumpToLabelN = () => {
  return "this is unconditionalJumpToLabelN";
};

const popValueJumpToLabelNIfValueZero = () => {
  return "this is popValueJumpToLabelNIfValueZero";
};

const popValueJumpToLabelNIfValueNegative = () => {
  return "this is popValueJumpToLabelNIfValueNegative";
};

// Start at root for each new command, hit a leaf = new  command, start at root again
const tokenTrie = {
  " ": {
    // Stack Manipulation shit
    " ": pushN,
    "\t": {
      " ": duplicateNthValueOnStackAndPushOntoStack,
      "\n": discardTopNValuesFromStack,
    },
    "\n": {
      " ": duplicateTopStackValue,
      "\t": swapTopTwoStackValues,
      "\n": discardTopStackValue,
    },
    // "\t": {},
    // "\n": {},
  },
  "\t": {
    " ": {
      // Arithmetic
      " ": {
        "\t": popTwoNumsSubtractThemThenPush,
        " ": popTwoNumsAddThemThenPush,
        "\n": popTwoNumsMultiplyThenPush,
      },
      "\t": {
        // tokenTrie["\t"["\t"[" "]]]
        " ": popTwoNumsDivideThenPush,
        // "\n": {},
        "\t": popTwoNumsModuloThenPush,
      },
      // end arithmetic
      // "\n": {},
      // "\t": {},
      // "\n": {},
    },
    "\t": {
      // Heap Access
      " ": popTwoNumsStoreAAtAddressB,
      "\t": popAPushValueAtAOnStack,
      // end Heap Access
      // "\n": {},
    },
    "\n": {
      // Input/ Output
      " ": {
        " ": popValueAndOutputAsChar,
        "\t": popValueAndOutputAsNum,
      },
      "\t": {
        " ": readInputCharAPopBStoreASCII_A_AtB,
        "\t": readInputNumAPopBStoreA_AtB,
      },
    },
  },
  "\n": {
    // Flow Control
    " ": {
      " ": makeLocationWithLabelN,
      "\t": callSubroutineAtLabelN,
      "\n": unconditionalJumpToLabelN,
    },
    "\t": {
      " ": popValueJumpToLabelNIfValueZero,
      "\t": popValueJumpToLabelNIfValueNegative,
    },
    "\n": {
      // "\n": {},
    },
  },
};

function getLabel() {
  console.log("this is get label");
}

function getNum(currentIndex) {
  // getNum @cdboiuk
  if (whiteSpaceStream[currentIndex] === "\n") {
    console.log(
      `ERROR: this number is just a terminal character! \n
       The currentIndex is ${currentIndex}, 
       the character is ${whiteSpaceStream[currentIndex]}`
    );
    throw new Error();
  }
  const binArr = [];
  const sign = whiteSpaceStream[currentIndex];
  let terminalFlag = false;

  if (sign === "\t") {
    binArr.push("-");
  } else {
    binArr.push("+");
  }

  currentIndex++;
  // iterate through the stream from our index and build a binary string array
  // until we reach the terminal character
  for (
    currentIndex;
    currentIndex <= whiteSpaceStream.length - 1;
    currentIndex++
  ) {
    switch (whiteSpaceStream[currentIndex]) {
      case " ":
        binArr.push(0);
        break;
      case "\t":
        binArr.push(1);
        break;
      case "\n":
        if (binArr.length === 1) {
          binArr[0] = 0;
          return { array: binArr, index: currentIndex };
        }
        return { array: binArr, index: currentIndex };
      default:
        console.log(
          `ERROR: this character is not a number, line 214 \n
           The currentIndex is ${currentIndex}, 
           the character is ${whiteSpaceStream[currentIndex]}`
        );
        throw new Error();
    }
  }
}

function whitespace(stream) {
  // @turing whitespace
  let currentNode = tokenTrie; // CurrentNode @minsin

  // go through stream char by char to build/ token
  for (
    let charPointer = 0; // char_pointer @codeCore
    charPointer <= stream.length - 1;
    charPointer++
  ) {
    currentNode = currentNode[stream[charPointer]];

    if (typeof currentNode === "function") {
      const nextIndex = currentNode(charPointer);

      charPointer = nextIndex === undefined ? charPointer : nextIndex;
      currentNode = tokenTrie;
    }

    // currentNode = trie (the entire object)
    // currentNOde = trie[stream[SaggysWetBoxAfterSheHadAGoodNight]] (objenctThing.characterWereOn)
    // currentNode = currentNode
  }
}

whitespace(whiteSpaceStream);
