'use strict';

// показать/спрятать список городов
document.querySelector('.guide__select-city').onclick = function() {
  document.querySelector('.menu-city').classList.toggle('menu-city--closed');
}

// Показывает/скрывает большую карточку
document.addEventListener("DOMContentLoaded", function(){
  var currentOpenedCard = '';
  var cardList = document.querySelectorAll('.list-cards__item');
  
  function showCard(event) {
    var willOpenCard = this.querySelector('.full-card');
    if(currentOpenedCard){
      currentOpenedCard.classList.add('full-card--closed');
    };
    if(willOpenCard != currentOpenedCard){
      willOpenCard.classList.remove('full-card--closed');
      currentOpenedCard = willOpenCard;
    }else {
      currentOpenedCard = '';
    }
  };
  
  
  for (var i = 0; i < cardList.length; i++) {
    
    cardList[i].addEventListener('click', showCard);
  } ;                

});