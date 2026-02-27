export const TOPICS = {
  linear_models: {
    id: 'linear_models',
    title: 'Linear Models',
    subtopics: [
      {
        id: 'linear_regression',
        title: 'Linear Regression',
        content: `Linear Regression predicts a continuous output by fitting a straight line (or hyperplane) through the data.

**Model:** ŷ = w₀ + w₁x₁ + w₂x₂ + ... + wₙxₙ

- **w₀** = bias/intercept (the prediction when all features are 0)
- **w₁...wₙ** = weights/coefficients (how much each feature affects the prediction)
- **x₁...xₙ** = input features

**Key Assumptions:**
- Linear relationship between features and target
- Features are not highly correlated (no multicollinearity)
- Errors are normally distributed with constant variance (homoscedasticity)

**When to use:** Predicting house prices, stock trends, temperature — any continuous numeric output.`,
        formulas: [
          { name: 'Model', formula: 'ŷ = Xw + b', explanation: 'Prediction = features × weights + bias' },
          { name: 'MSE Loss', formula: 'L = (1/n) Σ(yᵢ - ŷᵢ)²', explanation: 'Average of squared differences between actual and predicted' },
          { name: 'Normal Equation', formula: 'w = (XᵀX)⁻¹Xᵀy', explanation: 'Closed-form solution — finds optimal weights directly' }
        ],
        traps: [
          'Linear regression does NOT require the features themselves to be linear — you can use polynomial features (x², x³) and it\'s still "linear" regression because it\'s linear in the weights.',
          'R² = 1 does NOT always mean a good model. It could mean overfitting.',
          'Adding more features always increases R² on training data — use Adjusted R² instead.',
          'MSE is sensitive to outliers because it squares the errors.'
        ]
      },
      {
        id: 'logistic_regression',
        title: 'Logistic Regression',
        content: `Logistic Regression is used for **classification** (not regression despite the name!). It predicts probabilities using the sigmoid function.

**Model:** P(y=1|x) = σ(wᵀx + b) = 1 / (1 + e^(-(wᵀx + b)))

- The sigmoid function squashes any real number to the range (0, 1)
- If P ≥ 0.5 → predict class 1; if P < 0.5 → predict class 0 (default threshold)
- The decision boundary is where wᵀx + b = 0

**Key Points:**
- Output is a probability, not a raw value
- It's a linear classifier — the decision boundary is a straight line/hyperplane
- Uses Maximum Likelihood Estimation (MLE) to find optimal weights
- Can be extended to multi-class with softmax (multinomial logistic regression)

**When to use:** Email spam detection, disease diagnosis, customer churn — binary (yes/no) or multi-class classification.`,
        formulas: [
          { name: 'Sigmoid', formula: 'σ(z) = 1 / (1 + e⁻ᶻ)', explanation: 'Converts any number to probability (0,1)' },
          { name: 'Cross-Entropy Loss', formula: 'L = -[y·log(ŷ) + (1-y)·log(1-ŷ)]', explanation: 'Penalizes confident wrong predictions heavily' },
          { name: 'Decision Boundary', formula: 'wᵀx + b = 0', explanation: 'Where probability = 0.5; separates classes' }
        ],
        traps: [
          'Logistic Regression IS a classification algorithm, not regression!',
          'The decision boundary is LINEAR (straight line) unless you add polynomial features.',
          'Cross-entropy loss is used, NOT MSE — MSE with sigmoid creates non-convex loss.',
          'Sigmoid output of 0.7 means 70% probability of class 1, NOT that the output is 0.7.'
        ]
      },
      {
        id: 'loss_functions',
        title: 'Loss Functions (MSE, Cross-Entropy)',
        content: `Loss functions measure how wrong your model's predictions are. The goal is to minimize the loss.

**Mean Squared Error (MSE)** — for regression:
- Squares the error → large errors are penalized much more
- Always non-negative, 0 = perfect prediction
- Sensitive to outliers (because of squaring)

**Cross-Entropy (Log Loss)** — for classification:
- Measures how far predicted probabilities are from actual labels
- When actual = 1: loss = -log(ŷ) → punishes low probabilities hard
- When actual = 0: loss = -log(1-ŷ) → punishes high probabilities hard
- Creates a convex optimization landscape with sigmoid

**Why not use MSE for classification?**
MSE + sigmoid = non-convex loss surface with many local minima. Cross-entropy + sigmoid = convex, smooth optimization.`,
        formulas: [
          { name: 'MSE', formula: 'L = (1/n) Σ(yᵢ - ŷᵢ)²', explanation: 'For regression. Penalizes large errors quadratically.' },
          { name: 'MAE', formula: 'L = (1/n) Σ|yᵢ - ŷᵢ|', explanation: 'For regression. More robust to outliers than MSE.' },
          { name: 'Binary Cross-Entropy', formula: 'L = -(1/n) Σ[yᵢ·log(ŷᵢ) + (1-yᵢ)·log(1-ŷᵢ)]', explanation: 'For classification. Penalizes confident wrong answers heavily.' }
        ],
        traps: [
          'MSE is for REGRESSION, Cross-Entropy is for CLASSIFICATION.',
          'MAE is more robust to outliers than MSE.',
          'Cross-entropy loss approaches infinity as prediction approaches the wrong class — this is by design.',
          'RMSE (Root MSE) has the same units as the target variable, making it more interpretable than MSE.'
        ]
      },
      {
        id: 'gradient_descent',
        title: 'Gradient Descent',
        content: `Gradient Descent is an optimization algorithm that iteratively adjusts weights to minimize the loss function.

**Intuition:** Imagine standing on a hill in fog. You can't see the bottom, but you feel the slope under your feet. You take a step downhill. Repeat until you reach the bottom.

**Update Rule:** w = w - α · ∂L/∂w
- **α (learning rate):** Size of each step
  - Too large → overshoots, may diverge
  - Too small → very slow convergence
- **∂L/∂w (gradient):** Direction of steepest ascent (we go opposite)

**Variants:**
- **Batch GD:** Uses ALL data points per update → stable but slow
- **Stochastic GD (SGD):** Uses ONE data point per update → noisy but fast
- **Mini-batch GD:** Uses a subset (e.g., 32 samples) → best of both worlds

**Convergence:** The loss should decrease over iterations. If it oscillates → reduce learning rate.`,
        formulas: [
          { name: 'Weight Update', formula: 'w = w - α · ∇L(w)', explanation: 'Move weights in opposite direction of gradient' },
          { name: 'Learning Rate', formula: 'α (alpha)', explanation: 'Controls step size. Typical: 0.001 to 0.1' }
        ],
        traps: [
          'Gradient descent finds LOCAL minimum, not necessarily global (except for convex functions like linear regression).',
          'SGD is noisier but can escape local minima better than batch GD.',
          'The learning rate is the MOST important hyperparameter to tune.',
          'Features should be SCALED (normalized) for gradient descent to work efficiently.'
        ]
      },
      {
        id: 'overfitting_underfitting',
        title: 'Overfitting vs Underfitting',
        content: `**Underfitting (High Bias):**
- Model is too simple to capture patterns
- High error on BOTH training and test data
- Example: Using linear regression for a curved relationship
- Fix: Add more features, use more complex model, reduce regularization

**Overfitting (High Variance):**
- Model memorizes training data including noise
- LOW error on training, HIGH error on test data
- Example: A decision tree that perfectly fits every training point
- Fix: More training data, regularization, simpler model, dropout, early stopping

**The Bias-Variance Tradeoff:**
- High bias = underfitting = too simple
- High variance = overfitting = too complex
- Goal: Find the sweet spot where total error is minimized

**How to detect:**
- Compare training accuracy vs validation accuracy
- Large gap = overfitting
- Both low = underfitting`,
        formulas: [
          { name: 'Total Error', formula: 'Error = Bias² + Variance + Noise', explanation: 'You want to minimize bias + variance together' }
        ],
        traps: [
          'High training accuracy + low test accuracy = OVERFITTING, not underfitting.',
          'Adding more data helps overfitting but NOT underfitting.',
          'More complex model helps underfitting but can cause overfitting.',
          'Regularization helps overfitting by penalizing complexity.',
          'A model with 100% training accuracy is SUSPICIOUS — likely overfitting.'
        ]
      },
      {
        id: 'regularization',
        title: 'Regularization (L1, L2)',
        content: `Regularization adds a penalty term to the loss function to prevent overfitting by discouraging large weights.

**L1 Regularization (Lasso):**
- Adds |w| penalty: L_total = L_original + λ Σ|wᵢ|
- Drives some weights to EXACTLY zero → feature selection
- Creates sparse models (fewer active features)
- Use when you suspect many features are irrelevant

**L2 Regularization (Ridge):**
- Adds w² penalty: L_total = L_original + λ Σwᵢ²
- Shrinks weights toward zero but NEVER exactly zero
- Distributes weight across correlated features
- More stable than L1, generally preferred

**Elastic Net:**
- Combines L1 + L2: λ₁Σ|wᵢ| + λ₂Σwᵢ²
- Gets benefits of both

**λ (lambda) — Regularization Strength:**
- λ = 0 → no regularization (may overfit)
- λ → ∞ → all weights → 0 (may underfit)
- Tune λ using cross-validation`,
        formulas: [
          { name: 'L1 (Lasso)', formula: 'L = L₀ + λ Σ|wᵢ|', explanation: 'Penalty on absolute weights → sparse solutions' },
          { name: 'L2 (Ridge)', formula: 'L = L₀ + λ Σwᵢ²', explanation: 'Penalty on squared weights → small but non-zero weights' },
          { name: 'Elastic Net', formula: 'L = L₀ + λ₁Σ|wᵢ| + λ₂Σwᵢ²', explanation: 'Combines L1 and L2 regularization' }
        ],
        traps: [
          'L1 = Lasso = can make weights ZERO (feature selection). L2 = Ridge = shrinks but NEVER zero.',
          'Higher λ = MORE regularization = simpler model (potential underfitting).',
          'Regularization does NOT apply to the bias term (w₀).',
          'L1 gives sparse solutions; L2 gives small but dense solutions.',
          'If asked "which regularization does feature selection?" → L1/Lasso.'
        ]
      }
    ]
  },
  knn_naive_bayes: {
    id: 'knn_naive_bayes',
    title: 'KNN & Naïve Bayes',
    subtopics: [
      {
        id: 'knn',
        title: 'K-Nearest Neighbors',
        content: `KNN is a **lazy learning** algorithm — it doesn't learn a model. It stores all training data and classifies new points by looking at the K closest neighbors.

**How it works:**
1. Given a new point, calculate distance to ALL training points
2. Find the K nearest neighbors
3. Classification: majority vote among K neighbors
4. Regression: average of K neighbors' values

**Distance Metrics:**
- **Euclidean:** √(Σ(xᵢ-yᵢ)²) — straight-line distance (most common)
- **Manhattan:** Σ|xᵢ-yᵢ| — city-block distance (good for high dimensions)
- **Minkowski:** Generalization of both (p=1 → Manhattan, p=2 → Euclidean)

**Choosing K:**
- K too small (K=1) → overfitting, sensitive to noise
- K too large (K=n) → underfitting, always predicts majority class
- Use odd K for binary classification (avoids ties)
- Tune K using cross-validation (typical: 3-10)

**Important:** Features MUST be scaled/normalized (KNN is distance-based).`,
        formulas: [
          { name: 'Euclidean Distance', formula: 'd = √(Σ(xᵢ - yᵢ)²)', explanation: 'Straight-line distance between two points' },
          { name: 'Manhattan Distance', formula: 'd = Σ|xᵢ - yᵢ|', explanation: 'Sum of absolute differences (L1 distance)' },
          { name: 'Minkowski Distance', formula: 'd = (Σ|xᵢ - yᵢ|ᵖ)^(1/p)', explanation: 'Generalized distance. p=1→Manhattan, p=2→Euclidean' }
        ],
        traps: [
          'KNN is a LAZY learner — no training phase, all computation at prediction time.',
          'KNN is very SLOW at prediction for large datasets (must compare to all points).',
          'Features MUST be normalized/scaled — otherwise features with larger ranges dominate.',
          'K=1 → overfitting. K=n → underfitting (always predicts majority class).',
          'KNN can be used for BOTH classification and regression.'
        ]
      },
      {
        id: 'curse_of_dimensionality',
        title: 'Curse of Dimensionality',
        content: `As the number of features (dimensions) increases, the data becomes increasingly sparse, making distance-based methods like KNN unreliable.

**Why it happens:**
- In high dimensions, all points become roughly equidistant
- The volume of space grows exponentially with dimensions
- You need exponentially more data to maintain the same density

**Effects:**
- Distance metrics become meaningless (all distances ≈ same)
- KNN performance degrades
- Overfitting becomes more likely
- Computation time increases dramatically

**Solutions:**
- Dimensionality reduction (PCA, feature selection)
- Use only relevant features
- Use algorithms less affected (e.g., tree-based methods)
- L1 regularization for feature selection

**Rule of thumb:** You need approximately 10^d data points for d dimensions to maintain density.`,
        formulas: [
          { name: 'Data Needed', formula: 'n ≈ 10^d', explanation: 'Rough estimate: 10 samples per dimension to maintain density' }
        ],
        traps: [
          'The curse of dimensionality affects distance-based methods (KNN, SVM with RBF) the most.',
          'In very high dimensions, Euclidean distance loses meaning — Manhattan may work better.',
          'More features ≠ better performance. Irrelevant features add noise.',
          'Tree-based methods are relatively robust to the curse of dimensionality.'
        ]
      },
      {
        id: 'naive_bayes',
        title: 'Naïve Bayes',
        content: `Naïve Bayes is a probabilistic classifier based on Bayes' Theorem with the "naïve" assumption that features are conditionally independent given the class.

**Bayes' Theorem:**
P(class|features) = P(features|class) × P(class) / P(features)

- **P(class|features)** = Posterior: probability of class given the data
- **P(features|class)** = Likelihood: probability of data given the class
- **P(class)** = Prior: initial probability of the class
- **P(features)** = Evidence: normalizing constant

**Variants:**
- **Gaussian NB:** Features are continuous, assumed normally distributed
- **Multinomial NB:** For count data (e.g., word frequencies in text)
- **Bernoulli NB:** For binary features (word present/absent)

**The "Naïve" Assumption:**
Features are independent given the class. This is almost never true in practice, but NB still works surprisingly well!

**When to use:** Text classification (spam detection), sentiment analysis, medical diagnosis.`,
        formulas: [
          { name: "Bayes' Theorem", formula: 'P(C|X) = P(X|C) · P(C) / P(X)', explanation: 'Posterior = Likelihood × Prior / Evidence' },
          { name: 'Naïve Independence', formula: 'P(x₁,x₂,...,xₙ|C) = Π P(xᵢ|C)', explanation: 'Features assumed independent given class' },
          { name: 'Gaussian Likelihood', formula: 'P(xᵢ|C) = (1/√(2πσ²)) e^(-(xᵢ-μ)²/2σ²)', explanation: 'Normal distribution for continuous features' }
        ],
        traps: [
          '"Naïve" = assumes feature INDEPENDENCE given the class. This is the key assumption.',
          'Naïve Bayes works well even when independence assumption is violated.',
          'Zero probability problem: if a feature value never appears in training for a class → probability = 0. Fix: Laplace smoothing.',
          'Multinomial NB is best for TEXT classification. Gaussian NB for continuous features.',
          'NB is very FAST and works well with small datasets and high dimensions.'
        ]
      },
      {
        id: 'bayes_components',
        title: 'Prior, Likelihood, Posterior',
        content: `Understanding the three components of Bayes' Theorem is critical for MCQs.

**Prior P(C):**
- What you believe BEFORE seeing the data
- Example: 1% of emails are spam → P(spam) = 0.01
- Estimated from training data (frequency of each class)
- Uniform prior = equal probability for all classes

**Likelihood P(X|C):**
- How likely is the data IF a class is true
- Example: P("free money" | spam) = 0.8
- Estimated differently per NB variant (Gaussian, Multinomial, etc.)

**Posterior P(C|X):**
- What you believe AFTER seeing the data
- This is what we want to compute!
- posterior ∝ likelihood × prior
- We classify by picking the class with highest posterior

**Evidence P(X):**
- Probability of the data regardless of class
- Same for all classes → doesn't affect which class wins
- Often ignored in classification (we just compare numerators)

**MAP (Maximum A Posteriori):**
Classify to the class with highest posterior = argmax_C [P(X|C) · P(C)]`,
        formulas: [
          { name: 'MAP Classification', formula: 'ŷ = argmax_C P(X|C) · P(C)', explanation: 'Pick class with highest posterior probability' },
          { name: 'Laplace Smoothing', formula: 'P(xᵢ|C) = (count(xᵢ,C) + α) / (count(C) + α·|V|)', explanation: 'Add α (usually 1) to avoid zero probabilities' }
        ],
        traps: [
          'Prior is BEFORE data, Posterior is AFTER data. Likelihood connects them.',
          'MAP estimation uses priors. MLE (Maximum Likelihood) ignores priors (assumes uniform).',
          'Evidence P(X) can be ignored for classification — it\'s the same for all classes.',
          'Laplace smoothing adds a small count to prevent zero probabilities.',
          'If prior is uniform, MAP = MLE.'
        ]
      }
    ]
  },
  trees_svm: {
    id: 'trees_svm',
    title: 'Decision Trees & SVM',
    subtopics: [
      {
        id: 'entropy_info_gain',
        title: 'Entropy & Information Gain',
        content: `**Entropy** measures the impurity/randomness/uncertainty in a dataset.

- Entropy = 0 → perfectly pure (all same class)
- Entropy = 1 (for binary) → maximum impurity (50/50 split)

**Formula:** H(S) = -Σ pᵢ · log₂(pᵢ)
Where pᵢ is the proportion of class i.

**Information Gain (IG):**
How much entropy DECREASES after splitting on a feature.

IG(S, A) = H(S) - Σ (|Sᵥ|/|S|) · H(Sᵥ)

- H(S) = entropy before split
- H(Sᵥ) = entropy of each subset after split
- The feature with highest IG is chosen for splitting

**ID3 Algorithm:** Uses information gain to build the tree.
**C4.5:** Uses gain ratio (information gain / split info) to handle features with many values.

**Example:**
Dataset: 5 spam, 5 not spam → H = -0.5·log₂(0.5) - 0.5·log₂(0.5) = 1.0 (maximum entropy)
Dataset: 9 spam, 1 not spam → H = -0.9·log₂(0.9) - 0.1·log₂(0.1) ≈ 0.47 (lower entropy, more pure)`,
        formulas: [
          { name: 'Entropy', formula: 'H(S) = -Σ pᵢ · log₂(pᵢ)', explanation: 'Measures impurity. 0 = pure, 1 = max impurity (binary)' },
          { name: 'Information Gain', formula: 'IG(S,A) = H(S) - Σ(|Sᵥ|/|S|)·H(Sᵥ)', explanation: 'Entropy before minus weighted entropy after split' },
          { name: 'Gain Ratio', formula: 'GR = IG(S,A) / SplitInfo(A)', explanation: 'Normalizes IG to handle features with many values' }
        ],
        traps: [
          'Entropy is measured in BITS (base 2 logarithm).',
          'Entropy of pure node = 0. Entropy of 50/50 binary split = 1.',
          'Information Gain is BIASED toward features with many values → use Gain Ratio instead.',
          'log₂(0) is undefined — but we use convention 0·log₂(0) = 0.',
          'Higher information gain = better split = more entropy reduction.'
        ]
      },
      {
        id: 'gini_index',
        title: 'Gini Index',
        content: `**Gini Index** is an alternative to entropy for measuring impurity. Used by CART algorithm.

**Formula:** Gini(S) = 1 - Σ pᵢ²

- Gini = 0 → perfectly pure
- Gini = 0.5 (for binary) → maximum impurity (50/50)
- Range: [0, 0.5] for binary, [0, 1-1/k] for k classes

**Gini vs Entropy:**
| Aspect | Gini | Entropy |
|--------|------|---------|
| Range (binary) | 0 to 0.5 | 0 to 1 |
| Computation | Faster (no log) | Slower (requires log) |
| Used by | CART | ID3, C4.5 |
| Behavior | Very similar to entropy | Very similar to Gini |

**In practice:** Gini and Entropy produce very similar trees. CART uses Gini by default (sklearn's DecisionTreeClassifier uses Gini by default).`,
        formulas: [
          { name: 'Gini Index', formula: 'Gini(S) = 1 - Σ pᵢ²', explanation: 'Probability of misclassifying a random sample' },
          { name: 'Gini for Binary', formula: 'Gini = 2p(1-p)', explanation: 'Simplified for two classes' }
        ],
        traps: [
          'Gini max for binary = 0.5, NOT 1. Entropy max for binary = 1.',
          'Gini is computationally FASTER than entropy (no logarithm needed).',
          'sklearn DecisionTreeClassifier uses GINI by default, not entropy.',
          'Both Gini and entropy produce similar trees in practice — the difference is minimal.',
          'Gini = 0 means pure node. Gini = 0.5 means maximum impurity (binary).'
        ]
      },
      {
        id: 'tree_depth_pruning',
        title: 'Tree Depth & Pruning',
        content: `**Tree Depth:**
- Deeper trees = more complex = higher risk of overfitting
- Shallow trees = simpler = higher risk of underfitting
- Control depth with max_depth hyperparameter

**Pre-pruning (Early Stopping):**
Stop growing the tree before it's fully built:
- Set maximum depth
- Set minimum samples per leaf
- Set minimum samples to split
- Set maximum number of leaf nodes

**Post-pruning:**
Grow the full tree, then remove branches that don't improve performance:
- **Reduced Error Pruning:** Remove subtrees if it doesn't increase error on validation set
- **Cost-Complexity Pruning (CCP):** Add penalty for tree complexity (like regularization)
  - Total cost = Error + α × |leaves|
  - Higher α → more pruning → simpler tree

**Why prune?**
An unpruned decision tree will often achieve 100% training accuracy by memorizing the data (overfitting).`,
        formulas: [
          { name: 'Cost-Complexity', formula: 'R_α(T) = R(T) + α·|T|', explanation: 'Error + penalty × number of leaves' }
        ],
        traps: [
          'An unpruned decision tree can achieve 100% TRAINING accuracy — this means overfitting.',
          'Pre-pruning stops growth early; post-pruning removes branches after full growth.',
          'max_depth is the most important hyperparameter for controlling tree complexity.',
          'Decision trees do NOT require feature scaling (they only compare values, not distances).',
          'Decision trees can handle both numerical and categorical features.'
        ]
      },
      {
        id: 'svm',
        title: 'Support Vector Machines',
        content: `SVM finds the **hyperplane** that best separates classes with the **maximum margin**.

**Key Concepts:**
- **Hyperplane:** Decision boundary that separates classes (line in 2D, plane in 3D)
- **Margin:** Distance between the hyperplane and the nearest data points
- **Support Vectors:** The data points closest to the hyperplane (they "support" it)
- Only support vectors determine the hyperplane — other points don't matter!

**Goal:** Maximize the margin between classes.
- Larger margin → better generalization
- The hyperplane is equidistant from the nearest points of both classes

**Why SVM is powerful:**
- Works well in high dimensions
- Effective when number of features > number of samples
- Memory efficient (only stores support vectors)
- The kernel trick allows non-linear boundaries

**Limitations:**
- Slow for very large datasets
- Sensitive to feature scaling
- Doesn't directly give probability estimates`,
        formulas: [
          { name: 'Decision Function', formula: 'f(x) = wᵀx + b', explanation: 'Positive → class 1, Negative → class -1' },
          { name: 'Margin Width', formula: 'margin = 2/||w||', explanation: 'Distance between decision boundaries. Maximize by minimizing ||w||' },
          { name: 'Optimization', formula: 'min (1/2)||w||² subject to yᵢ(wᵀxᵢ+b) ≥ 1', explanation: 'Minimize weight norm while correctly classifying all points' }
        ],
        traps: [
          'Only SUPPORT VECTORS matter — removing other points doesn\'t change the decision boundary.',
          'SVM maximizes MARGIN, not accuracy directly.',
          'SVM requires feature SCALING (it\'s distance-based).',
          'SVM finds the hyperplane with the MAXIMUM margin, not just any separating hyperplane.',
          'The number of support vectors is usually small relative to the dataset size.'
        ]
      },
      {
        id: 'hard_soft_margin',
        title: 'Hard vs Soft Margin',
        content: `**Hard Margin SVM:**
- Requires ALL points to be correctly classified
- No points allowed inside the margin
- Only works if data is PERFECTLY linearly separable
- Very sensitive to outliers

**Soft Margin SVM:**
- Allows some misclassifications (slack variables ξᵢ)
- Controlled by parameter C:
  - **C large** → small margin, few misclassifications (more like hard margin)
  - **C small** → large margin, more misclassifications allowed (more regularization)
- The standard SVM used in practice

**C Parameter (Regularization):**
- C = ∞ → hard margin (no errors allowed)
- High C → overfitting (focuses on classifying every point correctly)
- Low C → underfitting (allows many errors for wider margin)
- Think of C as the "cost" of misclassification

**Slack Variables (ξᵢ):**
- ξᵢ = 0 → point is correctly classified and outside margin
- 0 < ξᵢ < 1 → point is inside margin but correctly classified
- ξᵢ > 1 → point is misclassified`,
        formulas: [
          { name: 'Soft Margin', formula: 'min (1/2)||w||² + C·Σξᵢ', explanation: 'Minimize weights + C × total slack (misclassification penalty)' },
          { name: 'Constraint', formula: 'yᵢ(wᵀxᵢ + b) ≥ 1 - ξᵢ, ξᵢ ≥ 0', explanation: 'Allow violations up to ξᵢ' }
        ],
        traps: [
          'Hard margin requires LINEARLY SEPARABLE data. Soft margin doesn\'t.',
          'High C = LESS regularization = smaller margin = potential overfitting.',
          'Low C = MORE regularization = wider margin = potential underfitting.',
          'C in SVM is INVERSE of regularization (opposite of λ in regression).',
          'In practice, ALWAYS use soft margin (hard margin fails with noisy data).'
        ]
      },
      {
        id: 'kernel_trick',
        title: 'Kernel Trick',
        content: `The kernel trick allows SVM to create **non-linear** decision boundaries by implicitly mapping data to a higher-dimensional space.

**Intuition:** If data isn't linearly separable in the original space, map it to a higher dimension where it IS separable, then find a linear boundary there.

**Common Kernels:**
- **Linear:** K(x,y) = xᵀy — no mapping, standard linear SVM
- **Polynomial:** K(x,y) = (xᵀy + c)^d — maps to polynomial feature space
- **RBF (Gaussian):** K(x,y) = exp(-γ||x-y||²) — infinite-dimensional space
  - γ large → tight boundary (overfitting)
  - γ small → smooth boundary (underfitting)

**Why "trick"?**
You never actually compute the high-dimensional features. The kernel function computes the dot product IN the high-dimensional space directly — much faster!

**Choosing a kernel:**
1. Start with linear (fast, works if data is roughly separable)
2. Try RBF (most versatile, works for most non-linear problems)
3. Polynomial if you know the degree of non-linearity

**RBF gamma parameter:**
- High γ → each point has small influence → complex boundary → overfitting
- Low γ → each point has large influence → smooth boundary → underfitting`,
        formulas: [
          { name: 'Linear Kernel', formula: 'K(x,y) = xᵀy', explanation: 'Simple dot product, no transformation' },
          { name: 'Polynomial Kernel', formula: 'K(x,y) = (xᵀy + c)^d', explanation: 'Maps to degree-d polynomial space' },
          { name: 'RBF Kernel', formula: 'K(x,y) = exp(-γ||x-y||²)', explanation: 'Maps to infinite-dimensional space. Most popular.' },
          { name: 'Kernel Trick', formula: 'K(x,y) = φ(x)ᵀφ(y)', explanation: 'Compute dot product in high-D space without explicit mapping' }
        ],
        traps: [
          'The kernel trick does NOT explicitly compute high-dimensional features — it computes the dot product directly.',
          'RBF kernel maps to INFINITE-dimensional space.',
          'High γ in RBF = OVERFITTING (tight boundary). Low γ = UNDERFITTING (smooth boundary).',
          'Linear kernel SVM = basically the same as regular SVM without kernel.',
          'If you have many features relative to samples, linear kernel often works well (no need for RBF).'
        ]
      }
    ]
  }
};

export const TOPIC_LIST = Object.values(TOPICS);

export function getAllSubtopics() {
  const subtopics = [];
  for (const topic of TOPIC_LIST) {
    for (const sub of topic.subtopics) {
      subtopics.push({ ...sub, parentTopic: topic.title, parentId: topic.id });
    }
  }
  return subtopics;
}

export function getSubtopicById(id) {
  for (const topic of TOPIC_LIST) {
    for (const sub of topic.subtopics) {
      if (sub.id === id) return { ...sub, parentTopic: topic.title, parentId: topic.id };
    }
  }
  return null;
}
