# Helper App for the game "Eldritch Horror"

Stack: HTML, CSS, JavaScript

[Link](https://oolenkazolot.github.io/eldritch-codejam/)

Many tabletop game enthusiasts have heard of "Eldritch Horror" as one of the most exciting tabletop adventures. However, there is one challenge: preparing for the game can take inexperienced players anywhere from 40 minutes to an hour, and one of the most complex conditions is assembling the Myth deck. That's why I created a Helper App for the game "Eldritch Horror".

Key Skill: Creating a complex deck shuffling algorithm in pure JavaScript

## Start Helper

<image src="assets/screenshots/Screenshot_1.png" alt="start">

## Algorithm Conditions

When assembling the Myth deck in the game, three different types of cards are used: blue, brown, and green (determined by the color strip at the top of the card).

Additionally, there are different levels of complexity for the cards:

Complex cards have tendrils around the title, like the blue card in the example.
Normal cards have no markings, like the brown card in the example.
Easy cards have snowflake symbols around the title, like the green card in the example.
In the initial stage of the game, the player needs to choose an Ancient One, which determines the deck composition and the number of cards of each color needed at each stage of the game.

The composition of cards required for the game is calculated by adding up the cards of different colors for all three stages. Based on the example, the following cards are needed:
Green cards: 5
Blue cards: 2
Brown cards: 9

Game difficulty levels:

Very Easy: All cards with snowflake symbols are included in the set, and if there aren't enough, normal cards are added.
Easy: Cards with tendrils are removed from the set.
Medium: The set remains unchanged.
Hard: Cards with snowflake symbols are removed from the set.
Very Hard: All cards with tendrils are included in the set, and if there aren't enough, normal cards are added.
