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
  var colHash = {};
  var rookTraverse = function(array){
    if (array.length === n){
      solutionCount++;
    } else {
    for (var i = 0; i < n; i++){
      if (!colHash[i]){
        colHash[i] = true;
        rookTraverse(array.concat(i));
        delete colHash[i];
        }
      }
    }
  };
  rookTraverse([]);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = [];
  var solutions = [];
  var colHash = {};
  var majorDiagHash = {};
  var minorDiagHash = {};
  var queenTraverse = function(array){
    if (array.length ===n){
    solutions.push(array);
  } else {
    for (var i = 0; i < n; i++){
      if (!colHash[i] && !majorDiagHash[array.length - i -1] && !minorDiagHash[array.length + i - 1]){
        colHash[i] = true;
        majorDiagHash[array.length - i - 1] = true;
        minorDiagHash[array.length + i - 1] = true;
        queenTraverse(array.concat(i));
        delete colHash[i];
        delete majorDiagHash[array.length - i - 1];
        delete minorDiagHash[array.length + i - 1];
        }
      }
    }
  };
  queenTraverse([]);
  if(solutions[0]){
    solution = makeEmptyMatrix(n);
    for (var i = 0; i < n; i++){
      for (var j = 0; j < n; j++){
         if(solutions[0][i] === j){
          solution[i][j] = 1;
         }
      }
    }
    console.log('Single solution for ' + n + ' queens:', solution);
    return solution;
  }
  else {
    return [];
  }
};

window.countNQueensSolutions = function(n){
  var solutionCount = 0;
  var colHash = {};
  var majorDiagHash = {};
  var minorDiagHash = {};
  var queenTraverse = function(array){
    if (array.length ===n){
    solutionCount++;
  } else {
    for (var i = 0; i < n; i++){
      if (!colHash[i] && !majorDiagHash[array.length - i -1] && !minorDiagHash[array.length + i - 1]){
        colHash[i] = true;
        majorDiagHash[array.length - i - 1] = true;
        minorDiagHash[array.length + i - 1] = true;
        queenTraverse(array.concat(i));
        delete colHash[i];
        delete majorDiagHash[array.length - i - 1];
        delete minorDiagHash[array.length + i - 1];
        }
      }
    }
  };
  queenTraverse([]);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
