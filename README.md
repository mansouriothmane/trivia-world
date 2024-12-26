# Trivia World

Trivia World is a single-page application that allows users to take trivia quizzes, with options like the topic and the difficulty of the questions. The Angular framework has been used (v19). The data is retrieved dynamically from an open source online database (OpenTDB).

## Motivation

I built this app as a way of "learning by doing", with a main goal of understanding the Angular framework. It was also an opportunity to discover tools like Sass.

## Encoutered problems

- How to navigate between questions with next and reverse buttons while keeping the selected answer. Had to read about Angular forms : Reactive forms VS Template-driven forms. Solved by using the second one (the simplest).

## User Flow

- From the homepage, a button redirects to quiz creation
- In quiz creation, the user selects a category (or no category), and a difficulty
- From these conditions, a list of 10 random questions is retrieved and displayed
- The user answers the current question and moves to the next question using the next button
- At the end of the quiz, the score is displayed, with a button to quiz creation

## What I Learned

- Sass (I benefited most from the feature of nesting css classes)
- Difference between inline elements and block elements. We use `inline` and `block` to control position relative to siblings while display `flex` is for controling the layout of the children ([youtube video](https://www.youtube.com/watch?v=Xo3vyx2KSK8)).
- Angular uses dependancy injection
- Passing data child → parent (not existing with React) with event emitters

## Demo

You can access the app from [HERE](https://trivia-world.vercel.app/). The app is responsive, so you can use in all types of devices (Mobile, Tablet, Computer).
