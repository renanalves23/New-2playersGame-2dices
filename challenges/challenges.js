/*
  GAME RULES:
  - O jogo tem 2 jogadores, jogando em rounds
  - A cada rodada, um jogador joga o dado quantas vezes quiser. Cada resultado é adicionado ao seu ROUND SCORE
  - MAS, se o jogador tirar o número '1' no dado, todo seu placar é perdido. Após iss, é a vez do outro jogador
  - O jogador pode excolher 'HOLD' "SEGURAR", que significa que seu ROUND Score é adicionado ao seu Global Score. Após isso, é a vez do outro jogador
  - O primeiro a alcançar 100 pontos no Global ganha o jogo


  - The game has 2 players, playing in rounds
  - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
  - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
  - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
  - The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice; //armazenado o valor no escopo global


//dice logic
//dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);

//setter
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


//getter
  // var  x =  document.querySelector('#score-0').textContent;
  // console.log(x);



document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {  
          //1.random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //guarda valor do dado para regra do duplo 6

        //2. display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
           //document.querySelector('.dice').style.display = 'block';
           //acrescenta a imagem do dado
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3.
        if (dice1 !== 1 && dice2 !== 1) {
          //adicinar score
          roundScore += dice1 + dice2;
          //display
          document.querySelector('#current-' + activePlayer).textContent = roundScore;
   }else {
          //próximo jogador
          nextPlayer();
        }    

  //   if (dice === 6 && lastDice === 6) {
  //       //player perde o Score todo
  //       scores[activePlayer] = 0;
  //       document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  //       nextPlayer();
  //       }//3. atualizar o roundScore quando número for diferente de 1
  //   else if (dice !== 1) {
  //         //adicinar score
  //         roundScore += dice;
  //         //display
  //         document.querySelector('#current-' + activePlayer).textContent = roundScore;
  //  }else {
  //         //próximo jogador
  //         nextPlayer();
  //       }    

  //       lastDice = dice; //colocada por ultimo para armazenar e logo após o loop, é armazenada no escopo global
  }
  
});



document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
            //adicionar current-score para global-score
          scores[activePlayer] += roundScore;
          //atualizar a UI
              document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

              var input = document.querySelector('.final-score').value;

              var winningScore;

          //undefined, 0, null or ""  are COERSED to false
          //anything else is coerced to true
    if(input) {
        winningScore = input;
    }else {
      winningScore = 100;
    }

  //verificar se o player ganhou o jogo
  if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            //tirar o display do dado
                // document.querySelector('.dice').style.display = 'none';
                document.getElementById('dice-1').style.display = 'none';
              document.getElementById('dice-2').style.display = 'none';
            //class de personalização do 'winner e remover a bolinha do active player no rounds
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
  }else {
  //next Player
  nextPlayer();
    }
  }
   
});

function nextPlayer() {
//próximo jogador
activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
//rounscore volta a ser 0
roundScore = 0;

document.getElementById('current-0').textContent  = '0';
document.getElementById('current-1').textContent  = '0';

document.querySelector('.player-0-panel').classList.toggle('active');
document.querySelector('.player-1-panel').classList.toggle('active');

// document.querySelector('.player-0-panel').classList.remove('active');
// document.querySelector('.player-1-panel').classList.add('active');

document.getElementById('dice-1').style.display = 'none';
 document.getElementById('dice-2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
        scores = [0, 0];
        activePlayer = 0;
        roundScore = 0;
        gamePlaying = true;

        //hide dice
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
          //modifying HTML numbers
        document.getElementById('score-0').textContent = 0;
        document.getElementById('score-1').textContent = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';

        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');

}
