---
layout: post
title: "Yield Curve PCA & P&L Attribution"
subtitle: "Decomposing US Treasury yield curve movements into principal components and attributing portfolio P&L to each factor."
category: Projects
date: 2026-03-11
tags: [Python, PCA, Fixed Income, Yield Curve, Risk Analytics]
github: "https://github.com/leo-lightfoot/Yield_Curve_PCA"
image: /assets/images/Yield_curve.png
---

## Overview

This project decomposes US Treasury yield curve movements into their principal components, calibrates historical shocks, prices a fixed income portfolio, and attributes P&L under each scenario using FRED data.

The three dominant PCA factors — **level**, **slope**, and **curvature** — explain over 95% of historical yield curve variance, making them powerful tools for scenario analysis and risk attribution.

## Motivation

Fixed income portfolio managers constantly face the question: *why did my portfolio P&L change today?* Breaking down P&L into interpretable factors (parallel shift, steepening/flattening, twist) is far more useful than a single unexplained number.

## Methodology

### 1. Data Collection

Historical US Treasury yields pulled from FRED for maturities: 3M, 6M, 1Y, 2Y, 3Y, 5Y, 7Y, 10Y, 20Y, 30Y.

### 2. PCA Decomposition

```python
from sklearn.decomposition import PCA
import pandas as pd
import numpy as np

# Compute daily yield changes
yield_changes = yields.diff().dropna()

# Fit PCA
pca = PCA(n_components=3)
pca.fit(yield_changes)

# Explained variance
print(f"PC1 (Level): {pca.explained_variance_ratio_[0]:.1%}")
print(f"PC2 (Slope): {pca.explained_variance_ratio_[1]:.1%}")
print(f"PC3 (Curvature): {pca.explained_variance_ratio_[2]:.1%}")
```

### 3. Portfolio Pricing

Each bond in the portfolio is priced under each PCA shock scenario using modified duration and convexity adjustments.

### 4. P&L Attribution

Total P&L is decomposed as:

> ΔP&L = β₁·PC1_shock + β₂·PC2_shock + β₃·PC3_shock + residual

## Results

| Factor | Explained Variance | P&L Contribution |
|--------|--------------------|-----------------|
| Level (PC1) | 82.3% | -€45,200 |
| Slope (PC2) | 11.1% | +€12,800 |
| Curvature (PC3) | 4.2% | -€3,100 |
| Residual | 2.4% | +€1,500 |

## Key Takeaways

- The level factor dominates — a 25bps parallel shift accounts for the majority of P&L swings
- Slope risk (steepening/flattening) is the second most important driver
- Curvature effects are small but material for barbell/butterfly strategies

## Code & Repo

Full implementation available on [GitHub](https://github.com/leo-lightfoot/Yield_Curve_PCA) and on display at [WebSite](https://leo-lightfoot.github.io/Yield_Curve_PCA).
