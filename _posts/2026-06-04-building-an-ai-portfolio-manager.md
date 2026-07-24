---
layout: post
title: "Building an AI Portfolio Manager: Can LLMs Beat Quant Investing?"
subtitle: "My master's thesis at Frankfurt School asked whether language models could improve portfolio decisions. Over 12,000 earnings calls later, the answer was not what I expected."
category: Articles
date: 2026-06-04
tags: [Portfolio Management, AI, LLMs, Quantitative Finance, FinTech, Frankfurt School]
image: /assets/images/LLM-Portfolio_1.webp
---

Numbers run portfolio management. That sounds obvious, but it shapes everything: how risk is measured, how capital is allocated, which decisions get made and which get ignored.

Investors build models around returns, volatility, correlations, yield spreads, valuation metrics, and factor exposures. From Markowitz to modern factor investing, the toolkit has stayed largely quantitative.

And yet every quarter, thousands of companies tell investors exactly how they see the future.

Executives discuss demand trends, competitive pressures, supply chain issues, hiring plans, capital expenditure programs, and growth expectations during earnings calls. The Federal Reserve communicates its read on inflation, growth, labour markets, and rate policy through statements, minutes, and press conferences. Professional investors spend enormous amounts of time working through all of it.

So the question I kept coming back to was whether an AI could do the same: could a Large Language Model improve portfolio performance by combining qualitative signals from earnings calls and Fed communications with traditional quantitative data?

That question became the foundation of my master's thesis in Portfolio Management at Frankfurt School of Finance & Management. Twelve thousand earnings call transcripts, hundreds of Federal Reserve documents, and thousands of AI-generated portfolio decisions later, I had an answer I did not expect.

---

## The Traditional Approach to Portfolio Construction

Most portfolio models are fundamentally backward-looking.

They use historical returns to estimate risk and expected performance, identifying patterns such as momentum, volatility regimes, or factor exposures and allocating capital accordingly. These approaches work because markets often exhibit persistent behaviour. Assets that have performed well recently may continue to do so. Volatility regimes shape investor risk appetite. Certain sectors tend to outperform in specific economic environments.

What traditional models routinely ignore is language.

A technology company reports earnings: revenue beats expectations, margins improve, management raises guidance. Separately, the Federal Reserve signals that inflation risks are fading and rate cuts are becoming more likely. Both events carry information that may move prices. But converting thousands of pages of financial text into investable signals has historically been hard to do well, and most quantitative frameworks do not try.

That started to change with the development of large language models.

---

## The Rise of Financial Language Models

Natural language processing looked very different ten years ago.

Early approaches relied on dictionaries that mapped words to positive or negative scores. These worked poorly in finance, where "liability" or "debt" sound alarming in everyday language but carry neutral or routine meanings in a corporate filing.

Transformer models changed things. BERT, FinBERT, GPT, Llama, and Mistral can process language in context rather than scoring words in isolation. FinBERT, trained specifically on financial text, became one of the more widely used tools for financial sentiment analysis.

Large language models added something beyond that: the ability to hold multiple signals in mind at once. An LLM can take in positive earnings sentiment alongside a deteriorating macroeconomic outlook, an inverted yield curve, and rising volatility, and try to arrive at a coherent view. Whether doing that actually improves portfolio decisions was a question that had not really been tested at the portfolio level.

---

## Designing the Experiment

Rather than studying individual stock predictions, I wanted to test something more practical: whether an LLM could improve an entire portfolio allocation process.

I built a universe of ten major U.S. equity ETFs covering different sectors, styles, and market-cap segments: broad S&P 500 exposure, technology, financials, healthcare, energy, growth, value, and mid-to-small cap equities. The portfolio was rebalanced monthly, and each month followed the same process.

### Step 1: Build a Quantitative Baseline

A minimum-variance portfolio was constructed using an exponentially weighted covariance matrix, creating a quantitative benchmark based purely on market data.

### Step 2: Extract Information from Text

I collected 12,364 earnings call transcripts and 347 Federal Reserve documents, including FOMC statements, meeting minutes, and press conference transcripts. All were processed through FinBERT.

The resulting sentiment features captured overall earnings tone, forward guidance sentiment, management confidence, Federal Reserve communication style, inflation concerns, economic outlook signals, and labour market assessments.

### Step 3: Let the LLM Make Portfolio Decisions

Llama 3.1 8B was deployed locally using Ollama. Each month, the model received the baseline portfolio weights alongside momentum signals, volatility data, yield curve information, macroeconomic indicators, and the earnings and Fed sentiment features, then proposed revised weights.

To reduce randomness, I ran the model five times each month and averaged the results. Across the full study, that produced 960 independent LLM portfolio decisions.

---

## The Benchmark Problem

A lot of AI investment research compares against weak baselines. A model beats an equal-weight portfolio and claims it works. That is not a meaningful test.

The real question is whether an LLM can outperform a strategy that already incorporates well-known predictive signals. So I compared the LLM portfolio against five alternatives: Minimum Variance, Risk Parity, Equal Weight, Value Tilt, and Signal-Enhanced Minimum Variance.

The Signal-Enhanced portfolio was the one that mattered most. It already included momentum signals, volatility regime adjustments, and yield curve information, representing what a strong quantitative model could do with market data alone. The LLM needed to beat that to show that reading earnings calls and Fed minutes was actually adding something beyond what the numbers already said.

---

## What I Expected

I thought the LLM would find relationships that traditional quantitative models missed: strong earnings optimism combined with a dovish Fed shift, sector-specific divergence in management confidence, narratives that were changing before the data caught up. These are exactly the kinds of signals that experienced analysts look for, and they are difficult to capture with linear models.

The reasoning seemed sound. Professional investors spend significant time interpreting these sources. A model that could process them at scale should, in theory, pick up something useful.

It was more complicated than that.

After processing over twelve thousand earnings calls and hundreds of Federal Reserve documents, the results pushed back on a lot of what I had assumed going in. What worked, what failed, and why it failed were not the story I had written in my head before the data came in.

That is what the next article covers.
