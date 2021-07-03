const meditationButton = document.getElementById('meditation-button')
const instructionText = document.getElementById('instructionText')
const breathLog = document.getElementById('logData')
let mean = document.getElementById('mean')
let median = document.getElementById('median')
let mode = document.getElementById('mode')
let stdDev = document.getElementById('std-dev')
let i=0;
let seconds=0;
let startTime=0;
let duration=0;
let meditationCounter = 0;
let meditationLog = [];

meditationButton.addEventListener('click', (event) => {
  if (i===0) {
   startTime = Date.now();
   instructionText.innerText = "Nice and easy, through the nose."
   meditationButton.innerText = "Inhale done"
   i=1;
  }
  else if (i===1) {
    instructionText.innerText = "Think of your mantra."
    meditationButton.innerText = "Start Exhale"
    i=2;
  }
  else if (i===2) {
   instructionText.innerText = "Exhale nice and slow"
   meditationButton.innerText = "Exhale done"
   i=3;
  } 
  else if (i===3) {
    instructionText.innerText = "Good job"
    meditationButton.innerText = "Start inhale"
    duration = Math.floor((Date.now()-startTime)/1000)
    i=0;
    breathLog.innerHTML += (meditationCounter + 1) + ": " + duration + " sec <br>";
    meditationLog[meditationCounter]=duration;
    mean.innerText = "Mean: " + roundToTwo(averageCalc(meditationLog))
    median.innerText = "Median: " + medianCalc(meditationLog)
    mode.innerText = "Mode: " + modeCalc(meditationLog)
    stdDev.innerText = "Std. Dev.: " + roundToTwo(stdDevCalc(meditationLog))
    meditationCounter++;
  }
  
})

function medianCalc(array) {
    array.sort(function(a, b) {
      return a - b;
    });
    var mid = array.length / 2;
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
  }
  
function modeCalc(numbers) {
    var modes = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
 
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
 
    return modes;
}

function stdDevCalc(values){
  var avg = averageCalc(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = averageCalc(squareDiffs);

  var stdDeviation = Math.sqrt(avgSquareDiff);
  return stdDeviation;
}

function averageCalc(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}