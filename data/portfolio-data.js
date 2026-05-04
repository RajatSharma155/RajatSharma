var PORTFOLIO_DATA = {
  "personal": {
    "name": "RAJAT SHARMA",
    "tagline": "VLSI & Hardware Engineer — Computer Architecture · RTL Design · Verification",
    "taglines": [
      "VLSI & Hardware Engineer",
      "Computer Architecture Researcher",
      "RTL Design Specialist",
      "UVM Verification Expert"
    ],
    "photo": "images/Linkdin3.png",
    "objective": "Actively looking for Internship Opportunities in Computer architecture, microarchitecture, VLSI design, and verification starting May 2025.",
    "phone": "+1 (979) 326-6025",
    "emails": [
      "rajatsharma.apply@gmail.com",
      "evening23@tamu.edu",
      "rajatsharma.apply@tamu.edu"
    ],
    "location": "College Station, TX",
    "formEndpoint": "https://formspree.io/f/mwvylopd",
    "stats": [
      { "value": "3+",   "label": "Years Experience" },
      { "value": "10+",  "label": "Projects" },
      { "value": "25+",  "label": "Technologies" },
      { "value": "100%", "label": "Coverage Achieved" }
    ],
    "social": [
      { "platform": "LinkedIn",  "url": "https://www.linkedin.com/in/itsrajatsharma", "icon": "fa-linkedin" },
      { "platform": "Facebook",  "url": "https://www.facebook.com/eveningrajat",      "icon": "fa-facebook-f" },
      { "platform": "Instagram", "url": "https://www.instagram.com/rajat155/",         "icon": "fa-instagram" },
      { "platform": "GitHub",    "url": "https://github.com/RajatSharma155",           "icon": "fa-github" }
    ]
  },

  "skills": [
    {
      "column": 0,
      "category": "VLSI Design and Verification",
      "items": [
        "RTL Design and Verification",
        "SystemVerilog and Verilog HDL",
        "Assertions and Formal Verification",
        "UVM (Universal Verification Methodology)",
        "ASIC and FPGA Design",
        "Synthesis and Timing Analysis",
        "Power Analysis and Optimization",
        "Clock Domain Crossing (CDC)",
        "Design for Testability (DFT)"
      ]
    },
    {
      "column": 0,
      "category": "Computer Architecture",
      "items": [
        "Microarchitecture Design",
        "Memory Hierarchy and Cache Design",
        "Pipelining and Instruction-Level Parallelism",
        "Branch Prediction and Speculation",
        "RISC-V Architecture",
        "SoC Design",
        "Hardware/Software Co-design"
      ]
    },
    {
      "column": 1,
      "category": "Tools and Technologies",
      "items": [
        "Cadence Tools (Xcelium, Virtuoso, Simvision)",
        "Synopsys Tools (VCS, Verdi)",
        "Xilinx Vivado",
        "JasperGold",
        "Linux and Scripting (Perl, TCL)",
        "Version Control (Git)",
        "JIRA for Project Management"
      ]
    },
    {
      "column": 1,
      "category": "Programming and Software Skills",
      "items": [
        "Python (In-depth knowledge)",
        "C/C++",
        "Perl",
        "Linux",
        "TCL",
        "Assembly Language",
        "MATLAB",
        "Object-Oriented Programming",
        "Embedded Systems Programming",
        "CUDA Programming"
      ]
    },
    {
      "column": 2,
      "category": "Data Science and AI",
      "items": [
        "Machine Learning Algorithms",
        "Deep Learning (ANN, CNN, RNN)",
        "TensorFlow and PyTorch",
        "Natural Language Processing",
        "Time Series Analysis"
      ]
    }
  ],

  "experience": [
    {
      "title": "Research Assistant",
      "company": "Texas A&M University",
      "period": "August 2024 - Ongoing",
      "bullets": [
        "Conducting research under Prof. Weiping Shi, Developed an innovative ASIC solution, Field Programmable Filter Arrays (FPFAs), enabling real-time EMT network hardware simulation with a 25x speedup over traditional methods.",
        "Designed an optimized ASIC with configurable logic blocks to emulate control elements and implement transfer functions."
      ]
    },
    {
      "title": "Hardware Design Engineer II",
      "company": "Microchip Technology Pvt. Ltd. India",
      "period": "August 2021 - August 2024",
      "bullets": [
        "Designed and implemented ASIC DDR SDRAM memory controller control modules, including Read/Write Data Path, Refresh Controller, and Power Management.",
        "Developed directed and constrained-random test cases, UVM sequences, and checkers, ensuring robust documentation and reusable code quality.",
        "Debugged and resolved test failures, maintaining high regression reliability of ~100%.",
        "Utilized Synopsys VCS for design verification, Verdi for waveform generation, debugging, and coverage analysis."
      ]
    },
    {
      "title": "Internship",
      "company": "Microchip Technology Pvt. Ltd. India",
      "period": "March 2021 - August 2021",
      "bullets": [
        "Contributed to Gen 5 Smart RAID Controller PCB design using HDL and Cadence Allegro.",
        "Verified RAID controllers, SAS expanders, and interfaces (I2C, SPI, UART, JTAG, PCIe) during design and DVT phases.",
        "Developed a Python automation tool for QUAL/DVT testing, reducing test time by 4x and increasing accuracy to 98%."
      ]
    }
  ],

  "projects": [
    {
      "category": "Computer Architecture / Microarchitecture",
      "items": [
        {
          "title": "Data Reuse in NPU On-chip Memory with Interleaved Gradient Order for DNN Training",
          "period": "September 2024 - December 2024",
          "bullets": [
            "Optimized backward pass computations in SCALE-Sim v2 by implementing an interleaved gradient order to enhance on-chip memory efficiency during DNN training.",
            "Redesigned ∂x and ∂w computation flow to reuse operand data (∂y, XT, WT), minimizing redundant DRAM accesses via prefetch and demand matrices.",
            "Reduced memory traffic and enhanced data locality by ensuring each ∂y tile was loaded only once per layer, leveraging the systolic array architecture for efficient matrix multiplications."
          ]
        },
        {
          "title": "Cache Replacement Policy Analysis: LRU vs. LFU vs. SRRIP",
          "period": "September 2024 - December 2024",
          "bullets": [
            "Used ZSim to analyze LRU, LFU, and SRRIP policies with SPEC CPU2006 and PARSEC benchmarks, showing SRRIP reduced cache misses by 25% and improved IPC by 15%.",
            "Highlighted SRRIP's adaptability to scanning access patterns and mixed workload localities."
          ]
        }
      ]
    },
    {
      "category": "VLSI Design / RTL / ASIC",
      "items": [
        {
          "title": "ASIC: Hardware Accelerator for EMT Simulations",
          "period": "October 2024 – November 2024",
          "bullets": [
            "Developed an innovative ASIC solution, Field Programmable Filter Arrays (FPFAs), enabling real-time EMT network hardware simulation with a 25x speedup over traditional methods.",
            "Designed an optimized ASIC with configurable logic blocks to emulate control elements and implement transfer functions."
          ]
        },
        {
          "title": "8-bit Pipelined Adder Design and Optimization",
          "period": "October 2024 – November 2024",
          "bullets": [
            "Designed and implemented a transistor-level 8-bit pipelined adder in Cadence Virtuoso, including schematic, layout, DRC/LVS checks, and pre-/post-layout simulations.",
            "Conducted power analysis, input capacitance measurements, and timing characterization to optimize performance and determine maximum operating frequency.",
            "Optimized transistor sizing using Logical Effort methodology, reducing timing delays and enhancing circuit performance."
          ]
        },
        {
          "title": "SRAM Memory Controller",
          "period": "September 2024 - October 2024",
          "bullets": [
            "Designed and implemented SRAM read/write IP cores with direct GPIO manipulation for efficient memory access.",
            "Developed a configurable architecture with adjustable bus widths, customizable timing, and dual-clock domains for high performance.",
            "Delivered a parameterized system supporting integration into FPGA designs and high-frequency operations up to 500 MHz."
          ]
        },
        {
          "title": "Implementation of Two-Dimensional Graphics Card in FPGA",
          "period": "March 2020 - January 2021",
          "bullets": [
            "Designed and implemented a 2D GPU on an Altera Cyclone II FPGA, enabling real-time graphics rendering on VGA displays with resolutions of 640x480 and 320x240.",
            "Developed core drawing functions (lines, circles, rectangles, text) and implemented double buffering for smooth frame transitions, reducing flickering and improving visual output.",
            "Engineered efficient memory management by integrating SRAM for frame buffering and optimizing data flow for graphics processing."
          ]
        },
        {
          "title": "Design of SRAM, MRAM Array and Performance Analysis",
          "period": "January 2020 - March 2020",
          "bullets": [
            "Designed an MRAM cell with an access transistor and Magnetic Tunnel Junction (MTJ), modeled as a resistor, and extended the design to create a 4x4 array using LTspice.",
            "Developed peripheral circuits such as sense amplifiers, precharge circuitry, write drivers, and row/column decoders.",
            "Performed a comparative power analysis between SRAM and MRAM, identifying the primary factors contributing to MRAM's lower power dissipation."
          ]
        }
      ]
    },
    {
      "category": "Verification",
      "items": [
        {
          "title": "UVM Verification for HTAX Specification",
          "period": "September 2024 - November 2024",
          "bullets": [
            "Designed and implemented a UVM-based verification environment for HTAX, achieving 100% functional coverage across virtual channels and port configurations.",
            "Developed assertions and cover points for HTAX protocol validation, reducing debug time by 25%.",
            "Created an efficient UVM scoreboard model for real-time in-order and out-of-order transaction checking, enhancing verification efficiency for complex configurations."
          ]
        },
        {
          "title": "UVM Verification for ROM Controller",
          "period": "August 2024 - September 2024",
          "bullets": [
            "Developed UVM testbench for ROM controller, verifying security features (integrity, address scrambling, decryption).",
            "Achieved 100% functional coverage with targeted tests for ROM operations and fault injection.",
            "Applied advanced techniques: constrained-random stimulus, scoreboard checking, coverage-driven closure."
          ]
        },
        {
          "title": "Design Verification for UART Controller",
          "period": "August 2024 - September 2024",
          "bullets": [
            "Developed UVM testbench with scoreboard, coverage, and assertions for error conditions (parity, FIFO overflow/underflow, break).",
            "Achieved 100% coverage of baud rate generation, framing, and interrupts with directed and constrained-random tests.",
            "Validated error handling and interrupt generation with error injection and coverage-driven techniques."
          ]
        }
      ]
    },
    {
      "category": "Robotics / Embedded",
      "items": [
        {
          "title": "Design of 3D Mapping LIDAR Rover",
          "period": "January 2021 - August 2021",
          "bullets": [
            "Designed and implemented a 3D mapping system using SLAM algorithms for real-time terrain visualization and autonomous navigation.",
            "Integrated LIDAR and stereo camera technology to improve mapping accuracy and enhance environmental detection capabilities.",
            "Optimized path-planning algorithms to increase navigation efficiency and reduce processing time for autonomous systems.",
            "Collaborated with cross-functional teams on hardware-software integration, testing, and debugging, ensuring system reliability across diverse terrains."
          ]
        }
      ]
    }
  ],

  "education": {
    "image": "images/TAMU.jpg",
    "academics": [
      {
        "degree": "Master of Science",
        "field": "Computer Engineering",
        "period": "2024 - Ongoing",
        "institution": "Texas A&M University",
        "url": "https://www.tamu.edu/index.html",
        "courses": [
          "Introduction to Hardware Design Verification",
          "Advanced Hardware Functional Verification",
          "Physical Design Automation",
          "CMOS VLSI Design",
          "Computer Architecture",
          "Advanced Computer Architecture"
        ]
      },
      {
        "degree": "Bachelor of Engineering",
        "field": "Computer Science",
        "period": "2017 - 2021",
        "institution": "Bangalore Institute of Technology",
        "url": "https://bit-bangalore.edu.in/",
        "courses": [
          "Advanced Digital System Design",
          "Digital VLSI Design",
          "Control Signals",
          "Computer Networks",
          "Digital Signal Processing",
          "FPGA",
          "Microprocessor",
          "Engineering Mathematics",
          "Engineering Physics"
        ]
      },
      {
        "degree": "High School",
        "field": "Science Stream",
        "period": "2014 - 2016",
        "institution": "Kendriya Vidyalaya Tenga Valley",
        "url": "https://tengavalley.kvs.ac.in/",
        "courses": [
          "Mathematics",
          "English",
          "Computer Science (C++)",
          "Physics",
          "Chemistry"
        ]
      }
    ],
    "certifications": [
      {
        "category": "VLSI",
        "items": [
          {
            "title": "SystemVerilog for Design and Verification",
            "issuer": "Cadence",
            "url": "https://www.cadence.com/en_US/home/training/all-courses/82143.html"
          },
          {
            "title": "SystemVerilog Accelerated Verification with UVM",
            "issuer": "Cadence",
            "url": "https://www.cadence.com/en_US/home/training/all-courses/86070.html"
          },
          {
            "title": "SystemVerilog Assertions",
            "issuer": "Cadence",
            "url": "https://www.cadence.com/en_US/home/training/all-courses/82165.html"
          }
        ]
      },
      {
        "category": "Programming Language",
        "items": [
          {
            "title": "Learn Python Programming Masterclass",
            "issuer": "Udemy",
            "period": "November 2019 – June 2020",
            "description": "A comprehensive 50-hour course covering Python fundamentals, GUI development, databases, and more."
          }
        ]
      },
      {
        "category": "Deep Learning / AI / ML",
        "items": [
          {
            "title": "Deep Learning Specialization",
            "issuer": "Coursera",
            "period": "March 2020 – July 2020",
            "instructor": "Andrew Ng, Stanford Professor",
            "provider": "Deeplearning.ai",
            "modules": [
              "Neural Networks and Deep Learning",
              "Hyperparameter Tuning, Regularization & Optimization",
              "Structuring Machine Learning Projects",
              "Convolutional Neural Networks",
              "Sequence Models"
            ]
          },
          {
            "title": "TensorFlow in Practice Specialization",
            "issuer": "Coursera",
            "period": "May 2020 – July 2020",
            "instructor": "Laurence Moroney, Google Brain Developer",
            "provider": "Deeplearning.ai",
            "modules": [
              "Introduction to TensorFlow for AI, ML, and DL",
              "Convolutional Neural Networks in TensorFlow",
              "Natural Language Processing in TensorFlow",
              "Sequences, Time Series, and Prediction"
            ]
          }
        ]
      }
    ]
  }
};
