// ============================================
// QUESTION BANK — HIMLoco & NaVILA
// ============================================

const QUESTIONS = {
  himloco: [
    {
      id:'h1', type:'mcq',
      question:'At which major machine learning conference was HIMLoco accepted?',
      options:['NeurIPS 2024','ICLR 2024','ICML 2023','CVPR 2024'],
      answer:1,
      explanation:'HIMLoco was accepted at ICLR 2024 (The Twelfth International Conference on Learning Representations).'
    },
    {
      id:'h2', type:'mcq',
      question:'Which sensors does HIMLoco\'s HIM framework use as the ONLY inputs?',
      options:['Cameras and LiDAR','Joint encoders and IMU only','GPS and elevation maps','RGB-D cameras and joint encoders'],
      answer:1,
      explanation:'HIM leverages joint encoders and an Inertial Measurement Unit (IMU) as the only sensors — no cameras or elevation maps needed!'
    },
    {
      id:'h3', type:'truefalse',
      question:'HIMLoco requires elevation maps as a sensor input for locomotion control.',
      answer:false,
      explanation:'False! HIMLoco does NOT use elevation maps. It operates with minimal sensors: only joint encoders and IMU.'
    },
    {
      id:'h4', type:'mcq',
      question:'What does HIM explicitly estimate during robot locomotion?',
      options:['Ground friction coefficient','Robot velocity','Terrain elevation','Contact force magnitude'],
      answer:1,
      explanation:'HIM explicitly estimates velocity, while implicitly simulating the system response as a latent embedding.'
    },
    {
      id:'h5', type:'mcq',
      question:'What learning technique does HIMLoco use to train its latent embedding?',
      options:['Supervised learning','Generative adversarial training','Contrastive learning','Transfer learning'],
      answer:2,
      explanation:'Contrastive learning is used to train the embedding — it leverages batch-level information and handles sensor noise robustly.'
    },
    {
      id:'h6', type:'mcq',
      question:'On which real-world robot platform are HIMLoco experiments conducted?',
      options:['Boston Dynamics Spot','Unitree robots','ANYmal C','MIT Mini Cheetah'],
      answer:1,
      explanation:'HIMLoco is validated on Unitree robots in real-world experiments across various terrains.'
    },
    {
      id:'h7', type:'mcq',
      question:'What does "IMC" stand for in the context of HIMLoco\'s theoretical foundation?',
      options:['Internal Motion Controller','Implicit Model Computation','Internal Model Control','Integrated Motor Command'],
      answer:2,
      explanation:'IMC = Internal Model Control — a classical control theory paradigm that inspired HIMLoco\'s design.'
    },
    {
      id:'h8', type:'truefalse',
      question:'The policy network in HIMLoco receives full environmental observations such as ground friction and elevation maps.',
      answer:false,
      explanation:'False! The policy receives only partial observations and the hybrid internal embedding. No raw environmental data is fed directly.'
    },
    {
      id:'h9', type:'mcq',
      question:'What does the implicit latent embedding in HIMLoco capture?',
      options:['Exact terrain geometry and friction','System response indicating robot stability','GPS location data','Power consumption of actuators'],
      answer:1,
      explanation:'The implicit embedding captures the system\'s response, which naturally encodes stability and environmental disturbance information.'
    },
    {
      id:'h10', type:'mcq',
      question:'What is the arXiv paper ID for the HIMLoco paper?',
      options:['2404.14405','2312.11460','2401.00123','2310.99887'],
      answer:1,
      explanation:'HIMLoco is arXiv:2312.11460 — "Hybrid Internal Model: Learning Agile Legged Locomotion with Simulated Robot Response".'
    },
    {
      id:'h11', type:'truefalse',
      question:'HIMLoco uses contrastive learning to utilize batch-level information and deal with sensor noise.',
      answer:true,
      explanation:'True! Contrastive learning in HIMLoco explicitly handles noise and leverages batch-level statistics for a more robust embedding.'
    },
    {
      id:'h12', type:'mcq',
      question:'In HIMLoco\'s two-component framework, what is the role of the HIM module?',
      options:['Policy execution and action selection','Information extraction and embedding generation','Reward shaping and curriculum design','Terrain mapping and localization'],
      answer:1,
      explanation:'HIM (Hybrid Internal Model) is the information extractor that produces the hybrid internal embedding fed to the policy.'
    },
    {
      id:'h13', type:'fillblank',
      question:'HIMLoco: "HIM only explicitly estimates ___ and implicitly simulates the system response as an implicit latent embedding."',
      answer:'velocity',
      wordBank:['velocity','acceleration','position','torque'],
      explanation:'HIM explicitly estimates velocity only — not complex environmental features like friction or terrain height.'
    },
    {
      id:'h14', type:'mcq',
      question:'Which open-source locomotion codebase is HIMLoco built upon?',
      options:['IsaacGym-Envs','legged_gym','PyBullet-Gym','OpenAI Gym'],
      answer:1,
      explanation:'HIMLoco\'s codebase is built upon legged_gym from ETH Zurich\'s Legged Robotics group.'
    },
    {
      id:'h15', type:'truefalse',
      question:'HIMLoco is validated only in simulation and has NOT been tested on physical robots.',
      answer:false,
      explanation:'False! HIMLoco is validated through both simulations across different terrains AND real-world experiments on physical Unitree robots.'
    },
    {
      id:'h16', type:'mcq',
      question:'In Classical IMC, what does the internal model do to achieve robust control?',
      options:['It directly maps sensors to motor commands','It simulates system response to estimate disturbances','It predicts future terrain geometry','It computes optimal reward signals'],
      answer:1,
      explanation:'The internal model simulates the system\'s expected response; comparing real vs. simulated response reveals the disturbance for compensation.'
    },
    {
      id:'h17', type:'fillblank',
      question:'HIMLoco applies ___ learning in the Isaac Gym simulation to train the full locomotion policy.',
      answer:'reinforcement',
      wordBank:['reinforcement','supervised','unsupervised','federated'],
      explanation:'HIMLoco uses reinforcement learning (PPO-based: him_ppo.py) to train the locomotion policy in Isaac Gym simulation.'
    },
    {
      id:'h18', type:'mcq',
      question:'What is the primary advantage of HIMLoco over previous locomotion methods?',
      options:['Uses more sensors for better terrain mapping','Achieves agility with minimal sensors and fast convergence','Works only on flat, indoor terrain','Requires a pre-built 3D map of the environment'],
      answer:1,
      explanation:'HIMLoco achieves substantial agility over challenging terrains with minimal sensors and fast convergence — key contributions of the paper.'
    },
    {
      id:'h19', type:'mcq',
      question:'Which institution is the primary affiliation for the HIMLoco paper?',
      options:['MIT CSAIL','Stanford Robotics','Shanghai AI Laboratory','Carnegie Mellon Robotics Institute'],
      answer:2,
      explanation:'HIMLoco\'s primary affiliation is Shanghai AI Laboratory, with co-authors from Zhejiang University and Tsinghua University.'
    },
    {
      id:'h20', type:'mcq',
      question:'What CUDA version was used in the HIMLoco tested environment?',
      options:['CUDA 10.2','CUDA 11.3','CUDA 12.0','CUDA 11.8'],
      answer:2,
      explanation:'HIMLoco was tested under CUDA 12.0 (with NVIDIA Driver 525.147.05, Python 3.7.16, PyTorch 1.10.0+cu113).'
    },
    // --- Image Questions ---
    {
      id:'h21', type:'image',
      image:'assets/himloco/overview.jpeg',
      caption:'HIMLoco Framework Overview (from the paper)',
      question:'Looking at this HIMLoco framework diagram — what are the TWO main components of its architecture?',
      options:['Encoder Network and Decoder Network','HIM (information extractor) and the Policy Network','Sensor Module and Actuator Module','Simulation Engine and Deployment Module'],
      answer:1,
      explanation:'HIMLoco\'s framework has two components: the HIM information extractor (produces hybrid internal embedding) and the Policy Network (produces actions).'
    },
    {
      id:'h22', type:'image',
      image:'assets/himloco/imc.jpeg',
      caption:'Control paradigm diagram from HIMLoco paper',
      question:'This figure illustrates a classical control paradigm that inspired HIMLoco. What is it called?',
      options:['Model Predictive Control (MPC)','Proportional-Integral-Derivative (PID)','Internal Model Control (IMC)','Reinforcement Learning Control (RLC)'],
      answer:2,
      explanation:'This is Internal Model Control (IMC) — the theoretical foundation for HIMLoco\'s approach of using an internal model to simulate robot response.'
    },
    {
      id:'h23', type:'image',
      image:'assets/himloco/teaser.jpeg',
      caption:'HIMLoco teaser image from the paper',
      question:'What does this teaser image from the HIMLoco paper primarily demonstrate?',
      options:['A robotic arm performing manipulation tasks','A quadruped robot locomoting across challenging terrains','Training loss convergence curves','Simulation environment architectural setup'],
      answer:1,
      explanation:'The teaser shows a quadruped robot (Unitree) demonstrating agile locomotion across various challenging real-world terrains.'
    },
    {
      id:'h24', type:'image',
      image:'assets/himloco/imc.jpeg',
      caption:'Modified IMC framework for locomotion',
      question:'In the modified IMC framework shown here, what does the feedback loop help the system estimate?',
      options:['Future sensor readings from IMU','Environmental disturbances affecting the robot','Battery consumption rate during locomotion','Optimal neural network learning rate'],
      answer:1,
      explanation:'The IMC feedback loop uses the internal model to estimate environmental disturbances — friction, restitution, terrain — without explicitly modeling them.'
    },
    {
      id:'h25', type:'image',
      image:'assets/himloco/overview.jpeg',
      caption:'HIMLoco policy network inputs',
      question:'Based on this HIMLoco framework overview, what inputs does the Policy Network receive?',
      options:['Raw camera images and GPS coordinates','Elevation maps and ground friction values','Partial observations and the hybrid internal embedding','Full state vector from a motion capture system'],
      answer:2,
      explanation:'The policy receives partial observations (joint states + IMU) and the hybrid internal embedding from HIM — crucial to its minimal-sensor design.'
    },
  ],

  navila: [
    {
      id:'n1', type:'mcq',
      question:'At which prestigious robotics conference was NaVILA accepted?',
      options:['ICRA 2025','RSS 2025','IROS 2025','CoRL 2025'],
      answer:1,
      explanation:'NaVILA was accepted at RSS 2025 (Robotics: Science and Systems) — one of the top robotics venues.'
    },
    {
      id:'n2', type:'mcq',
      question:'What does the acronym "VLA" stand for in NaVILA?',
      options:['Visual Locomotion Algorithm','Vector Language Approach','Vision-Language-Action','Visual-LiDAR-Actuation'],
      answer:2,
      explanation:'VLA = Vision-Language-Action — a model class that processes visual and language inputs to output robot actions.'
    },
    {
      id:'n3', type:'mcq',
      question:'What are the two levels of NaVILA\'s hierarchical navigation framework?',
      options:['Perception layer and Control layer','High-level VLA (language commands) and Low-level locomotion policy','Global path planner and Local path planner','Semantic mapper and Motor feedback controller'],
      answer:1,
      explanation:'NaVILA is two-level: a high-level VLA generates language-based navigation commands, and a low-level locomotion policy executes them safely.'
    },
    {
      id:'n4', type:'mcq',
      question:'Which navigation benchmarks are used to evaluate NaVILA\'s performance?',
      options:['KITTI and NuScenes','R2R (Room-to-Room) and RxR (Room-across-Room)','ScanNet and Matterport3D','COCO and ImageNet'],
      answer:1,
      explanation:'NaVILA is evaluated on R2R and RxR — vision-and-language navigation benchmarks in the Matterport3D environment.'
    },
    {
      id:'n5', type:'truefalse',
      question:'NaVILA is a single end-to-end neural network that directly outputs low-level joint torque commands.',
      answer:false,
      explanation:'False! NaVILA is a two-level framework. The VLA outputs high-level language commands; a separate locomotion policy handles motor control.'
    },
    {
      id:'n6', type:'mcq',
      question:'Which large language model backbone does NaVILA build upon?',
      options:['GPT-4','Gemma-7B','LLaMA 3-8B','Mistral-7B'],
      answer:2,
      explanation:'NaVILA uses LLaMA 3-8B as its language backbone (visible in the model name: navila-llama3-8b-8f).'
    },
    {
      id:'n7', type:'mcq',
      question:'What simulator forms the foundation of NaVILA\'s evaluation pipeline?',
      options:['Isaac Gym and MuJoCo','Habitat Lab and VLN-CE','PyBullet and OpenAI Gym','Gazebo and ROS2'],
      answer:1,
      explanation:'NaVILA evaluation is built on Habitat Lab (v0.1.7) and VLN-CE (Vision-and-Language Navigation in Continuous Environments).'
    },
    {
      id:'n8', type:'mcq',
      question:'What is the arXiv paper ID for NaVILA?',
      options:['2312.11460','2408.00123','2412.04453','2501.09876'],
      answer:2,
      explanation:'NaVILA is arXiv:2412.04453 — "NaVILA: Legged Robot Vision-Language-Action Model for Navigation".'
    },
    {
      id:'n9', type:'truefalse',
      question:'NaVILA\'s high-level VLA component generates low-level joint torque commands directly.',
      answer:false,
      explanation:'False! The VLA generates high-level language-based commands (e.g., "move forward", "turn left"). The locomotion policy converts these to motor commands.'
    },
    {
      id:'n10', type:'mcq',
      question:'What type of dataset provides human demonstration data for NaVILA training?',
      options:['Motion capture studio recordings','YouTube Human Touring videos','Hospital corridor CCTV footage','VR headset user recordings'],
      answer:1,
      explanation:'NaVILA uses YouTube Human Touring videos as demonstration data, annotated for navigation instruction following.'
    },
    {
      id:'n11', type:'mcq',
      question:'How many frames does the NaVILA model process per inference step?',
      options:['4 frames','8 frames','16 frames','32 frames'],
      answer:1,
      explanation:'NaVILA processes 8 frames per step (training script: sft_8frames.sh, model name: navila-llama3-8b-8f).'
    },
    {
      id:'n12', type:'mcq',
      question:'What vision encoder does NaVILA use?',
      options:['CLIP ViT-L/14','DINOv2-ViT-G','SigLIP','ResNet-50'],
      answer:2,
      explanation:'NaVILA uses SigLIP as the vision encoder (from pretrain model: navila-siglip-llama3-8b-v1.5-pretrain).'
    },
    {
      id:'n13', type:'truefalse',
      question:'The NaVILA project releases the raw YouTube videos for its Human Touring training dataset.',
      answer:false,
      explanation:'False! Due to copyright, only video IDs and annotations are released. Users download videos themselves using yt-dlp.'
    },
    {
      id:'n14', type:'mcq',
      question:'What does "VLN-CE" stand for?',
      options:['Vision-Learning-Navigation Continuous Evaluation','Visual Language Navigation — Controlled Experiment','Vector Learning Navigation — Computational Engine','Vision-and-Language Navigation in Continuous Environments'],
      answer:3,
      explanation:'VLN-CE = Vision-and-Language Navigation in Continuous Environments — enabling evaluation in continuous physical spaces.'
    },
    {
      id:'n15', type:'mcq',
      question:'Which dataset is used for 3D scene question-answering in NaVILA training?',
      options:['VQAv2','ScanQA','OK-VQA','GQA'],
      answer:1,
      explanation:'ScanQA is used for 3D scene understanding question-answering, giving NaVILA spatial reasoning capabilities.'
    },
    {
      id:'n16', type:'fillblank',
      question:'NaVILA: "It generates high-level ___ commands, while a real-time locomotion policy ensures obstacle avoidance."',
      answer:'language-based',
      wordBank:['language-based','joint-torque','GPS-waypoint','pixel-level'],
      explanation:'NaVILA\'s VLA generates language-based commands (describing navigation intent), which the locomotion policy then executes.'
    },
    {
      id:'n17', type:'mcq',
      question:'What Python version is specified for the NaVILA evaluation environment?',
      options:['Python 3.7','Python 3.8','Python 3.10','Python 3.12'],
      answer:2,
      explanation:'The NaVILA evaluation environment requires Python 3.10 (conda create -n navila-eval python=3.10).'
    },
    {
      id:'n18', type:'truefalse',
      question:'NaVILA was trained completely from scratch without using any pretrained visual or language models.',
      answer:false,
      explanation:'False! NaVILA fine-tunes from a pretrained model (navila-siglip-llama3-8b-v1.5-pretrain) that has vision-language capabilities.'
    },
    {
      id:'n19', type:'mcq',
      question:'What command-line tool does NaVILA documentation specify for downloading YouTube training videos?',
      options:['youtube-dl','ffmpeg','yt-dlp','wget'],
      answer:2,
      explanation:'NaVILA uses yt-dlp (a maintained fork of youtube-dl) to download YouTube videos for the Human Touring dataset.'
    },
    {
      id:'n20', type:'mcq',
      question:'What key capability does NaVILA\'s low-level locomotion policy specifically ensure during navigation?',
      options:['Long-distance path planning','Real-time obstacle avoidance','GPS-based self-localization','Building a semantic 3D map'],
      answer:1,
      explanation:'The low-level locomotion policy ensures real-time obstacle avoidance, running at high frequency independent of the slow VLA inference.'
    },
    // --- Image Questions ---
    {
      id:'n21', type:'image',
      image:'assets/navila/method.png',
      caption:'NaVILA two-level framework architecture (from paper)',
      question:'This NaVILA architecture diagram shows a two-level hierarchy. What does the HIGH-LEVEL component output?',
      options:['Low-level joint torque commands directly to motors','Language-based navigation commands','Raw sensor data processed results','GPS waypoints for path planning'],
      answer:1,
      explanation:'The high-level VLA outputs language-based commands (e.g., "go forward", "turn left") that are passed to the locomotion controller.'
    },
    {
      id:'n22', type:'image',
      image:'assets/navila/logo.png',
      caption:'Project logo',
      question:'This is the logo for which AI robotics research project about legged robot navigation?',
      options:['HIMLoco — Hybrid Internal Model','VILA — Visual Language Assistant','NaVILA — Navigation VLA Model','ANYmal — Autonomous Robot'],
      answer:2,
      explanation:'This is the NaVILA logo — the Legged Robot Vision-Language-Action Model for Navigation (RSS 2025).'
    },
    {
      id:'n23', type:'image',
      image:'assets/navila/method.png',
      caption:'NaVILA two-level system diagram',
      question:'In this NaVILA system diagram, what specific function does the LOW-LEVEL policy handle?',
      options:['Generating language navigation instructions','Understanding semantic scene content from video','Real-time locomotion control and obstacle avoidance','Calling the large language model for decision making'],
      answer:2,
      explanation:'The low-level locomotion policy handles real-time motion control and obstacle avoidance — running faster than VLA inference for safe navigation.'
    },
    {
      id:'n24', type:'image',
      image:'assets/navila/method.png',
      caption:'NaVILA hierarchical control flow',
      question:'Based on this NaVILA framework diagram, which statement BEST describes the interaction between the two levels?',
      options:['Both the VLA and locomotion policy run at the same 500Hz control frequency','The high-level VLA sends commands to the low-level locomotion controller','The locomotion policy trains the VLA through online reinforcement learning','Both levels share identical neural network weights through parameter sharing'],
      answer:1,
      explanation:'The VLA runs at a lower (slower) frequency, sending language commands to the locomotion controller which runs at high frequency for real-time control.'
    },
    {
      id:'n25', type:'image',
      image:'assets/navila/logo.png',
      caption:'NaVILA robot type',
      question:'Based on the NaVILA logo, what class of robotic system does NaVILA primarily target for navigation?',
      options:['Wheeled mobile robots (differential drive)','Legged quadruped robots','Fixed-wing aerial drones','Industrial robotic arms'],
      answer:1,
      explanation:'NaVILA targets legged (quadruped) robots — which have unique navigation challenges due to their dynamic, complex locomotion systems.'
    },
  ]
};
