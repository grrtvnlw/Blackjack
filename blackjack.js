// Building the deck
const suits = ["spades", "diamonds", "clubs", "hearts"];
const points = [1, 2, 3, 4, 5, 5, 7, 8, 8, 10, 11, 12, 13]

// Assigning arrays for Player Hand and Dealer Hand
let dealerHandArray = [];
let playerHandArray = [];

// Assigning result variables for bet payout
let counterMoney = 500;
let counterBet = 0;

// Assigning global variables to DOM nodes in common use
let dealerHand = document.querySelector("#dealer-hand");
let playerHand = document.querySelector("#player-hand");
let dealerPoints = document.querySelector("#dealer-points");
let playerPoints = document.querySelector("#player-points");
let messages = document.querySelector("#messages");
let messageDiv = document.createElement('div');
let playerBet = document.querySelector("#player-bet");
let playerMoney = document.querySelector("#player-money");

// Function to create our deck
function makeDeck() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < points.length; j++) {
      const card = {point: points[j], suit: suits[i]};
      deck.push(card);
    }
  }
  return deck;
}

// Shuffle function built using the Fisher-Yates Shuffle algorithm
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex = 0;
  let tempValue = 0;

  // while the array is not empty
  while (0 != currentIndex) {
    // choose a random index
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // swap random element with the current element
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

// Instantiate and shuffle the deck
let deck = makeDeck();
shuffle(deck);

// build function for getting a card image URL
function getCardImageURL(card) {
  if (card.point < 2) {
    return `/images/ace_of_${card.suit}.png`;
  } else if (card.point <= 10) {
    return `/images/${card.point}_of_${card.suit}.png`;
  } else if (card.point == 11) {
    return `/images/jack_of_${card.suit}.png`;
  } else if (card.point == 12) {
    return `/images/queen_of_${card.suit}.png`;
  } else if (card.point == 13) {
    return `/images/king_of_${card.suit}.png`;
  }
}

// Build a render function for rendering the card image
function renderImage(url) {
  return `
    <img src='${url}' />
  `
}

// Build a render function for rendering the point total
function renderScore(score) {
  return `
    <div class="score">
      ${score}
    </div>
  `
}

// Build function to place card on table
function placeCards(array, location) {
  while (location.firstChild) {
    location.removeChild(location.firstChild)
  }
  array.forEach(function (card) {
    cardImage = renderImage(getCardImageURL(card))
    location.innerHTML += cardImage;
  })
}

// Build a function to add a new card to an array
function addNewCard(array) {
  array.push(deck.pop())
}

// Deal the Deck function
function dealDeck(deck) {
  messages.innerHTML = "";
  dealerHandArray = [];
  playerHandArray = [];
  addNewCard(dealerHandArray)
  addNewCard(playerHandArray)
  addNewCard(dealerHandArray)
  addNewCard(playerHandArray)
  placeCards(dealerHandArray, dealerHand)
  placeCards(playerHandArray, playerHand)
  dealerScore = renderScore(calculatePoints(dealerHandArray));
  playerScore = renderScore(calculatePoints(playerHandArray));
  dealerPoints.innerHTML = dealerScore;
  playerPoints.innerHTML = playerScore;
  if (calculatePoints(dealerHandArray) == 21 && calculatePoints(playerHandArray) == 21) {
    displayMessage(`Push! Get your $${intBet} back 🤬`);
    adjustMoney("draw");
  };
  if (calculatePoints(dealerHandArray) == 21) {
    displayMessage(`Dealer Blackjack! Lost $${intBet} 🤬`);
    adjustMoney("lost");
  };
  if (calculatePoints(playerHandArray) == 21) {
    displayMessage(`Player Blackjack! Won $${intBet * 2.5} 🤩`);
    adjustMoney("blackjack");
  };
}

/// Display points and keep score
function calculatePoints(array) {
  let score = 0;
  array.forEach(function (card) {
    if (card.point < 2) {
      if (score <= 10) {
        score += 11;
      } else {
        score += 1;
      }
    } else if (card.point >= 10) {
      score += 10;
    } else {
      score += card.point;
    }
  })
    return score;
}

// Build the hit function for Player
function hitPlayer(array) {
  addNewCard(array)
  playerScore = renderScore(calculatePoints(playerHandArray));
  playerPoints.innerHTML = playerScore;
}

// Build the hit function for Dealer
function hitDealer(array) {
  addNewCard(array)
  dealerScore = renderScore(calculatePoints(dealerHandArray));
  dealerPoints.innerHTML = dealerScore;
}

// Build function for changing display message
function displayMessage(displayMe) {
  messageDiv.innerHTML = displayMe;
  messages.appendChild(messageDiv)
}

// Build the function for checking score
function checkScore(dealer, player) {
  if (dealer > player && dealer < 21) {
    displayMessage(`Dealer Wins! Lost $${intBet} 😣`);
    adjustMoney("lost");
  } else if (player > dealer && player < 21) {
    displayMessage(`Player Wins! Won $${intBet * 2} 😏`);
    adjustMoney("won");
  } else if (player == dealer) {
    displayMessage(`Push. Get your $${intBet} back 😑`);
    adjustMoney("draw");
  } else if (dealer == 21) {
    displayMessage(`Dealer 21! Lost $${intBet} 🤬`);
    adjustMoney("lost");
  } else if (player == 21) {
    displayMessage(`Player 21! Won $${intBet * 2} 🤩`);
    adjustMoney("won");
  } else if (dealer > 21) {
    displayMessage(`Dealer Busted! Won $${intBet * 2} 😎`);
    adjustMoney("won");
  } else if (player > 21) {
    displayMessage(`Player Busted! Lost $${intBet} 😭`);
    adjustMoney("lost");
  }
};

// Build checkScore function for double downs
function checkScoreDD(dealer, player) {
  if (dealer > player && dealer < 21) {
    displayMessage(`Big Loser! Lost $${intBet * 2} 🥴🥴🥴`);
    adjustMoney("lostDoubleDown");
    return;
  } else if (player > dealer && player < 21) {
    displayMessage(`Big Winner! Won $${intBet * 4} 🤑🤑🤑`);
    adjustMoney("winDoubleDown");
    return;
  } else if (player == dealer) {
    displayMessage(`Push. Get your $${intBet * 2} back 😅😅😅`);
    adjustMoney("draw");
    return;
  } else if (dealer == 21) {
    displayMessage(`Dealer 21! Lost $${intBet * 2} 🤬🤬🤬`);
    adjustMoney("lostDoubleDown");
    return;
  } else if (player == 21) {
    displayMessage(`Player 21! Big Winner! Won $${intBet * 4} 💰💰💰`);
    adjustMoney("winDoubleDown");
    return;
  } else if (dealer > 21) {
    displayMessage(`Dealer Busted! Won $${intBet * 4} 😎😎😎`);
    adjustMoney("winDoubleDown");
    return;
  } else if (player > 21) {
    displayMessage(`Player Busted. Big Loser! Lost $${intBet * 2} 😭😭😭`);
    adjustMoney("lostDoubleDown");
    return;
  }
};

// Build reset function
function reset(intMoney) {
  playerMoney.innerHTML = intMoney;
  counterMoney = intMoney;
  intBet = 0;
  playerBet.innerHTML = intBet;
  counterBet = 0;
}

// Build function for each outcome
function win() {
  intMoney += counterBet * 2;
  reset(intMoney);
}

function lose() {
  intMoney = playerMoney.innerHTML;
  reset(intMoney);
}

function loseDoubleDown() {
  intMoney -= intBet;
  reset(intMoney);
}

function winDoubleDown() {
  intMoney += counterBet * 4;
  reset(intMoney);
}

function blackjack() {
  intMoney += counterBet * 2.5;
  reset(intMoney);
}

function push() {
  intMoney += counterBet;
  reset(intMoney);
}

// Build a function for adjusting money
function adjustMoney(result) {
  intMoney = parseInt(playerMoney.innerHTML);
  intBet = parseInt(playerBet.innerHTML);
  if (result == "won") {
    win();
    return;
  } else if (result == "lost") {
    lose();
    return;
  } else if (result == "blackjack") {
    blackjack();
    return;
  } else if (result == "draw") {
    push();
    return;
  } else if (result == "lostDoubleDown") {
    loseDoubleDown();
    return;
  } else if (result == "winDoubleDown") {
    winDoubleDown();
    return;
  }
}

// Deal event listener
const deal = document.querySelector('#deal-button');
deal.addEventListener('click', function(e){
  intBet = parseInt(playerBet.innerHTML);
  if (intBet > 0) {
    dealDeck(deck);
  } else if (intBet == 0) {
    displayMessage("Place Bet Cheapskate! 💸")
  };
});

// Hit event listener
const hit = document.querySelector('#hit-button');
hit.addEventListener('click', function(e){
  if (calculatePoints(playerHandArray) < 22) {
    hitPlayer(playerHandArray);
    placeCards(playerHandArray, playerHand);
  };
  if (calculatePoints(playerHandArray) >= 21) {
    checkScore(calculatePoints(dealerHandArray), calculatePoints(playerHandArray));
  };
});

// Stand event listener
const stand = document.querySelector('#stand-button');
stand.addEventListener('click', function(e){
  if (calculatePoints(playerHandArray) < 22) {
    while (calculatePoints(dealerHandArray) <= 17) {
      hitDealer(dealerHandArray);
      placeCards(dealerHandArray, dealerHand);
    };
  checkScore(calculatePoints(dealerHandArray), calculatePoints(playerHandArray));
  };
});

// Double Down event listener
const doubleDown = document.querySelector('#dd-button');
doubleDown.addEventListener('click', function(e){
  if (calculatePoints(playerHandArray) < 22) {
    hitPlayer(playerHandArray);
    placeCards(playerHandArray, playerHand);
    if (calculatePoints(playerHandArray) >= 22) {
      displayMessage("Player Busted. Big Loser! 😭😭😭");
      adjustMoney("lostDoubleDown");
    }
    while (calculatePoints(dealerHandArray) <= 17) {
      hitDealer(dealerHandArray);
      placeCards(dealerHandArray, dealerHand);
    }
    checkScoreDD(calculatePoints(dealerHandArray), calculatePoints(playerHandArray));
  };
});

// Bet Button event listener
const bet = document.querySelector('#bet-button');
bet.addEventListener('click', function(e){ 
  if (dealerPoints.innerHTML == "" || messages.innerHTML != "") {
    counterMoney -= 5;
    playerMoney.innerHTML = counterMoney;
    counterBet += 5;
    playerBet.innerHTML = counterBet;
  };
});