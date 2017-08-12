frontend-nanodegree-arcade-game
===============================

## How to start the game.
In the same directory as this README you will find a file called index.html. Open this file in your browser or dubble click this file to start your browser with this file already loaded.

## Rules of the game
You can move the player character with the arrow keys on your keyboard.

Note that you can't leave the board.

The objective of the game is to avoid the bugs and to reach the water on the other side. Every time you reach the water the player is moved back to the starting point and the score gets increased by one point.

The bugs need to be avoided at all cost. If a bug collides with the player the game is lost. The score is set back to 0 and the game is restarted.

The bugs patrol the stone lanes. You are save on the grass but you won't earn any points by staying on the grass.

The speed of the bug is randomly generated between a minimum and maximum value. To increase the difficulty these minimum and maximum values increase as the score increases. Also whenever the score is divisible by 5 a bug is added. At the start of the game there are two bugs to avoid once the score hit 5 there are 3. When the score hit 10 there will be 4 bugs and so on. 
