export const FLASHCARDS = [
  // Linear Models
  { id: 1, topic: 'linear_models', front: 'What does "linear" in linear regression refer to?', back: 'Linear in the PARAMETERS (weights), not the features. You can use x², x³ and it\'s still linear regression.' },
  { id: 2, topic: 'linear_models', front: 'Logistic Regression is used for what type of problem?', back: 'CLASSIFICATION (not regression!). Uses sigmoid to output probabilities.' },
  { id: 3, topic: 'linear_models', front: 'Sigmoid function range?', back: '(0, 1) — strictly between 0 and 1, never equals 0 or 1.' },
  { id: 4, topic: 'linear_models', front: 'MSE vs Cross-Entropy: when to use which?', back: 'MSE → Regression. Cross-Entropy → Classification. Never use MSE for classification (non-convex with sigmoid).' },
  { id: 5, topic: 'linear_models', front: 'What happens with too large learning rate?', back: 'Model overshoots the minimum and may diverge. Loss oscillates or increases.' },
  { id: 6, topic: 'linear_models', front: 'SGD vs Batch vs Mini-batch?', back: 'SGD: 1 sample/update (fast, noisy). Batch: ALL samples (slow, stable). Mini-batch: subset (best of both).' },
  { id: 7, topic: 'linear_models', front: 'High training acc, low test acc?', back: 'OVERFITTING (high variance). Fix: regularization, more data, simpler model.' },
  { id: 8, topic: 'linear_models', front: 'Low training acc AND low test acc?', back: 'UNDERFITTING (high bias). Fix: more features, complex model, less regularization.' },
  { id: 9, topic: 'linear_models', front: 'L1 vs L2: which does feature selection?', back: 'L1 (Lasso) — can set weights to EXACTLY zero. L2 (Ridge) shrinks but never zero.' },
  { id: 10, topic: 'linear_models', front: 'Higher λ means...', back: 'MORE regularization → simpler model → potential underfitting. λ=0 → no regularization.' },
  // KNN & Naive Bayes
  { id: 11, topic: 'knn_naive_bayes', front: 'Why is KNN called a lazy learner?', back: 'No training phase. Stores all data, computes distances at prediction time.' },
  { id: 12, topic: 'knn_naive_bayes', front: 'K=1 in KNN means...', back: 'Most complex model. Jagged boundaries. OVERFITTING. High variance.' },
  { id: 13, topic: 'knn_naive_bayes', front: 'K=n in KNN means...', back: 'Always predicts majority class. UNDERFITTING. Simplest possible model.' },
  { id: 14, topic: 'knn_naive_bayes', front: 'Why scale features for KNN?', back: 'KNN uses distances. Unscaled features with large ranges dominate the distance calculation.' },
  { id: 15, topic: 'knn_naive_bayes', front: 'Curse of dimensionality effect on KNN?', back: 'In high dimensions, all points become equidistant → "nearest neighbor" loses meaning.' },
  { id: 16, topic: 'knn_naive_bayes', front: 'What is the "naïve" assumption?', back: 'Features are conditionally INDEPENDENT given the class. P(x₁,x₂|C) = P(x₁|C)·P(x₂|C).' },
  { id: 17, topic: 'knn_naive_bayes', front: 'Which NB variant for text classification?', back: 'Multinomial Naïve Bayes (works with word count/frequency data).' },
  { id: 18, topic: 'knn_naive_bayes', front: 'Laplace smoothing solves...', back: 'Zero probability problem. Adds small count to prevent P(feature|class) = 0.' },
  { id: 19, topic: 'knn_naive_bayes', front: 'Prior vs Likelihood vs Posterior?', back: 'Prior P(C): before data. Likelihood P(X|C): data given class. Posterior P(C|X): class given data (what we want).' },
  { id: 20, topic: 'knn_naive_bayes', front: 'MAP vs MLE?', back: 'MAP maximizes posterior (uses priors). MLE maximizes likelihood (ignores priors). Uniform prior → MAP = MLE.' },
  // Trees & SVM
  { id: 21, topic: 'trees_svm', front: 'Entropy = 0 means...', back: 'Pure node — all samples belong to same class. No uncertainty.' },
  { id: 22, topic: 'trees_svm', front: 'Max entropy for binary classification?', back: '1.0 (at 50/50 split). Max Gini for binary = 0.5 (don\'t confuse!).' },
  { id: 23, topic: 'trees_svm', front: 'Gini max vs Entropy max (binary)?', back: 'Gini max = 0.5. Entropy max = 1.0. Both at 50/50 split.' },
  { id: 24, topic: 'trees_svm', front: 'CART uses ___ by default?', back: 'Gini index. ID3 uses Information Gain. C4.5 uses Gain Ratio.' },
  { id: 25, topic: 'trees_svm', front: 'Do decision trees need feature scaling?', back: 'NO! Trees use comparisons, not distances. They also handle categorical features.' },
  { id: 26, topic: 'trees_svm', front: 'What are support vectors?', back: 'Data points CLOSEST to the decision boundary. Only these determine the hyperplane.' },
  { id: 27, topic: 'trees_svm', front: 'SVM goal?', back: 'Find hyperplane that MAXIMIZES the margin between classes.' },
  { id: 28, topic: 'trees_svm', front: 'High C in SVM means...', back: 'LESS regularization, narrower margin, fewer misclassifications allowed → overfitting risk.' },
  { id: 29, topic: 'trees_svm', front: 'Low C in SVM means...', back: 'MORE regularization, wider margin, more misclassifications → underfitting risk.' },
  { id: 30, topic: 'trees_svm', front: 'RBF kernel maps to what dimension?', back: 'INFINITE dimensions. The kernel trick avoids explicit computation.' },
  { id: 31, topic: 'trees_svm', front: 'High γ in RBF kernel means...', back: 'Tight/complex boundary → OVERFITTING. Low γ → smooth boundary → underfitting.' },
  { id: 32, topic: 'trees_svm', front: 'Kernel trick does what?', back: 'Computes dot products in high-D space WITHOUT explicitly mapping data there.' },
];

