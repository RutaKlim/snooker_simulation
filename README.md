# Snooker physics simulation

Access project here: https://rutaklim.github.io/snooker_simulation/

Made with HTML Canvas, Tailwind CSS and JS, to replicate a snooker simulation using real-life physics and maths.

## Introduction

This project is an interactive browser-based snooker simulation that is made using mainly HTML Canvas and JS, as I wanted to implement real physical and mathemtatical principles while developing my JS knowledge in OOP and general problem-solving within programming.

Below I will show all the working out and steps in order of how I got to the final product of the simulation, as I also want to show that I made this myself and did not AI generate it.

## Contents of demo

The snooker simulation includes:

- live ball movement
- acceleration & deceleration/friction
- wall deflection
- ball collision
- pocket detection
- dropping cue ball
- trajectory projection
- snooker game and rules
- score system
- Fault play detection and with error messages
- live instruction messages telling player how to play step-by-step

## #1 Create the board

Drew out the table, borders, lines, pockets, ball positions and balls.

[Sketch of a snooker table, showing measurements of the table and proportions to calculate where the lines and balls are positioned.](src/assets/table-drawing.PNG)

How I worked out where the red balls go, using Pythagoras Theorem:

[Sketch of a all the red balls on the table, and how I calculated the distances between them with working out.](src/assets/red-balls-drawing.PNG)

## #2 Making a ball move

First, I made a ball just move in a straight line, then with constant acceleration.

Each ball object has a current position coordinate (`curX, curY`) and velocity (`velocityX, velocity Y`).

### Speed

Speed is calculated as: `speed = √(vx² + vy²)`

In code:

`const speed = Math.hypot(ball.velocityX, ball.velocityY);`

### Deceleration/friction

In this simulation friction was approximated using constant deceleration. I scaled both velocitys simultaneously by doing, so that the ball's direction of movement doesn't alter:

`
const scale = nextSpeed / speed;

ball.velocityX _= scale;
ball.velocityY _= scale;
`

## #3 Ball Collision Detection

While the balls move, a function checks at every drawing cycle, whether two balls are in contact which is activated whether: `distance between balls < ball.radius + otherBall.radius`

BUT i also calculate the **overlap** between balls as the simulation runs in discrete frames, so sometimes they can move slightly into eachother before the function for checking collisions is run. This happens when the speed is very high. So I calculate the overlap by:

`overlap = (ball.radius + otherBall.radius) - distance`

then move each ball 1 radius away from eachother in the opposite direction by:

```
ball.curX -= (normalX * overlap) / 2;
ball.curY -= (normalY * overlap) / 2;
```

to both balls.

Where distance between the two balls is calculated by:

`distance = √((x₂ - x₁)² + (y₂ - y₁)²)`

And in the code as:

```
const dx = otherBall.curX - ball.curX;
const dy = otherBall.curY - ball.curY;
const distance = Math.hypot(dx, dy);
```

Then once a collision detected, I calculate the collision normal which is the direction where one of the balls will go.

```
const dx = otherBall.curX - ball.curX;
const dy = otherBall.curY - ball.curY;
const distance = Math.hypot(dx, dy);
```

## #4 Elastic Collision

For elastic collision between the balls I had to do a bit of research to fully understand it, so I got most of my information from this wikepedia site: https://en.wikipedia.org/wiki/Elastic_collision

For this simulation, collision between balls is modelled as a perfectly elastic collsion between equal-mass balls, which simplified most equations due to equal mass.

!!!!!!!!!!!!!!!!!!!!! NEED TO STUDY THIS FULLY !!!!!!!!!!!!!!!

## #5 Cushion Deflection

Colliding with a vertical wall results in:

`vx --> -vx`

And with a horizontal wall:

`vy --> -vy`

And in the case that the ball crosses the wall boundary, the balls are moved back to the border so that they do not embedd inside the cushion.

[Sketch of a ball reflecting against all sides (left, right, top and bottom)](src\assets\wall-deflection-drawing.PNG)
