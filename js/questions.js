// ============================================
// QUESTION BANK
// ============================================

const QUESTIONS = {
  himloco: [
    {
      type: "image",
      image: "assets/himloco/eq/contrastive_loss.png",
      caption: "HIMLoco Contrastive Learning Scheme",
      question: "1 (Explain Equation): Examine the contrastive learning formulation used in HIMLoco. During the swap prediction loss computation, what is the mathematical consequence of substituting Q (computed via Sinkhorn-Knopp) with a standard hard-argmax assignment over the prototypes?",
      options: [
        "It eliminates the need for a target network, allowing symmetric training on a single encoder branch.",
        "It triggers a degenerate representation collapse where all batch samples are trivially mapped to the single densest prototype vector.",
        "It perfectly minimizes the Euclidean distance between predicted velocity and ground truth velocity by bypassing the cross-entropy constraints.",
        "It causes the temperature scaling parameter (τ) to exponentially decay to zero, halting all gradient flow."
      ],
      answer: 1,
      explanation: "Hard-argmax assignment (winner-takes-all) without the equipartition constraints enforced by the Sinkhorn mapping inevitably leads to representation collapse. All representations converge to a single identical point in the latent space."
    },
    {
      type: "image",
      image: "assets/himloco/eq/ppo_clip.png",
      caption: "PPO Clipped Surrogate Objective",
      question: "2 (Describe Reason using Equation): Based on the Proximal Policy Optimization (PPO) objective, why is it theoretically advantageous to clip the probability ratio r_t(θ) between 1-ε and 1+ε rather than applying a strict KL-divergence penalty constraint?",
      options: [
        "Clipping entirely removes the need to calculate Generalized Advantage Estimation (GAE), simplifying the temporal integration.",
        "Clipping avoids the massive computational overhead of exactly computing and differentiating the second-order Hessian matrix required by KL penalties.",
        "Clipping ensures that the advantages are always strictly positive, guaranteeing monotonic improvement at every optimization step.",
        "Clipping acts directly as a substitute for the Value Function loss (L_VF), merging policy and critic optimization into one term."
      ],
      answer: 1,
      explanation: "Strict KL-divergence constraints (as used in TRPO) require complex and computationally enormous second-order derivative approximations (Fisher Information Matrix). PPO's clipping achieves the same trust-region bounds using cheap first-order techniques."
    },
    {
      type: "image",
      image: "assets/himloco/imc.jpeg",
      caption: "Internal Model Control (IMC) Block",
      question: "3 (Explain Block Diagram): In the modified legged locomotion IMC diagram, an 'internal model' block runs parallel to the physical robot. What is the fundamental control loop function of this internal model?",
      options: [
        "It operates as a purely feedforward cascade, directly outputting the joint position targets necessary to clear unmodeled obstacles.",
        "It builds an explicit high-fidelity simulation of terrain collision meshes to predict friction vectors a priori.",
        "It simulates the expected ideal robot physics; the discrepancy between this ideal response and the actual response is then fed back to implicitly infer disturbances.",
        "It completely overrides the high-frequency PD tracking loops to forcibly stabilize the center of mass trajectory."
      ],
      answer: 2,
      explanation: "The architecture of IMC leverages a parallel model that simulates how the system *should* react. By comparing that to how the system *actually* reacts, the error perfectly encapsulates the unmodeled disturbances (mass, friction, impact) without explicit mapping."
    },
    {
      type: "image",
      image: "assets/himloco/overview.jpeg",
      caption: "HIMLoco Overall Framework",
      question: "4 (Describe Flowchart): According to the HIMLoco framework, proprioceptive observations branch into both an Encoder and an Actor network. Why doesn't the Actor network simply use the generated latent system embeddings exclusively, rather than concatenating the raw observations?",
      options: [
        "Because the latent embedding only encodes implicit environmental disturbances, while the raw observations are necessary to establish the instantaneous kinematic state machine of the joints.",
        "Because the actor network utilizes a purely convolutional backend that requires raw 1D time-series shapes to compute the Fourier transform.",
        "Because concatenating raw observations mathematically zeroes out the gradients flowing back into the Contrastive Learning encoder module.",
        "Because the latent space is completely frozen during deployment, requiring raw sensor data to act as a dynamic override."
      ],
      answer: 0,
      explanation: "The latent mapping extracts hidden dynamics (disturbance, payload, friction). However, basic stabilization requires exact knowledge of 'where are my legs right now', which is immediately provided by the raw proprioceptive joint encoders passed directly into the Actor."
    },
    {
      type: "image",
      image: "assets/himloco/eq/gae_returns.png",
      caption: "Generalized Advantage Estimation",
      question: "5 (Explain Control Loop): Inspect the computation of the TD residual (δ_t) embedded inside the GAE formulation. If a robot begins vibrating unstably, causing the value estimate V(s) to crash toward zero abruptly, how does this immediately impact the advantage sequence?",
      options: [
        "The advantage directly maps to infinity, permanently severing the policy update from the physical state space.",
        "The TD residual becomes massively negative, causing a severe negative pull on the advantage estimate, aggressively penalizing the actions that led up to the vibration.",
        "The advantage estimate flips its sign to positive, inadvertently rewarding the vibration as an exploratory maneuver.",
        "The TD residual evaluates to exactly equal to the raw reward step, stripping all multi-step temporal context."
      ],
      answer: 1,
      explanation: "If V(s_t+1) crashes lower than V(s_t), the TD residual δ_t = r_t + γ*V(s_t+1) - V(s_t) becomes negative. This negative error propagates backward through the GAE summation, punishing the preceding policy actions that triggered the instability."
    },
    {
      type: "image",
      image: "assets/himloco/eq/normalization.png",
      caption: "Welford's Online Variance Algorithm",
      question: "6 (Explain Equation): Using the running normalization formulas shown, what systemic initialization issue occurs in the legged policy if the small constant ε (epsilon) is entirely omitted (set to mathematically 0.0)?",
      options: [
        "The running mean vector defaults to standard gravity (-9.81), throwing off the orientation estimation matrix.",
        "During the first few steps when variance across dimensions is naturally zero (all states identical), division by zero occurs causing catastrophic NaN explosions in the network gradients.",
        "The Welford update step becomes unconditionally additive, causing the running mean to spiral towards infinity.",
        "The normalization process acts as a low-pass filter, permanently smoothing out all sudden impact spikes from foot touchdowns."
      ],
      answer: 1,
      explanation: "ε is a strict numerical stability term. In early training, identical initialization batches yield zero variance across the sequence. Dividing by zero (√0) outputs NaNs, immediately corrupting the network weights."
    },
    {
      type: "mcq",
      question: "7 (Explain the reason using equation concepts): HIMLoco trains primarily on simulated quadruped robots. How does the concept of 'Domain Randomization' mathematically alter the convergence bound of the PPO objective function depicted earlier?",
      options: [
        "It minimizes the Kullback-Leibler divergence by forcing all simulated environments to exactly match the target physical hardware.",
        "It artificially broadens the marginal state distribution P(s), effectively smoothing the optimization landscape and mitigating catastrophic sharp minima that fail in reality.",
        "It substitutes the need for a stochastic actor policy by adding deterministic Gaussian noise exactly onto the final torque outputs.",
        "It mathematically guarantees that the Value network will diverge, forcing the algorithm to rely entirely on pure Actor loss."
      ],
      answer: 1,
      explanation: "Domain Randomization adds noise to physics parameters, ensuring the policy doesn't overfit to highly specific mathematical quirks of the simulator (sharp minimas). It broadens the state-space coverage, allowing the surrogate objective to learn generally robust bounds."
    },
    {
      type: "mcq",
      question: "8 (Explain the function): In the provided HIMActorCritic architecture, actions are drawn from a Normal Distribution whose mean is provided by the Actor MLP, but the standard deviation is an independent, globally learned parameter. Why decouple the std dev from the state input?",
      options: [
        "To allow the system to dynamically compute analytical gradients directly through the physical simulator's torque limits.",
        "To satisfy the theoretical requirement that temporal difference residual bounds must be independent identically distributed (I.I.D.) random variables.",
        "To enforce a consistent exploration decay across the entire state space, preventing the network from collapsing exploration variance prematurely in highly specific states.",
        "To vastly increase the parameter count of the Actor multilayer perceptron, accelerating GPU utilization."
      ],
      answer: 2,
      explanation: "If variance is state-dependent, the policy easily gets trapped in local minimums by predicting ~0 variance in states it feels 'confident' in, prematurely halting exploration. A state-independent variance ensures structural, global exploration."
    },
    {
      type: "fillblank",
      question: "9: Rather than fully supervised behavior cloning, the internal model embedding uses ___-supervised learning to compare successive frames and align semantic clusters without manual labeling.",
      wordBank: ["Semi", "Self", "Weak", "Inverse", "Meta"],
      answer: "Self",
      explanation: "Contrastive clustering (like SwAV) generates its own pseudo-labels across views or temporal steps. Because no human annotations are required, it mathematically constitutes Self-Supervised Learning."
    },
    {
      type: "truefalse",
      question: "10: The estimation loss L_est requires the external optical motion capture systems (like Vicon) to capture the ground truth velocity during simulated Isaac Gym training.",
      answer: false,
      explanation: "False. Training occurs in a simulator (Isaac Gym) where the privileged true physical velocity is known absolutely by the physics engine. Vicon is entirely unnecessary for generating the ground truth during simulation."
    }
  ],
  
  navila: [
    {
      type: "image",
      image: "assets/navila/eq/sft_training.png",
      caption: "NaVILA SFT Training Pipeline",
      question: "1 (Explain Equation): Observe the SFT Cross-Entropy loss equation L_SFT. What structural limitation arises because this loss exclusively utilizes negative log-likelihood (NLL) against discrete token annotations without incorporating any reinforcement learning penalty loop?",
      options: [
        "It fails to capture continuous sequence degradation (Covariate Shift), as it mathematically assumes the agent will always exist exactly on the expert’s grounded trajectory during deployment.",
        "It requires the LLaMA parameters to be fully unfrozen and trained in FP32 precision to prevent loss explosions.",
        "It cannot handle language vocabulary tokens natively; all text must be pre-translated into geometric XYZ waypoints.",
        "It perfectly guarantees optimal path routing by intrinsically discounting future reward pathways."
      ],
      answer: 0,
      explanation: "Supervised Fine-Tuning forces the model to predict the next expert token given a perfect expert history. During deployment, a small error puts the agent off the expert path. SFT loss offers no recovery mathematically (Behavioral Cloning Covariate Shift limitation)."
    },
    {
      type: "image",
      image: "assets/navila/method.png",
      caption: "NaVILA Hierarchy",
      question: "2 (Describe Flowchart): The NaVILA framework flowchart distinctly separates the 1-2 Hz VLM query execution from the 50 Hz Locomotion control loop. This architectural split is mathematically equivalent to solving which type of classic robotics hierarchy?",
      options: [
        "An inverse kinematics mapping problem to a differential drive.",
        "A multi-arm synchronization trajectory interpolation matrix.",
        "A receding horizon Model Predictive Control (MPC) layered over a high-frequency Joint-Space PD tracking controller.",
        "A simultaneous localization and mapping (SLAM) factor graph optimization algorithm."
      ],
      answer: 2,
      explanation: "The LLM generates long-term semantic goals at low frequencies (acting like a Model Predictive trajectory planner generating setpoints), while the Low-Level Locomotion operates rapidly to physically track and stabilize against those setpoints."
    },
    {
      type: "image",
      image: "assets/navila/eq/vln_metrics.png",
      caption: "VLN Evaluation Metrics",
      question: "3 (Explain Equation): In the NDTW (Normalized Dynamic Time Warping) equation used for the RxR dataset, if the length tolerance parameter (τ) is excessively small, what is the geometric consequence on the metric outcome?",
      options: [
        "The metric becomes unconditionally 1.0, rendering all trajectories structurally indistinguishable.",
        "The metric harshly suppresses the score exponentially toward zero at the slightest deviation in geometric path velocity or exact shape mapping.",
        "The calculation undergoes an infinite-loop condition trying to match terminal nodes against starting positions.",
        "The Euclidean distance computation transforms into Manhattan distance, artificially favoring grid-aligned movements."
      ],
      answer: 1,
      explanation: "The formula exp(-DTW / (τ * |G|)) uses τ in the denominator of the exponent. If τ is microscopic, any non-zero DTW error blows up the negative exponent, collapsing the entire metric score to 0."
    },
    {
      type: "image",
      image: "assets/navila/eq/sft_training.png",
      caption: "SFT Diagram",
      question: "4 (Explain Function/Control Loop): The SigLIP vision encoder processes historical sequences as tokens. Why does processing sequences representing T=8 frames drastically compound the spatial complexity in the Transformer attention mechanism?",
      options: [
        "Because attention dynamically zeroes out layers proportional to the temporal gap.",
        "Because standard self-attention complexity scales strictly quadratically (O(N^2)) with respect to the total number of flattened sequence tokens.",
        "Because the SigLIP architecture is hard-coded physically to reject any inputs beyond T=1 frame mapping.",
        "Because multi-frame sequences require parallel gradient differentiation across multiple GPUs to compute the Jacobian."
      ],
      answer: 1,
      explanation: "Each frame produces X visual tokens. 8 frames produce 8*X tokens. Standard self-attention computes an N*N correlation matrix. Thus scaling context length heavily bottlenecks Memory and Compute scaling quadratically."
    },
    {
      type: "image",
      image: "assets/navila/eq/vln_metrics.png",
      caption: "Success Weighted by Path Length (SPL)",
      question: "5 (Describe Reason using Equation): Observe the SPL formulation. An agent is released into a maze. It takes a massive, random winding path of 100 meters (P_i) to reach a goal sequence that was optimally 5 meters away (L_i), but it successfully arrives. What is its approximate resulting SPL?",
      options: [
        "SPL calculates exactly equal to 1.0, because the binary success indicator S_i overrules spatial distance.",
        "SPL calculates to approximately 0.05, heavily penalizing the catastrophic inefficiency despite the geometric success.",
        "SPL flips to a negative integer to explicitly penalize looping pathways.",
        "SPL results in a division by zero error since random walks cannot be correlated to optimal routes."
      ],
      answer: 1,
      explanation: "SPL = S_i * (L_i / max(P_i, L_i)). Since success is met, S_i = 1. L_i = 5. P_i = 100. max(100, 5) = 100. Thus, the SPL is exactly 1 * (5/100) = 0.05, demonstrating extreme inefficiency."
    },
    {
      type: "mcq",
      question: "6 (Explain Function): In the NaVILA training parameters, a technique called LoRA (Low-Rank Adaptation) is highly probable for fine-tuning the 8-Billion parameter LLaMA backbone. Functionally speaking, how does LoRA inject trainable parameters into the network?",
      options: [
        "By replacing the massive, rigid pre-trained attention projection layers with fully randomized linear layers.",
        "By completely flattening the CNN layers into 1D embedding tokens and scaling them against the text inputs.",
        "By freezing the original pre-trained weight matrices and injecting parallel, tunable low-rank decomposition matrix products (A * B).",
        "By dynamically stripping out weights that possess gradients strictly below a predefined magnitude threshold."
      ],
      answer: 2,
      explanation: "LoRA posits that weight updates have a low intrinsic dimension. Rather than tuning massive W, it freezes W and trains tiny decomposition matrices A and B, where optimized weights equal W + ΔW, and ΔW = A*B."
    },
    {
      type: "mcq",
      question: "7: The NaVILA model bridges Visual Tokens to Text Token Space across a dimensionality boundary. If SigLIP outputs 768-D embeddings and LLaMA requires 4096-D context, what is the most universally standard network topology to map these?",
      options: [
        "A Gaussian Mixture Model clustering node.",
        "A Multi-Layer Perceptron (MLP) or simple linear projection layer.",
        "A Recurrent Neural Network unrolled back-propagation loop.",
        "A Fourier Transform magnitude spectral pool."
      ],
      answer: 1,
      explanation: "Simple MLP projection headers are the universally acclaimed standard (extensively utilized in LLaVA, BLIP, etc.) to project multi-modal geometries into the LLM textual vector-space without distorting the latent shapes."
    },
    {
      type: "truefalse",
      question: "8: To successfully generate sequential geometric navigation commands from textual input, LLaMA must explicitly apply 'Causal Attention Masking' during its feed-forward pass, blocking any observation of subsequent future tokens.",
      answer: true,
      explanation: "True. Because LLMs generate text auto-regressively mapping from left to right, causal masking guarantees preventing information from 'cheating' by looking forward when generating the Nth sequential command token."
    },
    {
      type: "fillblank",
      question: "9: Navigating massive simulated scenes quickly requires abstracting smooth euclidean collision space into a discrete ___ Graph consisting of nodes and connectable edges.",
      wordBank: ["Navigation", "Dependency", "Tension", "Residual", "Voronoi"],
      answer: "Navigation",
      explanation: "In datasets mapping the real world computationally (Habitat, Matterport3D), physical movement across infinite XY space is condensed mathematically into a Navigation Graph (NavGraph) restricted explicitly to connected waypoints."
    },
    {
      type: "mcq",
      question: "10 (Explain the Reason): When training the low-level locomotion policies acting beneath the VLA hierarchy, continuous torques are preferred over discretized action bounding (like choosing from 4 rigid steps). Why?",
      options: [
        "Because discrete bounding mathematically guarantees unstable cyclical limits in Inverse Kinematics solving.",
        "Because physical dynamics inherently occupy a fluid, continuous torque envelope; discretizing drastically limits smooth gait synthesis and stability recovery.",
        "Because it is practically impossible to write discrete vectors into PyTorch GPU buffers directly.",
        "Because simulation parameters like Restitution solely respond to 64-bit integer indexing fields."
      ],
      answer: 1,
      explanation: "Discretization 'bins' choices, stripping out nuance. Continuous policies generate smooth gaussian probability distributions over infinite granular states. When physically reacting to sudden impacts or uneven mesh surfaces, granular smoothness distinguishes success from failing drastically."
    }
  ]
};