export const COMPARISON_TABLES = [
  {
    title: 'Linear vs Logistic Regression',
    headers: ['Aspect', 'Linear Regression', 'Logistic Regression'],
    rows: [
      ['Problem Type', 'Regression (continuous)', 'Classification (categorical)'],
      ['Output', 'Any real number', 'Probability (0 to 1)'],
      ['Function', 'ŷ = wᵀx + b', 'σ(wᵀx + b)'],
      ['Loss Function', 'MSE', 'Cross-Entropy'],
      ['Decision Boundary', 'N/A (predicts value)', 'Linear (straight line)'],
      ['Example', 'Predict house price', 'Predict spam/not-spam']
    ]
  },
  {
    title: 'Gini vs Entropy',
    headers: ['Aspect', 'Gini Index', 'Entropy'],
    rows: [
      ['Formula', '1 - Σpᵢ²', '-Σpᵢ·log₂(pᵢ)'],
      ['Range (binary)', '0 to 0.5', '0 to 1.0'],
      ['Pure node value', '0', '0'],
      ['Max impurity (binary)', '0.5', '1.0'],
      ['Computation', 'Faster (no log)', 'Slower (requires log)'],
      ['Used by', 'CART (sklearn default)', 'ID3, C4.5'],
      ['Result', 'Very similar trees', 'Very similar trees']
    ]
  },
  {
    title: 'KNN vs SVM',
    headers: ['Aspect', 'KNN', 'SVM'],
    rows: [
      ['Type', 'Lazy learner (no training)', 'Eager learner (trains model)'],
      ['Speed (train)', 'Instant (stores data)', 'Slow (optimization)'],
      ['Speed (predict)', 'Slow (all distances)', 'Fast (only support vectors)'],
      ['Feature scaling', 'Required', 'Required'],
      ['High dimensions', 'Poor (curse of dim.)', 'Good (kernel trick)'],
      ['Decision boundary', 'Non-linear (irregular)', 'Linear or kernel-based'],
      ['Interpretability', 'Intuitive', 'Less intuitive'],
      ['Memory', 'Stores all data', 'Only support vectors']
    ]
  },
  {
    title: 'L1 (Lasso) vs L2 (Ridge)',
    headers: ['Aspect', 'L1 (Lasso)', 'L2 (Ridge)'],
    rows: [
      ['Penalty', 'Σ|wᵢ|', 'Σwᵢ²'],
      ['Effect on weights', 'Can be exactly 0', 'Small but never 0'],
      ['Feature selection', 'Yes (sparse)', 'No (dense)'],
      ['When correlated features', 'Picks one randomly', 'Distributes across all'],
      ['Solution uniqueness', 'May not be unique', 'Always unique'],
      ['Best for', 'Many irrelevant features', 'Many useful features']
    ]
  },
  {
    title: 'Hard vs Soft Margin SVM',
    headers: ['Aspect', 'Hard Margin', 'Soft Margin'],
    rows: [
      ['Misclassifications', 'None allowed', 'Some allowed (slack ξᵢ)'],
      ['Data requirement', 'Perfectly linearly separable', 'Any data'],
      ['Outlier sensitivity', 'Very sensitive', 'Robust'],
      ['Parameter', 'None', 'C (misclassification cost)'],
      ['Practical use', 'Rarely used', 'Standard (always use)'],
      ['Overfitting risk', 'High', 'Controlled by C']
    ]
  },
  {
    title: 'Algorithms: Feature Scaling Required?',
    headers: ['Algorithm', 'Needs Scaling?', 'Reason'],
    rows: [
      ['KNN', 'YES', 'Distance-based — large features dominate'],
      ['SVM', 'YES', 'Distance-based (margin/kernel)'],
      ['Linear Regression', 'Helps', 'Speeds up gradient descent'],
      ['Logistic Regression', 'Helps', 'Speeds up gradient descent'],
      ['Decision Trees', 'NO', 'Uses comparisons, not distances'],
      ['Naïve Bayes', 'NO', 'Uses probabilities, not distances'],
      ['Random Forest', 'NO', 'Tree-based']
    ]
  }
];

