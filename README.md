# Whitespace Interpreter
This body of code will be used to solve the 2kyu Codewars kata [Whitespace Interpreter](https://www.codewars.com/kata/52dc4688eca89d0f820004c6/train/javascript).

## Begin:
I know I'll be needing:
- a Lexer
- a Parser

I may  need:
- a compiler
- an interpreter
... we'll find out

## Update:
Using a trie structure to store tokens and their associated functions has made it so we don't need to separate lexing and parsing. As the white space stream is read in a for loop, we walk
the `tokenTrie` until we hit a leaf. The leaf is a callback function specific for that command.

We execute the command's function. The functions are in charge of deciding whether they are valid, what input they need, what they do/ return etc..

### For example:
If our first token is a command for stack manipulation, we know we're going to need to glean a number from the following whitespace characters in the stream.
`getNum` consumes the stream to build a number, then returns the number and the index where it ended to the function that called it. 

Then that function (the one called from its leaf positionin `tokenTrie`) does what it needs to do with the number, and then returns the new index into the stream to the for loop.
