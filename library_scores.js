const scores = (function() {
    // private variables and functions
    let correct = 0;
    let attemp = 0;
  
    function calculateScore() {
      return ((correct / attemp) * 100).toFixed(1);
    }
  
    // public methods and variables
    return {
      getCorrect: function() {
        return correct;
      },
      getAttempt: function() {
        return attemp;
      },
      getScore: function() {
        return calculateScore();
      },
      increaseCorrect: function() {
        correct++;
      },
      increaseAttempt: function() {
        attemp++;
      },
      setCorrect: function() {
          correct = 0;
      },
      setAttempt: function() {
          attemp = 0;
      }
    };
  })();
  
  export {scores};
  