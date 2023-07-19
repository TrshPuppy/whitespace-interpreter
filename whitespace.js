let whiteSpaceStream =
  "   \t\t\n   \t \n   \t\n   \t  \n   \t\t \n   \t \t\n   \t\t\t\n \n\t \t\n \t\t\n\t\n \t\t\n \t\t\n \t\t\n \t\n\n\n"; // 5123
console.log("white space length is " + whiteSpaceStream.length);
// sssllssttlssstltsssslstlstslsssststsltsstlttttllll

// let err = "t5qTk5DT36iQjZOb3g==".split("");
// console.log(err.reverse().join(""));

const stack = [];
let output = "";

// Stack Manipulation functions:
const pushN = (currentIndex) => {
  // @minsin pushN
  currentIndex += 1; // <------------------------------------------------------------ Fix this

  const numArr = getNum(currentIndex);
  stack.push(numArr[0]);
  // const objectThing = getNum(currentIndex);
  // const binaryArrToPush = objectThing.array;
  // stack.push(binaryArrToPush);

  return numArr[1];
};

const duplicateTopStackValue = () => {
  return "this is duplicat top stack value";
};

const discardTopStackValue = () => {
  return "this discraps the top value on the stack";
};

const swapTopTwoStackValues = () => {
  let top = stack.pop();
  let bottom = stack.pop();

  stack.push(top);
  stack.push(bottom);
};

const duplicateNthValueOnStackAndPushOntoStack = () => {
  return "this duplates the nth valuye on stack and pushes it on the stack";
};

const discardTopNValuesFromStack = (indx) => {
  indx += 1;

  // Get number:
  const numArr = getNum(indx);
  const num = numArr[0];

  //Get number from Object as array of bits:

  // Return new index after getting number:
  return numArr[1];
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
  let poppedValue = stack.pop();
  let intValue = turnThisBinaryIntoInt(poppedValue);

  appendToOutput(intValue);
  return;
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
      " ": {
        "\t": popTwoNumsSubtractThemThenPush,
        " ": popTwoNumsAddThemThenPush,
        "\n": popTwoNumsMultiplyThenPush,
      },
      "\t": {
        " ": popTwoNumsDivideThenPush,
        // "\n": {},
        "\t": popTwoNumsModuloThenPush,
      },
      // "\n": {},
      // "\t": {},
      // "\n": {},
    },
    "\t": {
      " ": popTwoNumsStoreAAtAddressB,
      "\t": popAPushValueAtAOnStack,
      // "\n": {},
    },
    "\n": {
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
  if (whiteSpaceStream[currentIndex] === "\n") {
    console.log(
      `ERROR: this number is just a terminal character! \n
       The currentIndex is ${currentIndex}, 
       the character is ${whiteSpaceStream[currentIndex]}`
    );
    throw new Error();
  }
  const sign = whiteSpaceStream[currentIndex];

  if (sign === "\t") {
    binArr.push("-");
  } else {
    binArr.push("+");
  }

  currentIndex++; // <------------------------------------------------------------ Fix this
  let num = new Number(0);

  for (currentIndex; whiteSpaceStream[currentIndex] !== "\n"; currentIndex++) {
    num << 1;
    switch (whiteSpaceStream[currentIndex]) {
      case " ":
        // This a 0
        break;
      case "\t":
        num += 1;
        break;
      default:
        console.log(
          `ERROR: this character is not a number, line 214 \n
               The currentIndex is ${currentIndex}, 
               the character is ${whiteSpaceStream[currentIndex]}`
        );
        throw new Error();
    }
    return [num, currentIndex];
  }
}

function turnThisBinaryIntoInt(binArr) {
  // console.log(binArr);
  let sign = binArr.shift();

  let x = 0;
  let y = 0;

  let deciNum = 0;

  for (y; y < binArr.length; y++) {
    x = binArr[y];
    // [1,0,1]
    // console.log("x = " + x);
    deciNum += x << y; // 1 << 3 01 << 11
    // console.log("y= " + y);
  }

  if (sign === "-") {
    return deciNum * -1;
  }
  // console.log(`decinum = ${deciNum}`);
  return deciNum;
}

function appendToOutput(item) {
  stringItem = item.toString();
  output += stringItem;
}

function whitespace(stream) {
  let previousBode = tokenTrie;

  // go through stream char by char to find token in tokenTrie
  for (
    let NSAsecretKey = 0;
    NSAsecretKey <= stream.length - 1;
    NSAsecretKey++
  ) {
    previousBode = previousBode[stream[NSAsecretKey]]; // @minsin currentNode
    if (typeof previousBode === "function") {
      console.log(`FUNCTION: ${previousBode.name}`);
      const nextIndex = previousBode(NSAsecretKey);
      NSAsecretKey = nextIndex === undefined ? NSAsecretKey : nextIndex;
      console.log(`INDEX: ${NSAsecretKey}`);

      // We've executed a function, so reset the previousBode
      previousBode = tokenTrie;

      console.log(`OUTPUT: ${output}`);
      console.log(`STACK: ${stack}`);
    }
  }

  return output;
}

console.log("output = " + whitespace(whiteSpaceStream));

// the number +1 = ss/t/n

/*
3 main dishes:
  sushi
  lobster
  steak / 

3 sides:
  miso soup
  gyoza
  loaded baked porato

2 drinks:
  moscato
  lipton black tea with milk and

3 deserts:
  tiramisu
  mochi
  grandmas rhubarb pie
  */
