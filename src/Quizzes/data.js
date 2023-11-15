const module1 = {
    "quizTitle": "Java Module 1 Quiz",
    "quizSynopsis": "Let's go over what we learned in module 1",
    "questions": [
      {
        "question": "What is correct syntax for main method of a java class?",
        "questionType": "text",
        "answers": [
          "public static int main(String[] args)",
          "public int main(String[] args)",
          "public static void main(String[] args)",
          "None of the above."
        ],
        "correctAnswer": "3",
        "explanation": "This will be mostly boiler-plate but it's always helpful to remember."
      },
      {
        "question": "Does every variable in Java need a data type?",
        "questionType": "text",
        "answers": [
          " No – only numeric variables need a data type.",
          "No – a data type is optional.",
          "Yes – all variables are of the same data type.",
          "Yes – every variable must be declared with its data type."
        ],
        "correctAnswer": "4",
        "explanation": "Java is very strict programming language, every variable needs a data type so that the program knows what to expect."
      },
      {
        "question": "Which of these is not a Data Type?",
        "questionType": "text",
        "answers": [
          "String",
          "Boolean",
          "Method",
          "Number"
        ],
        "correctAnswer": "3",
        "explanation": "Methods are named blocks of code that can be reused elsewhere in the code."
      },
      {
        "question": "Which of the following shows the syntax of an assignment statement?",
        "questionType": "text",
        "answers": [
          "variable name = expression ;",
          "expression = expression ;",
          "expression = variable name ;",
          "data type = variable name ;"
        ],
        "correctAnswer": "1",
        "explanation": "The variable on the left of the assignment operator gets assigned the value on the right of the assignment operator. Example: team = “Minnesota Vikings”;"
      },
      {
        "question": "A while loop will continue to run until?",
        "answers": [
          "A provided amount of iterations have passed",
          "The condition is met",
          "User input",
          "None of the above"
        ],
        "questionType": "text",
        "correctAnswer": "2",
        "explanation": "If the condition is true, the code block is executed again; if not, we exit the loop and continue with the code following the closing curly brace of the while loop."
      },
      {
        "question": `What is the output of this block of code?
        public static int total( int num1, int num2 ) {
          return num1 + num2;
        }
        System.out.println(total(3, 6));`,
        "questionType": "text",
        "answers": [
          "9",
          "24",
          "18",
          "-3"
        ],
        "correctAnswer": "3",
        "explanation": "This method returns the value of num1 multiplied by num2."
      },
      {
        "question": "What is JDK and what is JRE?",
        "questionType": "text",
        "answers": [
          "JDK is Java Development Knowledge and JRE is Java Runtime Executor",
          "JDK is Java Development Knowledge and JRE is Java Runtime Environment",
          "JDK is Java Development Kit and JRE is Java Runtime Environment",
          "None of the above"
        ],
        "correctAnswer": "3",
        "explanation": "The Java Development Kit (JDK) contains the tools necessary for developers (like us!) to create and run new Java programs. The Java Runtime Environment (JRE) allows people to run Java programs that others have written. The JDK contains the JRE."
      },
      {
        "question": "int[] values = {9, 4, 12, 2, 6, 8, 18};\n What is returned by values[5]?",
        "questionType": "text",
        "answers": [
          "9",
          "6",
          "12",
          "8"
        ],
        "correctAnswer": "4",
        "explanation": "Array indices start at 0. So counting from 0 we arrive at the 5th index which is 8. "
      },
      {
        "question": "What is the purpose of the flush method when writing files?",
        "questionType": "text",
        "answers": [
          "It forces everything to be written to the file.",
          "It clears and closes the stream",
          "It clears the file before we write to it",
          "None of the above"
        ],
        "correctAnswer": "1",
        "explanation": "The flush method forces everything to be written to the file. PrintWriter may buffer some of our output rather than writing it immediately. This is something we didn't need to do with System.out."
      },
      {
        "question": "What does the void return type indicate about a method?",
        "questionType": "text",
        "answers": [
          "The method does not return a value.",
          "The method is invalid and may not be used.",
          "The method may not be accessed outside of the class in which it is declared.",
          "The method may not be overridden."
        ],
        "correctAnswer": "1",
        "explanation": "A method must always have a return type declared, if there is no return then we must declare void."
      }
    ]
  }
  
  const module2 = {
      "quizTitle": "Java Module 2 Quiz",
      "quizSynopsis": "Quiz going over what we've covered on Java so far",
      "questions": [
        {
          "questionType": "text",
          "question": "Is ReactJS a framework by itself?",
          "answers": [
            "Yes",
            "No"
          ],
          "correctAnswer": "2",
          "messageForCorrectAnswer": "Correct!",
          "messageForInorrectAnswer": "Sorry! Better luck next time",
          "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
      ]
    }
  
  const module3 = {
      "quizTitle": "Java Module 3 Quiz",
      "quizSynopsis": "Quiz going over what we've covered on Java so far",
      "questions": [
        {
          "questionType": "text",
          "question": "Is ReactJS a framework by itself?",
          "answers": [
            "Yes",
            "No"
          ],
          "correctAnswer": "2",
          "messageForCorrectAnswer": "Correct!",
          "messageForInorrectAnswer": "Sorry! Better luck next time",
          "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
      ]
    }
  
  export {
    module1, module2, module3
  };
  