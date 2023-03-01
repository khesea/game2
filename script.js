//обозначаем карты
let cardOne = null;
let cardTwo = null;
let clickPermission = true;

//обозначаем попытки
let trying = document.getElementsByClassName('trying')[0].querySelector('span');

//обозначаем успешные угадывания
let successing = document.getElementsByClassName('successing')[0].querySelector('span');

//расширяю встроенный объект
Array.prototype.shuffle = function() {
  let input = this;

  for (let i = input.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
}

//создаю массив с иконками
const array = ['<i class="fa fa-compass"></i>', '<i class="fa fa-cloud"></i>','<i class="fa fa-play"></i>', '<i class="fa fa-bolt"></i>',
'<i class="fa fa-stop"></i>', '<i class="fa fa-bolt"></i>', '<i class="fa fa-cogs"></i>', '<i class="fa fa-play"></i>', '<i class="fa fa-atom"></i>',
'<i class="fa fa-cogs"></i>', '<i class="fa fa-compass"></i>', '<i class="fa fa-atom"></i>', '<i class="fa fa-stop"></i>', '<i class="fa fa-basketball-ball"></i>',
'<i class="fa fa-cloud"></i>', '<i class="fa fa-basketball-ball"></i>']

//перемешиваю массив
let shuffleArray = array.shuffle();

//обозначаем игровые карты
const cards = document.getElementsByClassName("game-card");
for (let i = 0; i < cards.length; i++) {
  cards[i].innerHTML += shuffleArray[i];
}

//добавляем иконку вопроса на все карточки
for (let i = 0; i < cards.length; i++) {
  cards[i].innerHTML += '<i class="fa fa-question-circle"></i>';
}

//функция клика на карточку
for (let i = 0; i < cards.length; i++) {
  cards[i].onclick = function () {
    //если на нее кликнули и карта уже не отгадана, она поварачивается
    if (clickPermission == true && !cards[i].classList.contains("okay")) {
      cards[i].classList.add("flip");
    //добавляем значение переменной кардВан в виде всего дива этой карты
      if (cardOne == null) {
        cardOne = i;
      } else {
      //далее на следующий нажим cardOne уже не нулл, он равен значению i
      //если значение i новонажатой карты не равно кардВан, то i присуждается переменной cardTwo
        if (i != cardOne) {
          cardTwo = i;
          clickPermission = false;
        }
      }

    //далее идёт проверка нажатых карт
      if (cardOne != null && cardTwo != null && cardOne != cardTwo) {
        //если значения названий классов первого элемента сопадают со второй карточкой
        if (
          cards[cardOne].firstElementChild.className ===
          cards[cardTwo].firstElementChild.className
        ) {
          //то за полсекунды происходит следующее:
          setTimeout(() => {
            //обеим картам присуждается новый класс с зеленым фоном
            cards[cardOne].classList.add("okay");
            cards[cardTwo].classList.add("okay");
            //также обнуляются переменные cardOne и cardTwo и плюсуется счётчик
            cardOne = null;
            cardTwo = null;
            clickPermission = true;
            successing.innerHTML = parseInt(successing.innerText) + 1;
          }, 500);
        } else {
          //если значения не совпадают, то обе карты переворачиваются и значения переменных обнуляются
          setTimeout(() => {
            cards[cardOne].classList.remove("flip");
            cards[cardTwo].classList.remove("flip");

            cardOne = null;
            cardTwo = null;
            clickPermission = true;
          }, 1000);
        }
        //неважно угадал-не угадал, счётчик попыток прибавится
        trying.innerHTML = parseInt(trying.innerText) + 1;
      }
    }
  };
}

//разрешаю сыграть заново
const again = document.querySelector('#play_again');
again.addEventListener('click', playAgain, false);

function playAgain() {
  location.reload();
}
