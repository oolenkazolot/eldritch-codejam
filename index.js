import ancientsData from './data/ancients.js';
import cardsDataGreen from './data/mythicCards/green/index.js';
import cardsDataBrown from './data/mythicCards/brown/index.js';
import cardsDataBlue from './data/mythicCards/blue/index.js';

const helper = {
  init: function () {
    // состояние
    this.state = {
      // значение выбранной карт
      ancient: null,
      // значение выбранного уровня сложности
      difficulty: null,
      // массив зеленых карт в зависимости от выбранной карты древнего и от уровня сложности
      greenCardsDifficulty: null,
      // массив коричневых карт в зависимости от выбранной карты древнего и от уровня сложности
      brownCardsDifficulty: null,
      // массив голубых карт в зависимости от выбранной карты древнего и от уровня сложности
      blueCardsDifficulty: null,
      finalDeckCards: null,
      amountCardsForStages: null,
    };
    // карта при нажатии на которую появляется новая карта
    this.deck = document.querySelector('.deck');
    // при клике будет показывать карты по очереди
    this.deck.addEventListener('click', this.showCards.bind(this));

    // кнопка замешивания колоды
    this.shuffleButton = document.querySelector('.shuffle-button');
    // при нажатии на кнопку замешивания колоды
    this.shuffleButton.addEventListener('click', this.startNewGame.bind(this));
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
      // если уровень сложности выбран, то кнопку замешать колоду показывать
      if (this.state.difficulty) {
        this.addShuffleButton();
      }
      // скрыть элементы
      this.hiddenElements();
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

      this.addShuffleButton();
      this.hiddenElements();
    }
  },
  startNewGame: function () {
    // ancientsData - массив объектов для хранения данных карточек ancients;
    // обЪект, с данными выбранной карточки ancient (древнего)
    let res = ancientsData.find((item) => {
      return item.id === this.state.ancient;
    });
    //количество зеленых карт в зависимости от выбранной карты древнего
    let numberOfGreenCards = res.firstStage.greenCards + res.secondStage.greenCards + res.thirdStage.greenCards;
    //количество коричневых карт в зависимости от выбранной карты древнего
    let numberOfBrownCards = res.firstStage.brownCards + res.secondStage.brownCards + res.thirdStage.brownCards;
    //количество голубых карт в зависимости от выбранной карты древнего
    let numberOfBlueCards = res.firstStage.blueCards + res.secondStage.blueCards + res.thirdStage.blueCards;

    // получаем зеленые карты в зависимости от выбранной карты древнего и от уровня сложности
    this.state.greenCardsDifficulty = this.shufflingСards(cardsDataGreen, numberOfGreenCards);
    // получаем коричненые карты в зависимости от выбранной карты древнего и от уровня сложности
    this.state.brownCardsDifficulty = this.shufflingСards(cardsDataBrown, numberOfBrownCards);
    // получаем голубые карты в зависимости от выбранной карты древнего и от уровня сложности
    this.state.blueCardsDifficulty = this.shufflingСards(cardsDataBlue, numberOfBlueCards);

    // массив объектов с количеством карт для каждой стадии, в завистимости от выбранной карты древнего
    this.state.amountCardsForStages = [
      {
        name: 'Первая стадия',
        green: res.firstStage.greenCards,
        blue: res.firstStage.blueCards,
        brown: res.firstStage.brownCards,
        totalAmountCards: res.firstStage.greenCards + res.firstStage.blueCards + res.firstStage.brownCards,
      },
      {
        name: 'Вторая стадия',
        green: res.secondStage.greenCards,
        blue: res.secondStage.blueCards,
        brown: res.secondStage.brownCards,
        totalAmountCards: res.secondStage.greenCards + res.secondStage.blueCards + res.secondStage.brownCards,
      },
      {
        name: 'Третья стадия',
        green: res.thirdStage.greenCards,
        blue: res.thirdStage.blueCards,
        brown: res.thirdStage.brownCards,
        totalAmountCards: res.thirdStage.greenCards + res.thirdStage.blueCards + res.thirdStage.brownCards,
      },
    ];

    //вызываем функцию, которая создаёт контейнер CurrentState и передаём ей stage
    this.createCurrentState();

    //массив карт для каждого этапа
    const firstStageCards = this.gettingStageCards(this.state.amountCardsForStages[0]);
    const secondStageCards = this.gettingStageCards(this.state.amountCardsForStages[1]);
    const thirdStageCards = this.gettingStageCards(this.state.amountCardsForStages[2]);

    // один общий массив карт со всеми этапами, сначала первый, потом второй этап, потом третий этап
    this.state.finalDeckCards = [...firstStageCards, ...secondStageCards, ...thirdStageCards];
    const lastCard = document.querySelector('.last-card');
    lastCard.style.backgroundImage = ``;
    this.showElements();
  },
  shufflingСards: function (cardsData, numberOfCards) {
    const cardsDataShuffle = this.shuffleArray(cardsData);

    // получаем карты в зависимости от выбранной карты древнего и от уровня сложности
    let cardsDifficulty = [];
    // выбираем нужные карточки по уровню сложности

    cardsDifficulty = cardsDataShuffle.filter((element) => {
      if (this.state.difficulty === 'very-easy') {
        return element.difficulty === 'easy';
      }
      if (this.state.difficulty === 'easy') {
        return element.difficulty === 'easy' || element.difficulty === 'normal';
      }
      if (this.state.difficulty === 'hard') {
        return element.difficulty === 'normal' || element.difficulty === 'hard';
      }
      if (this.state.difficulty === 'very-hard') {
        return element.difficulty === 'hard';
      }
      return element;
    });

    // если карточек нужного уровня сложности вернулось больше чем нам нужно, то обрезаем массив (в переменной numberOfGreenCards имется сколько нужно карточек)
    if (cardsDifficulty.length > numberOfCards) {
      // количество лишних карточек
      const amountExtraСards = cardsDifficulty.length - numberOfCards;
      // массив с необходимыми карточками по количеству и уровню сложности
      cardsDifficulty = cardsDifficulty.slice(amountExtraСards);
      return cardsDifficulty;
    }

    // если карточек нужного уровня сложности меньше, чем нам нужно, то добавляем обычные карточки
    if (cardsDifficulty.length < numberOfCards) {
      // количество нехватающих карточек
      const amountMissingСards = numberOfCards - cardsDifficulty.length;
      //  нехватающие карточки
      let normalCards = cardsDataShuffle.filter((element) => {
        return element.difficulty === 'normal';
      });
      //  нехватающиe карточки
      const missingСards = normalCards.slice(0, amountMissingСards);
      //  объединяем карточки с нехватающиe карточками
      cardsDifficulty = cardsDifficulty.concat(missingСards);
      return this.shuffleArray(cardsDifficulty);
    }

    return cardsDifficulty;
  },
  shuffleArray: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
  createCurrentState: function () {
    const currentState = document.querySelector('.current-state');
    currentState.textContent = '';
    for (let i = 0; i < this.state.amountCardsForStages.length; i++) {
      const stageContainer = this.createStageContainer(this.state.amountCardsForStages[i], i);
      currentState.append(stageContainer);
    }
  },
  createStageContainer: function (amountCardsForStages, i) {
    const stageContainer = document.createElement('div');
    stageContainer.classList.add('stage-container');
    const stageText = document.createElement('span');
    stageText.classList.add('stage-text');
    stageText.textContent = amountCardsForStages.name;
    // если totalAmountCards в стадии равен нулю, добавляем класс done (для изменения цвета текста выполненной стадии)
    if (!this.state.amountCardsForStages[i].totalAmountCards) {
      stageText.classList.add('done');
    }
    stageContainer.append(stageText);
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots-container');
    const dotGreen = document.createElement('div');
    dotGreen.classList.add('dot');
    dotGreen.classList.add('green');
    dotGreen.textContent = amountCardsForStages.green;
    dotsContainer.append(dotGreen);
    const dotBrown = document.createElement('div');
    dotBrown.classList.add('dot');
    dotBrown.classList.add('brown');
    dotBrown.textContent = amountCardsForStages.brown;
    dotsContainer.append(dotBrown);
    const dotBlue = document.createElement('div');
    dotBlue.classList.add('dot');
    dotBlue.classList.add('blue');
    dotBlue.textContent = amountCardsForStages.blue;
    dotsContainer.append(dotBlue);
    stageContainer.append(dotsContainer);
    return stageContainer;
  },
  hiddenElements: function () {
    const currentState = document.querySelector('.current-state');
    const lastCard = document.querySelector('.last-card');
    currentState.classList.remove('active');
    this.deck.classList.remove('active');
    lastCard.classList.remove('active');
  },
  showElements: function () {
    const currentState = document.querySelector('.current-state');
    const lastCard = document.querySelector('.last-card');
    currentState.classList.add('active');
    this.deck.classList.add('active');
    lastCard.classList.add('active');
    this.hiddenShuffleButton();
  },
  addShuffleButton: function () {
    this.deckContainer.classList.add('active');
    this.shuffleButton.classList.add('active');
  },
  hiddenShuffleButton: function () {
    this.shuffleButton.classList.remove('active');
  },
  //получение карт для стадий
  gettingStageCards: function (amountCardsForStages) {
    let cardsForStage = [];
    const greenCards = this.state.greenCardsDifficulty.splice(0, amountCardsForStages.green);
    const blueCards = this.state.blueCardsDifficulty.splice(0, amountCardsForStages.blue);
    const brownCards = this.state.brownCardsDifficulty.splice(0, amountCardsForStages.brown);
    cardsForStage = greenCards.concat(blueCards, brownCards);
    this.shuffleArray(cardsForStage);
    return cardsForStage;
  },
  // показ карт стек
  showCards: function () {
    const lastCard = document.querySelector('.last-card');
    lastCard.style.backgroundImage = `url("${this.state.finalDeckCards[0].cardFace}")`;
    this.trekerDeck();
    this.state.finalDeckCards.shift();
    // если в массиве финальной колоды уже нет элементов, удаляем класс актив, чтобы скрыть рубашку карты
    if (!this.state.finalDeckCards.length) {
      this.deck.classList.remove('active');
    }
  },
  // трекер текущего состояния колоды
  trekerDeck: function () {
    //массив с span.stage-text наименования стадии

    if (this.state.amountCardsForStages[0].totalAmountCards) {
      this.state.amountCardsForStages[0][this.state.finalDeckCards[0].color] -= 1;
      this.state.amountCardsForStages[0].totalAmountCards -= 1;
    } else if (this.state.amountCardsForStages[1].totalAmountCards) {
      this.state.amountCardsForStages[1][this.state.finalDeckCards[0].color] -= 1;
      this.state.amountCardsForStages[1].totalAmountCards -= 1;
    } else if (this.state.amountCardsForStages[2].totalAmountCards) {
      this.state.amountCardsForStages[2][this.state.finalDeckCards[0].color] -= 1;
      this.state.amountCardsForStages[2].totalAmountCards -= 1;
    }
    this.createCurrentState();
  },
};

helper.init();
