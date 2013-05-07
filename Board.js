(function(){

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    cols: function(){
      return _.map(_.range(this.get('n')), function(value, index){
        return _.map(this.rows(), function(val, ind){
          return val[index];
        }, this);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      var rowSum = _(this.get(rowIndex)).reduce(function(memo, value){
        return memo + value;
      }, 0);
      return rowSum > 1;
    },

    hasAnyRowConflicts: function(){
      return !!_(this.rows()).reduce(function(memo, row, index){
        return memo || this.hasRowConflictAt(index);
      }, false, this);
    },

    hasColConflictAt: function(colIndex){
      var colSum = _(this.cols()[colIndex]).reduce(function(memo, value){
        return memo + value;
      }, 0);
      return colSum > 1;
    },

    hasAnyColConflicts: function(){
      return !!_(this.cols()).reduce(function(memo, col, index){
        return memo || this.hasColConflictAt(index);
      }, false, this);
    },

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow){
      var diag = [];
      var colIndex;
      var rowIndex;
      if (majorDiagonalColumnIndexAtFirstRow < 0 ){
        colIndex = 0;
        rowIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
      } else {
        colIndex = majorDiagonalColumnIndexAtFirstRow;
        rowIndex = 0;
      }
      while(this._isInBounds(rowIndex, colIndex)){
        diag.push(this.rows()[rowIndex][colIndex]);
        rowIndex++;
        colIndex++;
      }
      var diagSum = _(diag).reduce(function(memo, value){
        return memo + value;
      }, 0);
      return diagSum > 1;
    },

    hasAnyMajorDiagonalConflicts: function(){
      return _(_.range(-(this.get('n') - 1), this.get('n'))).reduce(function(memo, value){
        return memo || this.hasMajorDiagonalConflictAt(value);
      }, false, this);
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow){
      var diag = [];
      var colIndex;
      var rowIndex;
      if (minorDiagonalColumnIndexAtFirstRow < this.get('n')){
        colIndex = minorDiagonalColumnIndexAtFirstRow;
        rowIndex = 0;
      } else {
        colIndex = this.get('n') - 1;
        rowIndex = minorDiagonalColumnIndexAtFirstRow - colIndex;
      }
      while(this._isInBounds(rowIndex, colIndex)){
        diag.push(this.rows()[rowIndex][colIndex]);
        rowIndex++;
        colIndex--;
      }
      var diagSum = _(diag).reduce(function(memo, value){
        return memo + value;
      }, 0);
      return diagSum > 1;
    },

    hasAnyMinorDiagonalConflicts: function(){
      return _(_.range(2 * this.get('n') -1)).reduce(function(memo, value){
        return memo || this.hasMinorDiagonalConflictAt(value);
      }, false, this);
    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
