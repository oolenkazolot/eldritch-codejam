import ancientsData from './data/ancients.js';

// let randomNumSlide = getRandomNum(1, 20);

// function getRandomNum(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

const helper = {
  init: function () {
    // состояние
    this.state = {
      // значение выбранной карт
      ancient: null,
      // значение выбранного уровня сложности
      difficulty: null,
    };
    // кнопка замешивания колоды
    this.shuffleButton = document.querySelector('.shuffle-button');
    // при нажатии на кнопку замешивания колоды
    this.shuffleButton.addEventListener('click', this.setCurrentState.bind(this));
    // контейнер замешивания колоды
    this.deckContainer = document.querySelector('.deck-container');
    //контейнер с уровнями сложности
    this.difficultyContainer = document.querySelector('.difficulty-container');
    // при нажатии на контейнер уровней сложности
    this.difficultyContainer.addEventListener('click', this.setDifficulty.bind(this));
    // контейнер карт
    this.ancientsContainer = document.querySelector('.ancients-container');
    // при нажатии на контейнер карт
    this.ancientsContainer.addEventListener('click', this.setAncient.bind(this));
  },
  setAncient: function (e) {
    if (e.target.dataset.ancient) {
      //находим элемент с классом active
      const ancientCard = document.querySelector('.ancient-card.active');

      //проверяем есть ли класс active, если есть удаляем его
      if (ancientCard) {
        ancientCard.classList.remove('active');
      }
      //записываем значение ancient в state
      this.state.ancient = e.target.dataset.ancient;
      // добавляем класс active выбранной карточке
      e.target.classList.add('active');
      // добавляем класс active для появления уровней сложности
      this.difficultyContainer.classList.add('active');
    }
  },
  setDifficulty: function (e) {
    if (e.target.dataset.difficulty) {
      // если у элемента есть атрибут data-difficulty, тогда
      //находим элемент с классом active
      const difficulty = document.querySelector('.difficulty.active');
      if (difficulty) {
        //если элемент с классом active есть, то
        difficulty.classList.remove('active'); // удаляем класс active
      }
      //записываем значение difficulty в state
      this.state.difficulty = e.target.dataset.difficulty;
      // добавляем класс active для отображения выбранного уровня сложности
      e.target.classList.add('active');
      // добавляем класс active для отображения
      this.deckContainer.classList.add('active');
    }
  },
  setCurrentState: function () {
    //мфссив с объектами данных карточек ancients
    const arr = ancientsData;
    // обЪект, с данными выбранной карточки ancient
    let res = arr.find((item) => {
      return item.id === this.state.ancient;
    });
  },
};

helper.init();
