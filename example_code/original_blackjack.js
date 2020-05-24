// Building the deck
const suits = ["spades", "diamonds", "clubs", "hearts"];
const points = [1, 2, 3, 4, 5, 5, 7, 8, 8, 10, 11, 12, 13]

// Assigning arrays for Player Hand and Dealer Hand
let dealerHandArray = [];
let playerHandArray = [];

// Assigning result variables for bet payout
let counterMoney = 500
let counterBet = 0

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
    <div class="image">
      <img src='${url}' />
    </div>
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

// Create and shuffle the deck
let deck = makeDeck();
console.log(deck);
shuffle(deck);

// Deal the Deck function
function dealDeck(deck) {
  dealerHandArray.push(deck.pop())
  playerHandArray.push(deck.pop())
  dealerHandArray.push(deck.pop())
  playerHandArray.push(deck.pop())
}

// Display points and keep score
// function calculatePoints(array) {
//   let score = 0;
//   array.forEach(function (card) {
//     if (card.point < 2) {
//       if (score <= 10) {
//         score += 11;
//       } else {
//         score += 1;
//       }
//     } else if (card.point >= 10) {
//       score += 10;
//     } else {
//       score += card.point;
//     }
//   })
//     return score;
// }

// testing aces
function calculatePoints(array) {
  // let totalAces = []
  let score = 0;
  array.forEach(function (card) {
    if (card.point < 2) {
      // totalAces.push(card)
      if (score <= 10) {
        score += 11;
      } else if (score > 21) {
        score -= 10;
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
// Build a function to handle aces 
// function handleAces(card, score) {
//   let totalAces = 0;
//   let Ace = "";
//   if (card.points == 1) {
//     totalAces += 1
//   }
//   while (score <= 21) {
//     if (totalAces <= 1) {
      
//     }
//   }

// }

// Build the hit function for Player
function hitPlayer(array) {
    const messages = document.querySelector("#messages");
    const messageDiv = document.createElement('div');
    newCard = deck.pop();
    array.push(newCard);
    if (calculatePoints(array) > 21) {
      messageDiv.innerHTML = "Player Busted 😭";
      messages.appendChild(messageDiv);
      adjustMoney("lost")
      // return
    } else if (calculatePoints(array) == 21) {
      messageDiv.innerHTML = "Player Blackjack! 🤩";
      messages.appendChild(messageDiv);
      adjustMoney("blackjack")
      // return
    }
    else {
      return array;
    }
}

// Build the hit function for Dealer
function hitDealer(array) {
  const messages = document.querySelector("#messages");
  const messageDiv = document.createElement('div');
  newCard = deck.pop()
  array.push(newCard)
  if (calculatePoints(array) > 21) {
    messageDiv.innerHTML = "Dealer Busted 😎";
    messages.appendChild(messageDiv)
    adjustMoney("won")
    // return
  } else if (calculatePoints(array) == 21) {
    messageDiv.innerHTML = "Dealer Blackjack! 🤬";
    messages.appendChild(messageDiv);
    adjustMoney("lost")
    // return
  }
  else {
    return array;
  }
}

// Build the function for checking score
function checkScore(dealer, player) {
  const messages = document.querySelector("#messages");
  const messageDiv = document.createElement('div');
  let playerBet = document.querySelector("#player-bet");
  let playerMoney = document.querySelector("#player-money");
  let dealerFinal = dealer;
  let playerFinal = player;
  // let doubleDownValue = doubledown;

  // if (doubleDownValue == false) {
  if (dealerFinal > playerFinal && dealerFinal < 21) {
    messageDiv.innerHTML = "Dealer Wins! 😣";
    messages.appendChild(messageDiv)
    adjustMoney("lost")
  } else if (playerFinal > dealerFinal && playerFinal < 21) {
    messageDiv.innerHTML = "Player Wins! 😏";
    messages.appendChild(messageDiv)
    adjustMoney("won")
  } else if (playerFinal == dealerFinal) {
    messageDiv.innerHTML = "Push 😑";
    messages.appendChild(messageDiv)
    adjustMoney("draw")
  }
};

// Build a function for giving money
function adjustMoney(result) {
  let playerBet = document.querySelector("#player-bet");
  let playerMoney = document.querySelector("#player-money");
  intMoney = parseInt(playerMoney.innerHTML);
  intBet = parseInt(playerBet.innerHTML);
  if (result == "won") {
    intMoney += (intBet * 2);
    playerMoney.innerHTML = intMoney;
    counterMoney = intMoney;
    intBet = 0;
    playerBet.innerHTML = intBet;
    counterBet = 0;
  } else if (result == "lost") {
    // intMoney -= intBet;
    playerMoney.innerHTML = playerMoney.innerHTML;
    counterMoney = counterMoney;
    intBet = 0;
    playerBet.innerHTML = intBet;
    counterBet = 0;
  } else if (result == "blackjack") {
    intMoney += (intBet * 2.5);
    playerMoney.innerHTML = intMoney;
    counterMoney = intMoney;
    intBet = 0;
    playerBet.innerHTML = intBet;
    counterBet = 0;
  } else if (result == "draw") {
    intMoney += intBet;
    playerMoney.innerHTML = intMoney;
    counterMoney = intMoney;
    intBet = 0;
    playerBet.innerHTML = intBet;
    counterBet = 0;
  } else if (result == "wonDD") {
    // console.log(intBet)
    // console.log(intMoney)
    intMoney += (intBet * 2);
    playerMoney.innerHTML = intMoney;
    counterMoney = intMoney;
    intBet = 0;
    playerBet.innerHTML = intBet;
    counterBet = 0;
  } else if (result == "lostDD") {
    // console.log(intBet)
    // console.log(intMoney)
    intMoney -= (intBet / 2);
    playerMoney.innerHTML = intMoney; //intMoney
    counterMoney = intMoney;
    intBet = 0;
    playerBet.innerHTML = intBet;
    counterBet = 0;
  } else if (result == "wonDDBlackJack") {
    // console.log(intBet)
    // console.log(intMoney)
    intMoney += (intBet * 2.5);
    playerMoney.innerHTML = intMoney;
    counterMoney = intMoney;
    intBet = 0;
    playerBet.innerHTML = intBet;
    counterBet = 0;
  }
}

// Deal event listener
const deal = document.querySelector('#deal-button');
deal.addEventListener('click', function(e){
  let dealerHand = document.querySelector("#dealer-hand");
  let playerHand = document.querySelector("#player-hand");
  let dealerPoints = document.querySelector("#dealer-points");
  let playerPoints = document.querySelector("#player-points");
  let messages = document.querySelector("#messages");
  let playerBet = document.querySelector("#player-bet");
  intBet = parseInt(playerBet.innerHTML);
  if (dealerPoints.innerHTML == "") {
    if (intBet > 0) {
      messages.innerHTML = "";
      dealDeck(deck)
      const cardImageOne = document.createElement('img');
      const cardImageTwo = document.createElement('img');
      const cardImageThree = document.createElement('img');
      const cardImageFour = document.createElement('img');
      cardImageOne.src = getCardImageURL(dealerHandArray[0])
      cardImageTwo.src = getCardImageURL(dealerHandArray[1])
      cardImageThree.src = getCardImageURL(playerHandArray[0])
      cardImageFour.src = getCardImageURL(playerHandArray[1])
      dealerHand.appendChild(cardImageOne)
      dealerHand.appendChild(cardImageTwo)
      playerHand.appendChild(cardImageThree)
      playerHand.appendChild(cardImageFour)
      dealerScore = renderScore(calculatePoints(dealerHandArray));
      playerScore = renderScore(calculatePoints(playerHandArray));
      dealerPoints.innerHTML = dealerScore;
      playerPoints.innerHTML = playerScore;
      if (calculatePoints(dealerHandArray) == 21) {
        const messages = document.querySelector("#messages");
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = "Dealer Blackjack! 🤨";
        messages.appendChild(messageDiv)
        adjustMoney("lost");
      };
      if (calculatePoints(playerHandArray) == 21) {
        const messages = document.querySelector("#messages");
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = "Player Blackjack! 🤗";
        messages.appendChild(messageDiv);
        adjustMoney("blackjack");
      };
    } else if (intBet == 0) {
      let messages = document.querySelector("#messages");
      const messageDiv = document.createElement('div');
      messageDiv.innerHTML = "Place Bet Cheapskate! 💰";
      messages.appendChild(messageDiv);
    }
  }
  else if (dealerPoints.innerHTML != "") {
    if (intBet > 0) {
      dealerHand.innerHTML = "";
      playerHand.innerHTML = "";
      dealerPoints.innerHTML = "";
      playerPoints.innerHTML = "";
      messages.innerHTML = "";
      dealerHandArray = [];
      playerHandArray = [];
      dealDeck(deck);
      const cardImageOne = document.createElement('img');
      const cardImageTwo = document.createElement('img');
      const cardImageThree = document.createElement('img');
      const cardImageFour = document.createElement('img');
      cardImageOne.src = getCardImageURL(dealerHandArray[0]);
      cardImageTwo.src = getCardImageURL(dealerHandArray[1]);
      cardImageThree.src = getCardImageURL(playerHandArray[0]);
      cardImageFour.src = getCardImageURL(playerHandArray[1]);
      dealerHand.appendChild(cardImageOne);
      dealerHand.appendChild(cardImageTwo);
      playerHand.appendChild(cardImageThree);
      playerHand.appendChild(cardImageFour);
      dealerScore = renderScore(calculatePoints(dealerHandArray));
      playerScore = renderScore(calculatePoints(playerHandArray));
      dealerPoints.innerHTML = dealerScore;
      playerPoints.innerHTML = playerScore;
      if (calculatePoints(dealerHandArray) == 21) {
        const messages = document.querySelector("#messages");
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = "Dealer Blackjack! 🤨";
        messages.appendChild(messageDiv);
        adjustMoney("lost");
      };
      if (calculatePoints(playerHandArray) == 21) {
        const messages = document.querySelector("#messages");
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = "Player Blackjack! 🤗";
        messages.appendChild(messageDiv);
        adjustMoney("blackjack");
      };
    } else if (intBet == 0) {
      let messages = document.querySelector("#messages");
      const messageDiv = document.createElement('div');
      messageDiv.innerHTML = "Place Bet Cheapskate! 💰";
      messages.appendChild(messageDiv);
    }
  };
});

// Hit event listener
const hit = document.querySelector('#hit-button');
hit.addEventListener('click', function(e){
  const playerHand = document.querySelector("#player-hand");
  const dealerHand = document.querySelector("#dealer-hand");
  const dealerPoints = document.querySelector("#dealer-points");
  const playerPoints = document.querySelector("#player-points");
  if (calculatePoints(playerHandArray) < 22) {
    hitPlayer(playerHandArray)
    const cardImagePlayer = document.createElement('img');
    cardImagePlayer.src = getCardImageURL(playerHandArray[playerHandArray.length - 1])
    playerHand.appendChild(cardImagePlayer)
    playerScore = renderScore(calculatePoints(playerHandArray));
    playerPoints.innerHTML = playerScore;
  }
});

// Stand event listener
const stand = document.querySelector('#stand-button');
stand.addEventListener('click', function(e){
  const dealerPoints = document.querySelector("#dealer-points");
  const dealerHand = document.querySelector("#dealer-hand");
  // console.log("stand")
  // console.log(calculatePoints(dealerHandArray))
  if (calculatePoints(playerHandArray) < 22) {
    while (calculatePoints(dealerHandArray) <= 17) {
      hitDealer(dealerHandArray)
      const cardImageDealer = document.createElement('img');
      cardImageDealer.src = getCardImageURL(dealerHandArray[dealerHandArray.length - 1])
      dealerHand.appendChild(cardImageDealer)
      dealerScore = renderScore(calculatePoints(dealerHandArray));
      dealerPoints.innerHTML = dealerScore;
    }
  checkScore(calculatePoints(dealerHandArray), calculatePoints(playerHandArray))
  }
});

// Double Down event listener
const doubleDown = document.querySelector('#dd-button');
doubleDown.addEventListener('click', function(e){
  const playerHand = document.querySelector("#player-hand");
  const dealerHand = document.querySelector("#dealer-hand");
  const dealerPoints = document.querySelector("#dealer-points");
  const playerPoints = document.querySelector("#player-points");
  const messages = document.querySelector("#messages");
  const messageDiv = document.createElement('div');
  if (calculatePoints(playerHandArray) < 22) {
    let playerBet = document.querySelector("#player-bet");
    let playerMoney = document.querySelector("#player-money");
    // counterMoney *= 2;
    playerMoney.innerHTML = counterMoney;
    counterBet *= 2;
    playerBet.innerHTML = counterBet;
    newCard = deck.pop();
    playerHandArray.push(newCard);
    if (calculatePoints(playerHandArray) > 21) {
      messageDiv.innerHTML = "Player Busted. Big Loser! 😭😭😭";
      messages.appendChild(messageDiv);
      adjustMoney("lostDD")
      // return
    } else if (calculatePoints(playerHandArray) == 21) {
      messageDiv.innerHTML = "Player Blackjack! Big Winner 💰💰💰";
      messages.appendChild(messageDiv);
      adjustMoney("wonDDBlackJack")
      // return
    }
    const cardImagePlayer = document.createElement('img');
    cardImagePlayer.src = getCardImageURL(playerHandArray[playerHandArray.length - 1])
    playerHand.appendChild(cardImagePlayer)
    playerScore = renderScore(calculatePoints(playerHandArray));
    playerPoints.innerHTML = playerScore;
  }
  if (calculatePoints(playerHandArray) < 22) {
    while (calculatePoints(dealerHandArray) <= 17) {
      // hitDealer(dealerHandArray)
      // const messages = document.querySelector("#messages");
      // const messageDiv = document.createElement('div');
      newCard = deck.pop()
      dealerHandArray.push(newCard)
      if (calculatePoints(dealerHandArray) > 21  && calculatePoints(playerHandArray) != 21) {
        messageDiv.innerHTML = "Dealer Busted 😎😎😎";
        messages.appendChild(messageDiv)
        adjustMoney("wonDD")
        // return
      } else if (calculatePoints(dealerHandArray) == 21) {
        messageDiv.innerHTML = "Dealer Blackjack! 🤬🤬🤬";
        messages.appendChild(messageDiv);
        adjustMoney("lostDD")
        // return
      }
      const cardImageDealer = document.createElement('img');
      cardImageDealer.src = getCardImageURL(dealerHandArray[dealerHandArray.length - 1])
      dealerHand.appendChild(cardImageDealer)
      dealerScore = renderScore(calculatePoints(dealerHandArray));
      dealerPoints.innerHTML = dealerScore;
    }
    // checkScore(calculatePoints(dealerHandArray), calculatePoints(playerHandArray))
  }
  if (calculatePoints(dealerHandArray) > calculatePoints(playerHandArray) && calculatePoints(dealerHandArray) < 21) {
    messageDiv.innerHTML = "Big Loser! 🥴";
    messages.appendChild(messageDiv)
    adjustMoney("lostDD")
  } else if (calculatePoints(playerHandArray) > calculatePoints(dealerHandArray) && calculatePoints(playerHandArray) < 21) {
    messageDiv.innerHTML = "Big Winner! 🤑";
    messages.appendChild(messageDiv)
    adjustMoney("wonDD")
  } else if (calculatePoints(playerHandArray) == calculatePoints(dealerHandArray)) {
    messageDiv.innerHTML = "Push 😅";
    messages.appendChild(messageDiv)
    adjustMoney("draw")
    }
});

// Bet Button event listener
const bet = document.querySelector('#bet-button');
bet.addEventListener('click', function(e){ 
  let playerBet = document.querySelector("#player-bet");
  let playerMoney = document.querySelector("#player-money");
  let dealerPoints = document.querySelector("#dealer-points");
  let messages = document.querySelector("#messages");
  // let counterBet = 0
  if (dealerPoints.innerHTML == "" || messages.innerHTML != "") {
    counterMoney -= 5;
    playerMoney.innerHTML = counterMoney;
    counterBet += 5;
    playerBet.innerHTML = counterBet;
  }
});