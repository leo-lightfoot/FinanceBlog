---
layout: post
title: "MoneyWise: Gamified Financial Literacy"
subtitle: "A React-based interactive game that teaches credit management and personal finance through real-life decision-making scenarios."
category: Projects
date: 2026-03-12
tags: [React, MobX, JavaScript, Financial Literacy, Game Design]
github: "https://github.com/leo-lightfoot/FinLearningGamified"
image: /assets/images/Fin_Literacy.png
---

## Overview

MoneyWise is an interactive browser game built to make financial literacy accessible and engaging. Players navigate a series of real-life financial scenarios like managing credit, spending decisions, and savings while tracking their **Credit Power** and **Savings** in real time.

The core idea: learning personal finance should feel like playing a game, not reading a textbook.

[Play a live Demo →](https://moneywisedemo.netlify.app/)

## Motivation

Financial literacy is one of the most underdeveloped life skills for young adults. Most people learn about credit scores, interest rates, and budgeting only after making costly mistakes. MoneyWise flips that. It put players in scenarios where the consequences of poor financial decisions are felt in a safe, simulated environment.

The game format naturally drives engagement: every choice has a visible impact on your Credit Power score and Savings balance, creating an immediate feedback loop that textbooks simply can't replicate.

## Technical Stack

| Layer | Technology |
|---|---|
| UI Framework | React |
| Routing | React Router v6 |
| State Management | MobX |
| Animations | CSS Transitions |
| Analytics | Google Analytics |
| Deployment | Netlify |

## Core Features

- **Credit Power tracking** — every decision affects your score, just like real life
- **Savings management** — balance short-term spending against long-term goals
- **Sequential scenario gameplay** — progress through increasingly complex financial situations
- **Interactive decision trees** — multiple-choice paths with distinct financial outcomes
- **Progress tracking** — visual feedback on how each choice moves your financial health

## Gameplay Loop

1. Player is presented with a real-life financial scenario (e.g. *"You need a new phone:  buy outright, finance it, or wait?"*)
2. Choose from 2–3 options, each with different financial implications
3. Credit Power and Savings update immediately based on the choice
4. A brief explanation shows why the outcome occurred
5. Move to the next scenario

This loop reinforces cause-and-effect thinking around financial decisions in a way that sticks.

## Key Takeaways

- Gamification is a genuinely effective delivery mechanism for financial education as engagement stays high when stakes feel real. The duolingo playbook.
- MobX's observable state makes it easy to keep UI perfectly in sync with game state without boilerplate.
- Designing scenarios requires as much domain knowledge (personal finance) as technical skill. The game is only as good as the quality of its dilemmas.

## Links

Full source on [GitHub](https://github.com/leo-lightfoot/FinLearningGamified) · Live demo at [moneywisedemo.netlify.app](https://moneywisedemo.netlify.app/)