export const MCQ_TIPS = [
  { trigger: '"lazy learner" or "no training phase"', think: 'KNN — stores all data, computes at prediction' },
  { trigger: '"feature selection" or "sparse model"', think: 'L1/Lasso regularization — drives weights to zero' },
  { trigger: '"maximum margin"', think: 'SVM — maximizes distance between classes' },
  { trigger: '"conditional independence"', think: 'Naïve Bayes — the "naïve" assumption' },
  { trigger: '"curse of dimensionality"', think: 'KNN is most affected — all distances become equal' },
  { trigger: '"support vectors"', think: 'Only closest points to boundary matter — removing others has NO effect' },
  { trigger: '"kernel trick"', think: 'Compute dot products in high-D WITHOUT explicit mapping' },
  { trigger: '"convex loss" or "non-convex"', think: 'MSE+sigmoid = non-convex (bad). Cross-entropy+sigmoid = convex (good).' },
  { trigger: '"Gini = 0.5" or "Entropy = 1"', think: 'Maximum impurity for binary. Gini max=0.5, Entropy max=1.0.' },
  { trigger: '"despite name, used for classification"', think: 'Logistic Regression — it\'s classification, NOT regression!' },
  { trigger: '"C parameter" in SVM', think: 'High C = less regularization = overfit. Low C = more regularization = underfit. (Inverse of λ!)' },
  { trigger: '"γ (gamma)" in RBF kernel', think: 'High γ = tight boundary = overfit. Low γ = smooth = underfit.' },
  { trigger: '"zero probability"', think: 'Laplace smoothing in Naïve Bayes — adds small count.' },
  { trigger: '"prior" vs "posterior"', think: 'Prior = BEFORE data. Posterior = AFTER data. MAP maximizes posterior.' },
  { trigger: '"no feature scaling needed"', think: 'Decision trees — use comparisons, not distances.' },
  { trigger: '"R² increases with more features"', think: 'Always true for training R². Use Adjusted R² instead.' },
  { trigger: '"outlier sensitive loss"', think: 'MSE (squares errors). MAE is more robust.' },
  { trigger: '"pruning" in trees', think: 'Reduces overfitting. Pre-pruning = stop early. Post-pruning = remove branches.' },
  { trigger: '"information gain bias"', think: 'Biased toward features with MANY values. Fix: use Gain Ratio (C4.5).' },
  { trigger: '"linear in parameters"', think: 'Even polynomial regression is "linear" regression — linear in weights, not features.' },
];
