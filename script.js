'use strict';

// создаем массив для хранения состояния ячеек
var states = [];
states.length = 9;
var flag;
var currentState = 'cross';
var cell = document.querySelectorAll('.cell');


[].forEach.call(cell, function(elem, i) {  
  // добавляем в массив states тип значка
  var addToStates = function (elem, i){
    if (currentState == 'cross'){
      states.splice(i, 1, 'cross')
      currentState = 'circle';
    } else if (currentState == 'circle'){
      states.splice(i, 1, 'circle')
      currentState = 'cross';
    }
    console.log(states)  
    // снимаем обработчик с тех ячеек на которых уже был клик
    elem.removeEventListener('click', f, false);
    console.log(flag);
    // после отрисовки линии flag=true, снимаем обработчик со всех ячеек - работает криво
    if (flag){
      cell.removeEventListener('click', f, false);
    }
    renderGrid();
  };
  var f = addToStates.bind(this, elem, i);
  elem.addEventListener('click', f, false);
});

// рисуем крестик/нолик в нужной ячейке 
function renderGrid(){
  for (var i=0;i<states.length;i++){
    if (states[i] == 'cross') {
      cell[i].classList.add('cross');
    } else if (states[i] == 'circle') { 
      cell[i].classList.add('circle');
    }
  };  
  for (var z=0;z<combinations.length;z++){
    drawTheLine(combinations[z]);    
  };
};

var combinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
// рисуем линию когда три крестика/нолика в ряд 
function drawTheLine(arr) {
  // когда есть кресик/нолик на ВСЕХ местах в одной из комбинаций, рисуем линию
  if (arr.every(allTheCross)) {
    flag = true;
    console.log('cross', arr, flag);
    for (var j=0;j<arr.length;j++){
      var k = arr[j];
      cell[k].classList.add('cross-line');     
    }
    return true;
  } 
  if (arr.every(allTheCircle)) { // true
    flag = true;
    console.log('circle', arr, flag);
    for (var j=0;j<arr.length;j++){
      var k = arr[j];
      cell[k].classList.add('circle-line');     
    }
    return true;
  }

  function allTheCross(number) {
    return states[number] == 'cross';
  }    
  function allTheCircle(number) {
    return states[number] == 'circle';
  }     
}  

// когда ХОТЯ БЫ ОДНА комбинация сработала (функция drawTheLine), удаляем обработчик на всех ячейках - не работает
// if ( combinations.some(drawTheLine) ) {
//   flag = true;
//   console.log('yes', flag);
// [].forEach.call(cell, function(elem, i) {
//   elem.removeEventListener('click', addToStates.bind(null, elem, i))
// });
// } 





