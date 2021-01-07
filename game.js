   alert("Developed by Bhaskar Anand");
   //Store class names as variables
   const X_Class = 'X';
   const O_Class = 'O';
   //Store all possible winning combination indexes in a array 
   const winning_combinations = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
   ];
   //All required elements
   const winningMessageTextElement = document.querySelector('[data-winningMessageText]');
   const winningMessageElement = document.getElementById('winningMessage');
   const removeButton = document.getElementById('removeButton');
   const cellElements = document.querySelectorAll('[data-cell]');
   let circleTurn;

   //Calling main function to start the action
   startGame();
   //Start the game again if clicked on reset button
   removeButton.addEventListener('click', startGame);

   function startGame() {
     //initially, the x's turn will be there
     circleTurn = false;
     //Take allRemove the cells 
     cellElements.forEach(cell => {
       //Remove the x or O classes and it's event,in case if any cell contains any one of the class at the beginning.
       cell.classList.remove(X_Class);
       cell.classList.remove(O_Class);
       //Run a function when a cell is clicked only once
       cell.addEventListener('click', clickHandler, { once: true })
     })
     //Remove the winning message, in case if it had appeared
     winningMessageElement.classList.remove('show');

   }

   //Function to check whose turn will it be. 
   function clickHandler(e) {
     //Store the class of current player's turn, by checking whose turn currently is. 
     currentClassTurn = circleTurn ? O_Class : X_Class;
     let cell = e.target;
     //Function to display current mark of current player's turn
     placeMark(cell, currentClassTurn);
     //If someone wins
     if (checkWin(currentClassTurn)) {
       //A function takes argument false to denote it's not a draw. 
       endGame(false);
     } else if (isDraw()) {
       //if checkWin() returns false and isDraw() returns true, it's a draw
       endGame(true);
     } else {
       //if no one wins and game is running,keep swaping turns. 
       swapTurn();
     }
   }

   //Function to display current mark of current class
   function placeMark(cell, currentClassTurn) {
     cell.classList.add(currentClassTurn);
   }

   //Function to swap turns by always changing the value of cicleTurn. 
   function swapTurn() {
     circleTurn = !circleTurn;
   }

   //Function to check the wins by iterating over all the winning combinations 
   function checkWin(currentClassTurn) {
     //To check if any combination is true
     return winning_combinations.some(combination => {
       //To check if in any combination, all the cells have same class or same mark
       return combination.every(index => {
         //Iterating over all the cells of a combination
         return cellElements[index].classList.contains(currentClassTurn);
       })
     })
   }

   //Function to display the final text after the execution of checkWin() and isDraw() functions
   function endGame(draw) {
     //Edit the main display text element based on different conditions. 
     if (draw) {
       winningMessageTextElement.innerText = "Draw!";
     } else {
       winningMessageTextElement.innerText = `${circleTurn?O_Class:X_Class}'s Won!`;
     }
     winningMessageElement.classList.add('show');
   }

   //Function to check if all the cells are filled with either x or O. 
   function isDraw() {
     return [...cellElements].every(cell => {
       return cell.classList.contains(X_Class) || cell.classList.contains(O_Class);
     })
   }