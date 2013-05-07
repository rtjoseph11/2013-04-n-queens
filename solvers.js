// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)


window.findNRooksSolution = function(n){
 var solution = _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  for (var i = 0; i < n; i++){
    solution[i][i] = 1;
  }
  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
  var solutionCount = 0;
  var solutions = [];
  rtraverse('rook', makeEmptyMatrix(n), 0, n, solutions);
  solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = [];
  var solutions = [];
  rtraverse('queen', makeEmptyMatrix(n), 0, n, solutions);
  solution = solutions[0] || [];
  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  solutionCount = 0;
  var solutions = [];
  rtraverse('queen', makeEmptyMatrix(n), 0, n, solutions);
  solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.incrementMatrix = function(matrix, i ,j){
  return _(matrix).map(function(item, index){
     if(index === i){
      var temp = Array.prototype.slice.call(item, 0);
      temp[j] = temp[j] + 1;
      return temp;
     }
     return item;
  });
};

window.rtraverse = function(type, matrix, row, n, solutions){
  if (row ===n){
    solutions.push(matrix);
  } else {
    for (var i = 0; i < n; i++){
      var newMatrix = incrementMatrix(matrix, row, i);
      if(!window[type + 'Checker'](newMatrix)){
        rtraverse(type, newMatrix, row +1, n, solutions);
      }
    }
  }
};

window.rookChecker = function(matrix){
  for (var i = 0; i < matrix.length; i++){
    var count = 0;
    for (var j = 0; j <matrix.length; j++){
      count += matrix[j][i];
      if(count > 1){
        return true;
      }
    }
  }
  return false;
};

window.queenChecker = function(matrix){
  if (rookChecker(matrix)){
    return true;
  } else {
    var colIndex;
    var rowIndex;
    var sum;
    for (var i = - (matrix.length -1); i < matrix.length; i++){
      if (i < 0 ){
        colIndex = 0;
        rowIndex = Math.abs(i);
      } else {
        colIndex = i;
        rowIndex = 0;
      }
      sum = 0;
      while(isInBounds(matrix.length,rowIndex, colIndex)){
        sum += matrix[rowIndex][colIndex];
        rowIndex++;
        colIndex++;
        if (sum >1){
          return true;
        }
      }
    }
    for (var j = 0; j < 2 * matrix.length - 2; j++){
      if (j < matrix.length){
        colIndex = j;
        rowIndex = 0;
      } else {
        colIndex = matrix.length - 1;
        rowIndex = j - colIndex;
      }
      sum = 0;
      while(isInBounds(matrix.length,rowIndex, colIndex)){
        sum += matrix[rowIndex][colIndex];
        rowIndex++;
        colIndex--;
        if (sum > 1){
          return true;
        }
      }
    }
  }
};

window.isInBounds = function(n, rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < n &&
        0 <= colIndex && colIndex < n
      );
};

window.makeEmptyMatrix = function(n){
  return _(_.range(n)).map(function(){
    return _(_.range(n)).map(function(){
      return 0;
    });
  });
};

// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
