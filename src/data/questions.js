// 40+ MCQ questions covering all topics
export const QUESTIONS = [
  // === LINEAR REGRESSION ===
  {
    id: 1,
    topic: 'linear_models',
    subtopic: 'linear_regression',
    question: 'In linear regression, what does the term "linear" refer to?',
    options: [
      'The relationship between x and y must be a straight line',
      'The model is linear in its parameters (weights)',
      'The features must be linearly independent',
      'The loss function must be linear'
    ],
    correct: 1,
    explanation: 'Linear regression is "linear" because it is linear in its PARAMETERS (weights). You can use polynomial features (x², x³) and it\'s still linear regression because ŷ = w₀ + w₁x + w₂x² is linear in w₀, w₁, w₂.',
    wrongExplanations: [
      'This is the common misconception. Polynomial regression (with x², x³ features) is still a form of linear regression.',
      'While multicollinearity is a concern, this is not what "linear" refers to in the name.',
      'The MSE loss function is actually quadratic (squared), not linear.'
    ],
    difficulty: 'medium'
  },
  {
    id: 2,
    topic: 'linear_models',
    subtopic: 'linear_regression',
    question: 'Which of the following is TRUE about R² (coefficient of determination)?',
    options: [
      'R² = 1 always indicates a good model',
      'R² can never be negative',
      'Adding more features can never decrease R² on training data',
      'R² measures the causal relationship between variables'
    ],
    correct: 2,
    explanation: 'Adding more features will always increase or maintain R² on training data (never decrease it), even if the features are irrelevant. This is why Adjusted R² is preferred — it penalizes adding useless features.',
    wrongExplanations: [
      'R² = 1 on training data usually means OVERFITTING, not a good model.',
      'R² CAN be negative for very poor models (worse than predicting the mean).',
      'R² measures correlation/association, NOT causation. Correlation ≠ causation.'
    ],
    difficulty: 'medium'
  },
  {
    id: 3,
    topic: 'linear_models',
    subtopic: 'linear_regression',
    question: 'Why is MSE (Mean Squared Error) sensitive to outliers?',
    options: [
      'Because it uses absolute values',
      'Because it divides by n',
      'Because squaring amplifies large errors disproportionately',
      'Because it uses logarithms'
    ],
    correct: 2,
    explanation: 'MSE squares each error, so a large error (e.g., 10) becomes 100, while a small error (e.g., 1) becomes 1. This disproportionate amplification makes MSE very sensitive to outliers. MAE (Mean Absolute Error) is more robust to outliers.',
    wrongExplanations: [
      'MAE uses absolute values, not MSE. MSE uses squared values.',
      'Dividing by n just normalizes — it doesn\'t cause outlier sensitivity.',
      'Cross-entropy uses logarithms, not MSE.'
    ],
    difficulty: 'easy'
  },
  // === LOGISTIC REGRESSION ===
  {
    id: 4,
    topic: 'linear_models',
    subtopic: 'logistic_regression',
    question: 'What type of problem does logistic regression solve?',
    options: [
      'Regression (continuous output)',
      'Clustering (unsupervised grouping)',
      'Classification (categorical output)',
      'Dimensionality reduction'
    ],
    correct: 2,
    explanation: 'Despite having "regression" in its name, logistic regression is a CLASSIFICATION algorithm. It predicts probabilities using the sigmoid function and classifies based on a threshold (default 0.5).',
    wrongExplanations: [
      'This is the most common trap! The name is misleading — it\'s classification, not regression.',
      'Clustering is unsupervised. Logistic regression is supervised.',
      'PCA does dimensionality reduction. Logistic regression classifies.'
    ],
    difficulty: 'easy'
  },
  {
    id: 5,
    topic: 'linear_models',
    subtopic: 'logistic_regression',
    question: 'What is the range of the sigmoid function σ(z)?',
    options: [
      '(-∞, +∞)',
      '[-1, 1]',
      '(0, 1)',
      '[0, 1]'
    ],
    correct: 2,
    explanation: 'The sigmoid function σ(z) = 1/(1+e^(-z)) outputs values strictly between 0 and 1 (exclusive). It asymptotically approaches 0 and 1 but never reaches them. This makes it perfect for representing probabilities.',
    wrongExplanations: [
      'This is the range of the input z, not the output σ(z).',
      'This is the range of the tanh function, not sigmoid.',
      'Sigmoid never actually equals 0 or 1 (approaches asymptotically), so it\'s open interval (0,1).'
    ],
    difficulty: 'medium'
  },
  {
    id: 6,
    topic: 'linear_models',
    subtopic: 'logistic_regression',
    question: 'Why is cross-entropy loss used instead of MSE for logistic regression?',
    options: [
      'Cross-entropy is always smaller than MSE',
      'MSE with sigmoid creates a non-convex loss surface with local minima',
      'MSE cannot handle probabilities',
      'Cross-entropy is faster to compute'
    ],
    correct: 1,
    explanation: 'MSE combined with the sigmoid function creates a non-convex loss surface with many local minima, making optimization difficult. Cross-entropy + sigmoid is convex, guaranteeing a single global minimum that gradient descent can find.',
    wrongExplanations: [
      'The magnitude of the loss isn\'t the issue — it\'s the shape of the loss surface.',
      'MSE can handle probabilities mathematically, but the optimization landscape is poor.',
      'Computation speed is not the main reason. Convexity is.'
    ],
    difficulty: 'hard'
  },
  // === GRADIENT DESCENT ===
  {
    id: 7,
    topic: 'linear_models',
    subtopic: 'gradient_descent',
    question: 'In gradient descent, what happens if the learning rate is too large?',
    options: [
      'The model converges faster to the optimal solution',
      'The model may overshoot the minimum and diverge',
      'The model always finds the global minimum',
      'The gradients become zero'
    ],
    correct: 1,
    explanation: 'A learning rate that\'s too large causes the updates to overshoot the minimum. Instead of converging, the loss may oscillate wildly or even increase (diverge). The learning rate must be carefully tuned.',
    wrongExplanations: [
      'While larger steps are faster, too large means overshooting — it won\'t converge at all.',
      'Large learning rate makes it LESS likely to find any minimum, let alone the global one.',
      'Gradients becoming zero is a separate issue (vanishing gradients), not caused by large learning rate.'
    ],
    difficulty: 'easy'
  },
  {
    id: 8,
    topic: 'linear_models',
    subtopic: 'gradient_descent',
    question: 'Which variant of gradient descent uses a random single training example per update?',
    options: [
      'Batch Gradient Descent',
      'Mini-Batch Gradient Descent',
      'Stochastic Gradient Descent (SGD)',
      'Newton\'s Method'
    ],
    correct: 2,
    explanation: 'Stochastic Gradient Descent (SGD) uses ONE random training example per weight update. Batch GD uses ALL examples. Mini-batch uses a small random subset (e.g., 32 samples). SGD is noisy but fast and can escape local minima.',
    wrongExplanations: [
      'Batch GD uses ALL training examples per update — stable but slow.',
      'Mini-batch uses a SUBSET (e.g., 32), not a single example.',
      'Newton\'s method uses second-order derivatives (Hessian), not single examples.'
    ],
    difficulty: 'easy'
  },
  // === OVERFITTING / UNDERFITTING ===
  {
    id: 9,
    topic: 'linear_models',
    subtopic: 'overfitting_underfitting',
    question: 'A model has 99% training accuracy but 55% test accuracy. What is this an example of?',
    options: [
      'Underfitting',
      'Overfitting',
      'Good generalization',
      'High bias'
    ],
    correct: 1,
    explanation: 'A large gap between training accuracy (99%) and test accuracy (55%) is the classic sign of OVERFITTING. The model has memorized the training data but fails to generalize to new data. Fix: regularization, more data, simpler model.',
    wrongExplanations: [
      'Underfitting would show LOW accuracy on BOTH training and test sets.',
      'Good generalization would show similar accuracy on training and test (e.g., both ~85%).',
      'High bias = underfitting = poor performance on both sets. This is high VARIANCE.'
    ],
    difficulty: 'easy'
  },
  {
    id: 10,
    topic: 'linear_models',
    subtopic: 'overfitting_underfitting',
    question: 'Which of the following will help REDUCE overfitting?',
    options: [
      'Adding more features',
      'Increasing model complexity',
      'Adding more training data',
      'Removing regularization'
    ],
    correct: 2,
    explanation: 'More training data helps the model learn the true patterns instead of memorizing noise. Other fixes: regularization, feature selection, simpler model, dropout, early stopping.',
    wrongExplanations: [
      'More features can increase overfitting by giving the model more ways to memorize noise.',
      'More complexity = more capacity to memorize = more overfitting.',
      'Removing regularization INCREASES overfitting.'
    ],
    difficulty: 'easy'
  },
  // === REGULARIZATION ===
  {
    id: 11,
    topic: 'linear_models',
    subtopic: 'regularization',
    question: 'Which regularization technique can drive feature weights to EXACTLY zero?',
    options: [
      'L2 (Ridge)',
      'L1 (Lasso)',
      'Dropout',
      'Batch Normalization'
    ],
    correct: 1,
    explanation: 'L1 (Lasso) regularization can set weights to EXACTLY zero, effectively performing feature selection. L2 (Ridge) shrinks weights toward zero but never reaches exactly zero. This makes L1 useful when you want a sparse model.',
    wrongExplanations: [
      'L2 (Ridge) shrinks weights but they remain non-zero. It cannot do feature selection.',
      'Dropout randomly deactivates neurons during training — it\'s for neural networks, not feature selection.',
      'Batch normalization normalizes activations — it\'s not a feature selection technique.'
    ],
    difficulty: 'medium'
  },
  {
    id: 12,
    topic: 'linear_models',
    subtopic: 'regularization',
    question: 'As the regularization parameter λ increases, what happens?',
    options: [
      'The model becomes more complex and may overfit',
      'The weights increase in magnitude',
      'The model becomes simpler and may underfit',
      'The learning rate increases'
    ],
    correct: 2,
    explanation: 'Higher λ means STRONGER regularization penalty. This forces weights to be smaller, making the model simpler. Too much regularization → underfitting. λ=0 → no regularization → potential overfitting.',
    wrongExplanations: [
      'More regularization makes the model SIMPLER, not more complex.',
      'Regularization DECREASES weight magnitudes, not increases.',
      'λ and learning rate are separate hyperparameters.'
    ],
    difficulty: 'medium'
  },
  // === KNN ===
  {
    id: 13,
    topic: 'knn_naive_bayes',
    subtopic: 'knn',
    question: 'KNN is described as a "lazy learner." What does this mean?',
    options: [
      'It learns slowly during training',
      'It has no explicit training phase — it stores all data and computes at prediction time',
      'It only works with small datasets',
      'It uses a simplified model'
    ],
    correct: 1,
    explanation: 'KNN is "lazy" because it does NO computation during training — it just stores the data. ALL computation happens at prediction time when it calculates distances to every stored point. This makes training instant but prediction slow.',
    wrongExplanations: [
      'There is no "slow training" — there\'s NO training at all.',
      'KNN can work with any size dataset, but it becomes slow for large ones.',
      'KNN doesn\'t use a "model" at all — it directly uses the stored data.'
    ],
    difficulty: 'easy'
  },
  {
    id: 14,
    topic: 'knn_naive_bayes',
    subtopic: 'knn',
    question: 'What happens when K is set to 1 in KNN?',
    options: [
      'The model underfits',
      'The model becomes the most complex (highest variance, potential overfitting)',
      'The model always predicts the majority class',
      'The algorithm becomes faster'
    ],
    correct: 1,
    explanation: 'K=1 means each prediction is based on the single nearest neighbor. This creates very complex, jagged decision boundaries that follow every noise point — classic overfitting (high variance, low bias).',
    wrongExplanations: [
      'K=1 is the most COMPLEX setting — it overfits, not underfits.',
      'K=n (total samples) always predicts majority class, not K=1.',
      'K=1 still requires distance computation to all points — no speed improvement.'
    ],
    difficulty: 'medium'
  },
  {
    id: 15,
    topic: 'knn_naive_bayes',
    subtopic: 'knn',
    question: 'Why must features be scaled/normalized before using KNN?',
    options: [
      'To make the algorithm converge faster',
      'Because KNN uses distance metrics, and features with larger ranges would dominate',
      'To reduce the number of features',
      'Because KNN requires normally distributed data'
    ],
    correct: 1,
    explanation: 'KNN relies on distance calculations. Without scaling, a feature ranging 0-1000 would dominate over a feature ranging 0-1, even if the smaller feature is more important. Scaling ensures equal contribution from all features.',
    wrongExplanations: [
      'KNN has no convergence — there\'s no training/optimization.',
      'Scaling doesn\'t reduce features — that\'s feature selection/PCA.',
      'KNN has no distributional assumptions — that\'s Gaussian Naïve Bayes.'
    ],
    difficulty: 'easy'
  },
  // === CURSE OF DIMENSIONALITY ===
  {
    id: 16,
    topic: 'knn_naive_bayes',
    subtopic: 'curse_of_dimensionality',
    question: 'What is the main effect of the curse of dimensionality on KNN?',
    options: [
      'KNN becomes faster',
      'All points become roughly equidistant, making nearest neighbor meaningless',
      'KNN starts to underfit',
      'The decision boundary becomes linear'
    ],
    correct: 1,
    explanation: 'In very high dimensions, the ratio of nearest to farthest neighbor distance approaches 1 — all points are roughly the same distance apart. This makes the concept of "nearest neighbor" meaningless, and KNN performance degrades.',
    wrongExplanations: [
      'KNN becomes SLOWER in high dimensions (more distance calculations).',
      'The issue isn\'t bias (underfitting) — it\'s that distances lose meaning entirely.',
      'KNN doesn\'t produce linear boundaries based on dimensionality.'
    ],
    difficulty: 'medium'
  },
  // === NAIVE BAYES ===
  {
    id: 17,
    topic: 'knn_naive_bayes',
    subtopic: 'naive_bayes',
    question: 'What is the "naïve" assumption in Naïve Bayes?',
    options: [
      'The data is normally distributed',
      'All classes have equal probability',
      'Features are conditionally independent given the class',
      'The model is linear'
    ],
    correct: 2,
    explanation: 'The "naïve" assumption is that all features are CONDITIONALLY INDEPENDENT given the class label. This means P(x₁,x₂|C) = P(x₁|C)·P(x₂|C). This assumption is rarely true but NB still works well in practice!',
    wrongExplanations: [
      'Normal distribution is an assumption of Gaussian NB specifically, not the naïve assumption.',
      'Equal class probability is a uniform prior — not the naïve assumption.',
      'Naïve Bayes is not a linear model — the naïve assumption is about feature independence.'
    ],
    difficulty: 'easy'
  },
  {
    id: 18,
    topic: 'knn_naive_bayes',
    subtopic: 'naive_bayes',
    question: 'Which Naïve Bayes variant is best suited for text classification?',
    options: [
      'Gaussian Naïve Bayes',
      'Multinomial Naïve Bayes',
      'Bernoulli Naïve Bayes',
      'Kernel Naïve Bayes'
    ],
    correct: 1,
    explanation: 'Multinomial Naïve Bayes works with count/frequency data, making it ideal for text classification where features are word counts (bag-of-words). Gaussian NB is for continuous features. Bernoulli NB is for binary features.',
    wrongExplanations: [
      'Gaussian NB assumes features are continuous and normally distributed — not ideal for word counts.',
      'Bernoulli NB works with binary (present/absent) features. While it can work for text, Multinomial is better for word frequencies.',
      'There is no standard "Kernel Naïve Bayes" variant.'
    ],
    difficulty: 'medium'
  },
  {
    id: 19,
    topic: 'knn_naive_bayes',
    subtopic: 'naive_bayes',
    question: 'What problem does Laplace smoothing solve in Naïve Bayes?',
    options: [
      'Overfitting on large datasets',
      'The zero probability problem (unseen feature values make posterior = 0)',
      'High computational cost',
      'Non-normal feature distributions'
    ],
    correct: 1,
    explanation: 'If a feature value never appears with a certain class in training, P(feature|class) = 0, making the entire posterior probability = 0 (since we multiply probabilities). Laplace smoothing adds a small count (usually 1) to prevent zero probabilities.',
    wrongExplanations: [
      'Laplace smoothing isn\'t about overfitting — it\'s about preventing zero probabilities.',
      'Laplace smoothing doesn\'t affect computation speed.',
      'Non-normal distributions are handled by choosing the right NB variant, not smoothing.'
    ],
    difficulty: 'medium'
  },
  // === PRIOR, LIKELIHOOD, POSTERIOR ===
  {
    id: 20,
    topic: 'knn_naive_bayes',
    subtopic: 'bayes_components',
    question: 'In Bayes\' Theorem, what does the PRIOR represent?',
    options: [
      'The probability of the data given the class',
      'The probability of the class before seeing the data',
      'The probability of the class after seeing the data',
      'The probability of the data regardless of class'
    ],
    correct: 1,
    explanation: 'The prior P(C) is your belief about the class BEFORE seeing any data/evidence. For example, if 1% of emails are spam, then P(spam) = 0.01. The prior is estimated from the training data class frequencies.',
    wrongExplanations: [
      'That\'s the LIKELIHOOD P(X|C).',
      'That\'s the POSTERIOR P(C|X) — what we want to compute.',
      'That\'s the EVIDENCE P(X).'
    ],
    difficulty: 'easy'
  },
  {
    id: 21,
    topic: 'knn_naive_bayes',
    subtopic: 'bayes_components',
    question: 'In MAP (Maximum A Posteriori) estimation, what are we maximizing?',
    options: [
      'P(X) — the evidence',
      'P(X|C) — the likelihood',
      'P(C|X) — the posterior probability',
      'P(C) — the prior'
    ],
    correct: 2,
    explanation: 'MAP classification finds the class with the highest POSTERIOR probability: argmax_C P(C|X) = argmax_C P(X|C)·P(C). Unlike MLE which only considers likelihood, MAP also considers the prior.',
    wrongExplanations: [
      'Evidence P(X) is the same for all classes — maximizing it doesn\'t help classification.',
      'Maximizing only the likelihood is MLE (Maximum Likelihood Estimation), not MAP.',
      'The prior is fixed and doesn\'t depend on the input data.'
    ],
    difficulty: 'medium'
  },
  // === ENTROPY & INFORMATION GAIN ===
  {
    id: 22,
    topic: 'trees_svm',
    subtopic: 'entropy_info_gain',
    question: 'What is the entropy of a dataset with 50% class A and 50% class B?',
    options: [
      '0',
      '0.5',
      '1.0',
      '2.0'
    ],
    correct: 2,
    explanation: 'H = -0.5·log₂(0.5) - 0.5·log₂(0.5) = -0.5·(-1) - 0.5·(-1) = 0.5 + 0.5 = 1.0. A 50/50 split has MAXIMUM entropy (maximum uncertainty/impurity) for binary classification.',
    wrongExplanations: [
      'Entropy = 0 means a PURE node (all same class). 50/50 is maximally impure.',
      'Entropy of 0.5 would be for an uneven split, not 50/50.',
      'For binary classification, entropy maximum is 1.0, not 2.0.'
    ],
    difficulty: 'medium'
  },
  {
    id: 23,
    topic: 'trees_svm',
    subtopic: 'entropy_info_gain',
    question: 'Information Gain is biased towards features with:',
    options: [
      'Few distinct values',
      'Many distinct values',
      'Continuous values only',
      'Binary values only'
    ],
    correct: 1,
    explanation: 'Information Gain tends to favor features with MANY distinct values (like an ID column with unique values — it would split perfectly!). This is why C4.5 uses Gain Ratio instead, which normalizes by the split information.',
    wrongExplanations: [
      'IG is biased toward MORE values, not fewer.',
      'IG works with any feature type, not just continuous.',
      'IG works with any feature type, not just binary.'
    ],
    difficulty: 'hard'
  },
  // === GINI INDEX ===
  {
    id: 24,
    topic: 'trees_svm',
    subtopic: 'gini_index',
    question: 'What is the maximum Gini index for a binary classification problem?',
    options: [
      '0',
      '0.25',
      '0.5',
      '1.0'
    ],
    correct: 2,
    explanation: 'For binary classification with 50/50 split: Gini = 1 - (0.5² + 0.5²) = 1 - 0.5 = 0.5. This is the MAXIMUM Gini impurity. Remember: max Gini for binary = 0.5, NOT 1.0 (max entropy for binary = 1.0).',
    wrongExplanations: [
      'Gini = 0 means a PURE node (all same class).',
      'Gini = 0.25 would be for a 50/50 split in... no standard scenario.',
      'Gini max for binary is 0.5, NOT 1.0. Don\'t confuse with entropy (max entropy = 1.0 for binary).'
    ],
    difficulty: 'medium'
  },
  {
    id: 25,
    topic: 'trees_svm',
    subtopic: 'gini_index',
    question: 'Which algorithm uses Gini index by default?',
    options: [
      'ID3',
      'C4.5',
      'CART',
      'Random Forest (based on ID3)'
    ],
    correct: 2,
    explanation: 'CART (Classification and Regression Trees) uses Gini index by default. ID3 uses Information Gain (entropy). C4.5 uses Gain Ratio. sklearn\'s DecisionTreeClassifier implements CART and uses Gini by default.',
    wrongExplanations: [
      'ID3 uses Information Gain (entropy), not Gini.',
      'C4.5 uses Gain Ratio (normalized entropy), not Gini.',
      'Random Forest can use either, but the base question is about which algorithm uses Gini by DEFAULT.'
    ],
    difficulty: 'medium'
  },
  // === TREE DEPTH & PRUNING ===
  {
    id: 26,
    topic: 'trees_svm',
    subtopic: 'tree_depth_pruning',
    question: 'What is the main purpose of pruning a decision tree?',
    options: [
      'To increase training accuracy',
      'To reduce overfitting and improve generalization',
      'To make the tree deeper',
      'To handle missing values'
    ],
    correct: 1,
    explanation: 'Pruning removes branches that don\'t improve generalization, reducing overfitting. An unpruned tree often achieves 100% training accuracy by memorizing data, but performs poorly on new data. Pruning trades some training accuracy for better test accuracy.',
    wrongExplanations: [
      'Pruning typically REDUCES training accuracy (removes memorized patterns).',
      'Pruning makes the tree SHALLOWER/simpler, not deeper.',
      'Missing values are handled by different mechanisms, not pruning.'
    ],
    difficulty: 'easy'
  },
  {
    id: 27,
    topic: 'trees_svm',
    subtopic: 'tree_depth_pruning',
    question: 'Which statement about decision trees is TRUE?',
    options: [
      'Decision trees require feature scaling',
      'Decision trees can only handle numerical features',
      'Decision trees can handle both numerical and categorical features without scaling',
      'Decision trees always produce linear decision boundaries'
    ],
    correct: 2,
    explanation: 'Decision trees split on feature values (comparisons like "age > 30"), so they don\'t need scaling and naturally handle both numerical and categorical features. This is a major advantage over SVM and KNN.',
    wrongExplanations: [
      'Trees do NOT need feature scaling — they use comparisons, not distances.',
      'Trees can handle categorical features naturally (by splitting on categories).',
      'Trees produce AXIS-ALIGNED (rectangular) decision boundaries, which are non-linear but not smooth curves.'
    ],
    difficulty: 'easy'
  },
  // === SVM ===
  {
    id: 28,
    topic: 'trees_svm',
    subtopic: 'svm',
    question: 'What are support vectors in SVM?',
    options: [
      'All data points in the dataset',
      'The data points closest to the decision boundary (hyperplane)',
      'The outlier points far from the boundary',
      'The centroid of each class'
    ],
    correct: 1,
    explanation: 'Support vectors are the training points that lie closest to the decision boundary (on the margin). These are the ONLY points that determine the hyperplane position. Removing non-support-vector points doesn\'t change the boundary at all.',
    wrongExplanations: [
      'Most data points are NOT support vectors — only the closest ones to the boundary matter.',
      'Outliers are far from the boundary — support vectors are the CLOSEST points.',
      'SVM doesn\'t use centroids — that\'s more like a centroid-based classifier.'
    ],
    difficulty: 'easy'
  },
  {
    id: 29,
    topic: 'trees_svm',
    subtopic: 'svm',
    question: 'SVM aims to find the hyperplane that:',
    options: [
      'Minimizes the margin between classes',
      'Passes through the most data points',
      'Maximizes the margin between classes',
      'Has the highest accuracy on training data'
    ],
    correct: 2,
    explanation: 'SVM finds the hyperplane that MAXIMIZES the margin — the distance between the hyperplane and the nearest data points (support vectors) of each class. A larger margin generally leads to better generalization.',
    wrongExplanations: [
      'SVM MAXIMIZES the margin, not minimizes it.',
      'The hyperplane should be BETWEEN classes, not passing through points.',
      'Maximizing margin leads to good generalization, which often differs from max training accuracy.'
    ],
    difficulty: 'easy'
  },
  // === HARD VS SOFT MARGIN ===
  {
    id: 30,
    topic: 'trees_svm',
    subtopic: 'hard_soft_margin',
    question: 'In soft margin SVM, what does a LARGE value of C mean?',
    options: [
      'More regularization, wider margin, more misclassifications allowed',
      'Less regularization, narrower margin, fewer misclassifications',
      'The model becomes a hard margin SVM with no regularization',
      'The kernel changes to linear'
    ],
    correct: 1,
    explanation: 'Large C = high penalty for misclassification = fewer errors allowed = narrower margin = potential overfitting. Think of C as the "cost" of each misclassification. C→∞ approaches hard margin. Note: C is INVERSE of regularization in SVM.',
    wrongExplanations: [
      'This describes SMALL C, not large C.',
      'C→∞ approaches hard margin but any finite C is soft margin.',
      'C doesn\'t affect the kernel choice.'
    ],
    difficulty: 'hard'
  },
  {
    id: 31,
    topic: 'trees_svm',
    subtopic: 'hard_soft_margin',
    question: 'Hard margin SVM will fail when:',
    options: [
      'The dataset is too large',
      'The data is not linearly separable',
      'The features are not scaled',
      'There are too many features'
    ],
    correct: 1,
    explanation: 'Hard margin SVM requires ALL points to be correctly classified with no violations. If the data is not perfectly linearly separable (has overlapping classes or outliers), hard margin SVM has no solution. Soft margin SVM handles this by allowing slack.',
    wrongExplanations: [
      'Dataset size doesn\'t prevent hard margin from finding a solution (it\'s just slow).',
      'Feature scaling affects performance but doesn\'t make hard margin fail entirely.',
      'Many features can actually help (more dimensions to find separating hyperplane).'
    ],
    difficulty: 'medium'
  },
  // === KERNEL TRICK ===
  {
    id: 32,
    topic: 'trees_svm',
    subtopic: 'kernel_trick',
    question: 'What does the kernel trick do?',
    options: [
      'Reduces the number of features',
      'Explicitly maps data to a higher-dimensional space',
      'Computes dot products in a high-dimensional space WITHOUT explicitly mapping the data',
      'Converts the problem from classification to regression'
    ],
    correct: 2,
    explanation: 'The kernel trick computes the dot product between data points as if they were in a higher-dimensional space, WITHOUT actually computing the high-dimensional coordinates. This is computationally efficient — K(x,y) = φ(x)ᵀφ(y) without computing φ(x) and φ(y).',
    wrongExplanations: [
      'The kernel trick doesn\'t reduce features — it implicitly ADDS dimensions.',
      'The key word is "WITHOUT explicitly mapping" — that\'s the whole trick.',
      'The kernel trick doesn\'t change the problem type.'
    ],
    difficulty: 'medium'
  },
  {
    id: 33,
    topic: 'trees_svm',
    subtopic: 'kernel_trick',
    question: 'The RBF (Gaussian) kernel maps data to a space of what dimensionality?',
    options: [
      'Same as original',
      'Double the original',
      'A fixed high dimension',
      'Infinite dimensions'
    ],
    correct: 3,
    explanation: 'The RBF kernel K(x,y) = exp(-γ||x-y||²) implicitly maps data to an INFINITE-dimensional space. This is possible because we never actually compute the coordinates — we just compute the kernel function value directly.',
    wrongExplanations: [
      'The whole point is to go to a HIGHER dimension, not stay the same.',
      'It\'s not just double — RBF goes to infinite dimensions.',
      'It\'s not "fixed" — it\'s infinite. That\'s what makes RBF so powerful.'
    ],
    difficulty: 'hard'
  },
  {
    id: 34,
    topic: 'trees_svm',
    subtopic: 'kernel_trick',
    question: 'In the RBF kernel, what happens when γ (gamma) is very large?',
    options: [
      'The decision boundary becomes very smooth (underfitting)',
      'The decision boundary becomes very complex/tight (overfitting)',
      'The SVM becomes linear',
      'The margin width increases'
    ],
    correct: 1,
    explanation: 'Large γ means each training point has a small area of influence, creating very tight, complex decision boundaries around individual points — leading to overfitting. Small γ = wide influence = smooth boundary = potential underfitting.',
    wrongExplanations: [
      'This describes SMALL gamma, not large gamma.',
      'Large γ makes the SVM MORE non-linear, not linear.',
      'Large γ creates tighter boundaries, effectively REDUCING the margin.'
    ],
    difficulty: 'hard'
  },
  // === CROSS-TOPIC / COMPARISON QUESTIONS ===
  {
    id: 35,
    topic: 'linear_models',
    subtopic: 'loss_functions',
    question: 'A dataset has many outliers. Which loss function is more robust?',
    options: [
      'MSE (Mean Squared Error)',
      'MAE (Mean Absolute Error)',
      'Cross-Entropy',
      'Hinge Loss'
    ],
    correct: 1,
    explanation: 'MAE uses absolute values, so outliers contribute linearly. MSE squares the error, so outliers contribute quadratically (much more). Therefore MAE is more robust to outliers. However, MAE is not differentiable at zero.',
    wrongExplanations: [
      'MSE is SENSITIVE to outliers because it squares errors — a large error contributes disproportionately.',
      'Cross-entropy is for classification, not regression with outliers.',
      'Hinge loss is for SVM, not regression with outliers.'
    ],
    difficulty: 'medium'
  },
  {
    id: 36,
    topic: 'knn_naive_bayes',
    subtopic: 'knn',
    question: 'Which of the following algorithms does NOT have an explicit training phase?',
    options: [
      'Logistic Regression',
      'Naïve Bayes',
      'KNN',
      'SVM'
    ],
    correct: 2,
    explanation: 'KNN is a lazy learner with NO explicit training phase. It simply stores the training data and does all computation at prediction time. All other options have a training phase where parameters/probabilities are learned.',
    wrongExplanations: [
      'Logistic Regression trains weights using gradient descent.',
      'Naïve Bayes trains by computing prior and likelihood probabilities.',
      'SVM trains by finding the optimal hyperplane and support vectors.'
    ],
    difficulty: 'easy'
  },
  {
    id: 37,
    topic: 'trees_svm',
    subtopic: 'tree_depth_pruning',
    question: 'Which algorithm is most affected by irrelevant features?',
    options: [
      'Decision Trees (with proper splitting criteria)',
      'KNN',
      'SVM with linear kernel',
      'Naïve Bayes'
    ],
    correct: 1,
    explanation: 'KNN is highly affected by irrelevant features because it uses ALL features equally in distance computation. Irrelevant features add noise to distances. Decision trees naturally ignore irrelevant features (they won\'t be selected for splitting).',
    wrongExplanations: [
      'Decision trees naturally handle irrelevant features by not selecting them for splits.',
      'SVM can be affected but L2 regularization helps distribute weights.',
      'Naïve Bayes is somewhat robust because irrelevant features have similar distributions across classes.'
    ],
    difficulty: 'hard'
  },
  {
    id: 38,
    topic: 'trees_svm',
    subtopic: 'svm',
    question: 'Which algorithm is most sensitive to feature scaling?',
    options: [
      'Decision Trees',
      'Naïve Bayes',
      'KNN and SVM',
      'Random Forest'
    ],
    correct: 2,
    explanation: 'KNN and SVM are both distance-based algorithms and are very sensitive to feature scaling. Features with larger ranges will dominate distance calculations. Decision trees use comparisons (not distances) and don\'t need scaling.',
    wrongExplanations: [
      'Decision trees don\'t use distances — they compare feature values. No scaling needed.',
      'Naïve Bayes uses probabilities, not distances. Less sensitive to scaling.',
      'Random Forest (based on decision trees) doesn\'t use distances either.'
    ],
    difficulty: 'medium'
  },
  {
    id: 39,
    topic: 'linear_models',
    subtopic: 'regularization',
    question: 'Elastic Net regularization combines:',
    options: [
      'Dropout and Batch Normalization',
      'L1 and L2 regularization',
      'Ridge and PCA',
      'Cross-validation and early stopping'
    ],
    correct: 1,
    explanation: 'Elastic Net combines L1 (Lasso) and L2 (Ridge) penalties: L = L₀ + λ₁Σ|wᵢ| + λ₂Σwᵢ². This gives both the feature selection ability of L1 and the stability of L2.',
    wrongExplanations: [
      'Dropout and batch normalization are neural network techniques, not combined in Elastic Net.',
      'PCA is dimensionality reduction, not combined with Ridge in Elastic Net.',
      'These are training techniques, not regularization types combined in Elastic Net.'
    ],
    difficulty: 'easy'
  },
  {
    id: 40,
    topic: 'knn_naive_bayes',
    subtopic: 'naive_bayes',
    question: 'Despite its "naïve" independence assumption being usually wrong, Naïve Bayes often works well because:',
    options: [
      'It uses a very complex model internally',
      'The ranking of class probabilities can still be correct even with wrong probability estimates',
      'It automatically detects and handles dependent features',
      'It uses deep learning internally'
    ],
    correct: 1,
    explanation: 'Even when the independence assumption is violated, the RANKING of posterior probabilities is often preserved. We don\'t need the exact probabilities — we just need the correct class to have the HIGHEST probability. This is why NB works well despite naive assumptions.',
    wrongExplanations: [
      'Naïve Bayes is actually one of the SIMPLEST models.',
      'NB does NOT detect dependencies — it simply ignores them (that\'s the "naïve" part).',
      'NB is a classical probabilistic model, not deep learning.'
    ],
    difficulty: 'hard'
  },
  // Additional questions for more coverage
  {
    id: 41,
    topic: 'linear_models',
    subtopic: 'gradient_descent',
    question: 'Why should features be normalized before applying gradient descent?',
    options: [
      'To make the loss function convex',
      'To ensure equal step sizes across all feature dimensions for faster convergence',
      'To remove outliers',
      'Gradient descent only works with normalized features'
    ],
    correct: 1,
    explanation: 'When features have very different scales, the loss surface becomes elongated (elliptical contours). Gradient descent takes many zigzagging steps to converge. With normalized features, the contours are more circular, enabling faster, direct convergence.',
    wrongExplanations: [
      'Normalization doesn\'t change the convexity of the loss function.',
      'Normalization scales features; it doesn\'t remove outliers.',
      'Gradient descent works without normalization — it\'s just much slower.'
    ],
    difficulty: 'medium'
  },
  {
    id: 42,
    topic: 'trees_svm',
    subtopic: 'entropy_info_gain',
    question: 'A node in a decision tree has all samples belonging to class A. What is its entropy?',
    options: [
      '1.0',
      '0.5',
      '0',
      'Undefined'
    ],
    correct: 2,
    explanation: 'A pure node (all same class) has entropy = 0. H = -1·log₂(1) = -1·0 = 0. There\'s no uncertainty — we know exactly what class every sample belongs to.',
    wrongExplanations: [
      'Entropy = 1.0 is the MAXIMUM impurity (50/50 binary split).',
      'Entropy = 0.5 would be for some intermediate split.',
      'Entropy is well-defined for pure nodes — it\'s 0.'
    ],
    difficulty: 'easy'
  },
  {
    id: 43,
    topic: 'trees_svm',
    subtopic: 'svm',
    question: 'If you remove a data point that is NOT a support vector, what happens to the SVM decision boundary?',
    options: [
      'The boundary shifts toward the removed point\'s class',
      'The boundary becomes less accurate',
      'Nothing — the boundary stays exactly the same',
      'The margin width decreases'
    ],
    correct: 2,
    explanation: 'The SVM decision boundary is determined ONLY by the support vectors. Removing any non-support-vector point has zero effect on the hyperplane. This is a key property of SVM — most of the training data is irrelevant to the final model.',
    wrongExplanations: [
      'Only support vectors affect the boundary — other points don\'t.',
      'The boundary doesn\'t change, so accuracy is unaffected.',
      'The margin is determined by support vectors, not other points.'
    ],
    difficulty: 'medium'
  },
  {
    id: 44,
    topic: 'knn_naive_bayes',
    subtopic: 'bayes_components',
    question: 'If the prior is uniform (equal for all classes), then MAP estimation is equivalent to:',
    options: [
      'Minimum Variance Estimation',
      'Maximum Likelihood Estimation (MLE)',
      'Bayesian Estimation',
      'Least Squares Estimation'
    ],
    correct: 1,
    explanation: 'MAP = argmax P(X|C)·P(C). If P(C) is the same for all classes (uniform prior), then maximizing P(X|C)·P(C) is the same as maximizing P(X|C) alone, which is exactly MLE. So uniform prior → MAP = MLE.',
    wrongExplanations: [
      'Minimum Variance is a different estimation concept.',
      'MAP IS Bayesian estimation. The question asks what it\'s EQUIVALENT to when prior is uniform.',
      'Least squares is a specific loss function, not an estimation framework.'
    ],
    difficulty: 'hard'
  },
  {
    id: 45,
    topic: 'trees_svm',
    subtopic: 'kernel_trick',
    question: 'When is a linear kernel preferred over RBF for SVM?',
    options: [
      'When the data has very few features',
      'When the number of features is much larger than the number of samples',
      'When the data is highly non-linear',
      'When you want the fastest prediction time regardless of accuracy'
    ],
    correct: 1,
    explanation: 'When features >> samples (e.g., text data with thousands of word features), the data is often already linearly separable in the high-dimensional feature space. A linear kernel is sufficient, faster, and less prone to overfitting than RBF in this case.',
    wrongExplanations: [
      'Few features might mean the data needs non-linear transformation (RBF).',
      'Non-linear data is exactly when you need RBF, not linear kernel.',
      'Speed isn\'t the primary reason — it\'s about the data structure.'
    ],
    difficulty: 'hard'
  }
];

export function getQuestionsByTopic(topicId) {
  return QUESTIONS.filter(q => q.topic === topicId);
}

export function getQuestionsBySubtopic(subtopicId) {
  return QUESTIONS.filter(q => q.subtopic === subtopicId);
}

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateQuiz(count = 40) {
  const shuffled = shuffleArray(QUESTIONS);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
