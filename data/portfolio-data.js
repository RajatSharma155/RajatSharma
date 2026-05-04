var PORTFOLIO_DATA = {
  "personal": {
    "name": "Rajat Sharma",
    "taglines": [
      "Design Engineering Intern @ Cadence",
      "Computer Architecture Researcher",
      "RTL & VLSI Design Engineer",
      "UVM Verification Specialist"
    ],
    "photo": "images/Linkdin3.png",
    "objective": "Design Engineering Intern at Cadence Design Systems, and MS Computer Engineering student at Texas A&M (GPA 4.0/4.0). Experienced in RTL design, computer architecture, SoC verification, and ASIC development.",
    "emails": [
      "rajatsharma.apply@tamu.edu",
      "rajatsharma.apply@gmail.com"
    ],
    "location": "Austin, TX",
    "formEndpoint": "https://formspree.io/f/mwvylopd",
    "resumeFile": "RajatSharma_Resume.pdf",
    "stats": [
      { "value": "4+",   "label": "Years Experience" },
      { "value": "12+",  "label": "Projects" },
      { "value": "4.0",  "label": "MS GPA" },
      { "value": "100%", "label": "Test Coverage" }
    ],
    "social": [
      { "platform": "LinkedIn",  "url": "https://www.linkedin.com/in/itsrajatsharma", "icon": "fa-linkedin" },
      { "platform": "GitHub",    "url": "https://github.com/RajatSharma155",          "icon": "fa-github" },
      { "platform": "Instagram", "url": "https://www.instagram.com/rajat155/",        "icon": "fa-instagram" },
      { "platform": "Facebook",  "url": "https://www.facebook.com/eveningrajat",      "icon": "fa-facebook-f" }
    ]
  },

  "skills": [
    {
      "column": 0,
      "category": "Technical Skills",
      "items": [
        "RTL Design", "Logic / Circuit Design", "Computer Architecture",
        "CDC", "STA", "Design Verification", "SoC Design", "Synthesis",
        "ASIC Design", "FPGA Design", "Formal Verification", "DFT"
      ]
    },
    {
      "column": 1,
      "category": "Languages & Tools",
      "items": [
        "Verilog", "SystemVerilog", "UVM", "Python", "C/C++",
        "TCL", "Perl", "SystemC", "MATLAB",
        "Synopsys VCS", "Verdi", "Spyglass", "PrimeTime",
        "Cadence Virtuoso", "Xcelium", "vManager",
        "JasperGold", "Tempus", "Xilinx Vivado/ISE",
        "Linux", "Git", "Jira", "Lint"
      ]
    },
    {
      "column": 2,
      "category": "Protocols & Interfaces",
      "items": [
        "DDR / LPDDR", "AMBA (AXI / AHB / APB)",
        "PCIe", "I2C", "SPI", "UART",
        "RISC / x86", "DDR Controller", "MESI / MOESI"
      ]
    }
  ],

  "experience": [
    {
      "title": "Design Engineering Intern",
      "company": "Cadence Design Systems — Austin, TX",
      "period": "May 2025 – Dec 2025",
      "bullets": [
        "Designed the on-chip Debug system architecture and authored RTL to enable post-silicon validation of memory controller IP.",
        "Implemented the DDR controller DFI read data path module for robust PHY interface integration.",
        "Conducted synthesis and performed detailed timing and area analysis, implementing optimizations to meet PPA goals."
      ]
    },
    {
      "title": "Research Assistant",
      "company": "Texas A&M University — College Station, TX",
      "period": "Aug 2024 – Apr 2025",
      "bullets": [
        "Built a 9-stage pipelined ASIC with configurable logic, boosting EMT simulations 25× with FIR/IIR-optimized MAC units.",
        "Developed RTL with STA-driven optimizations, achieving 100 MHz performance post-synthesis (Xilinx Vivado) as prototype.",
        "Engineered parallel MAC units to eliminate computational bottlenecks, ensuring cycle-accurate EMT emulation."
      ]
    },
    {
      "title": "Hardware Design Engineer II",
      "company": "Microchip Technology — India",
      "period": "Aug 2021 – Aug 2024",
      "bullets": [
        "Architected and RTL-designed the DDR SDRAM controller read/write datapath micro-architecture for SoC integration, implementing buffering, pipelining, arbitration, and data alignment logic to optimize bandwidth utilization.",
        "Designed and implemented protocol-compliant AXI-to-AHB bridge logic, including burst decomposition, transaction ordering, and ready/valid handshake control under back pressure and corner-case scenarios.",
        "Performed protocol-level verification and debug of DDR datapath and AXI-to-AHB bridge designs using simulation and assertions, resolving timing, ordering, and cross-domain issues to ensure full AXI/AHB compliance."
      ]
    },
    {
      "title": "Hardware Design Intern",
      "company": "Microchip Technology — India",
      "period": "Mar 2021 – Aug 2021",
      "bullets": [
        "Verified RAID controllers, SAS expanders, and interfaces (I2C, SPI, UART, JTAG, PCIe) during design and DVT phases.",
        "Devised a Python automation tool for QUAL/DVT testing, reducing test time by 4× and increasing accuracy to 98%."
      ]
    }
  ],

  "projects": [
    {
      "category": "Computer Architecture",
      "items": [
        {
          "title": "The Entangling Instruction Prefetcher",
          "period": "Mar 2025 – Apr 2025",
          "bullets": [
            "Implemented Entangling Instruction Prefetcher, reducing L1 cache misses by up to 87%.",
            "Achieved 10.1% IPC improvement using optimized prefetching, validated on wrong-path version of ChampSim simulator."
          ]
        },
        {
          "title": "Proximity-aware Cache Coherence Protocol",
          "period": "Feb 2025 – Apr 2025",
          "bullets": [
            "Implemented a proximity-aware MESI protocol to reduce access latency vs. MESI and MOESI using a custom C++ simulator on a 16-core mesh.",
            "Achieved up to 40% lower latency over baseline MESI protocol."
          ]
        },
        {
          "title": "Multi-Core Cache Coherency Controller",
          "period": "Jan 2025 – Mar 2025",
          "bullets": [
            "Developed Verilog-based MSI cache controller with revamped M/S/I transitions and address decoding for multi-core consistency.",
            "Managed bus operations (BusRead, BusReadX, BusUpgrade) to resolve conflicts across shared-memory systems."
          ]
        },
        {
          "title": "Data Reuse in NPU On-chip Memory (DNN Training)",
          "period": "Sep 2024 – Dec 2024",
          "bullets": [
            "Optimized backward pass in SCALE-Sim v2 via interleaved gradient order, enhancing on-chip memory efficiency.",
            "Reduced DRAM traffic by ensuring each ∂y tile loaded once per layer using prefetch and demand matrices."
          ]
        },
        {
          "title": "Cache Replacement Policy Analysis: LRU vs. LFU vs. SRRIP",
          "period": "Sep 2024 – Dec 2024",
          "bullets": [
            "Used ZSim to compare LRU, LFU, and SRRIP on SPEC CPU2006 and PARSEC benchmarks.",
            "SRRIP reduced cache misses by 25% and improved IPC by 15% over LRU baseline."
          ]
        }
      ]
    },
    {
      "category": "RTL / ASIC / VLSI",
      "items": [
        {
          "title": "ASIC: Hardware Accelerator for EMT Simulations",
          "period": "Oct 2024 – Nov 2024",
          "bullets": [
            "Developed Field Programmable Filter Arrays (FPFAs) enabling real-time EMT network hardware simulation with 25× speedup.",
            "Designed optimized ASIC with configurable logic blocks to emulate control elements and implement transfer functions."
          ]
        },
        {
          "title": "8-bit Pipelined Adder Design and Optimization",
          "period": "Oct 2024 – Nov 2024",
          "bullets": [
            "Designed transistor-level 8-bit pipelined adder in Cadence Virtuoso including schematic, layout, DRC/LVS checks, and pre/post-layout simulations.",
            "Optimized transistor sizing using Logical Effort methodology, reducing timing delays and enhancing circuit performance."
          ]
        },
        {
          "title": "2D GPU Implementation on FPGA",
          "period": "Mar 2020 – Jan 2021",
          "bullets": [
            "Designed and implemented a 2D GPU on Altera Cyclone II FPGA with real-time VGA rendering at 640×480 and 320×240.",
            "Implemented double buffering for smooth frame transitions and engineered SRAM-based frame buffer management."
          ]
        }
      ]
    },
    {
      "category": "Verification",
      "items": [
        {
          "title": "Design Verification of HTAX using SV & UVM",
          "period": "Jan 2025 – Feb 2025",
          "bullets": [
            "Developed a modular UVM verification environment for the HTAX crossbar IP with assertions and coverage.",
            "Ran constrained-random regressions achieving 100% functional coverage."
          ]
        },
        {
          "title": "UVM Verification for ROM Controller",
          "period": "Aug 2024 – Sep 2024",
          "bullets": [
            "Developed UVM testbench for ROM controller verifying security features: integrity, address scrambling, decryption.",
            "Achieved 100% functional coverage with fault injection and coverage-driven closure."
          ]
        },
        {
          "title": "Design Verification for UART Controller",
          "period": "Aug 2024 – Sep 2024",
          "bullets": [
            "Built UVM testbench with scoreboard, coverage, and assertions for error conditions (parity, FIFO overflow/underflow).",
            "Achieved 100% coverage of baud rate generation, framing, and interrupts with directed and constrained-random tests."
          ]
        }
      ]
    }
  ],

  "education": {
    "academics": [
      {
        "degree": "Master of Science",
        "field": "Computer Engineering",
        "gpa": "4.0 / 4.0",
        "period": "Aug 2024 – May 2026",
        "institution": "Texas A&M University",
        "location": "College Station, TX",
        "url": "https://www.tamu.edu/index.html",
        "courses": [
          "CMOS VLSI Design",
          "Computer Architecture",
          "Advanced Computer Architecture",
          "VLSI Design Automation",
          "Intro to Hardware Design Verification",
          "Advanced Hardware Functional Verification",
          "Formal Verification"
        ]
      },
      {
        "degree": "Bachelor of Engineering",
        "field": "Electronics & Communications Engineering (VLSI)",
        "gpa": "8.9 / 10",
        "period": "Aug 2017 – Jun 2021",
        "institution": "Bangalore Institute of Technology",
        "location": "Bangalore, India",
        "url": "https://bit-bangalore.edu.in/",
        "courses": [
          "VLSI Design",
          "Digital System Design",
          "Control Systems",
          "Digital Signal Processing",
          "FPGA",
          "Microprocessor"
        ]
      }
    ],
    "certifications": [
      {
        "category": "VLSI & EDA",
        "items": [
          { "title": "SystemVerilog for Design and Verification",          "issuer": "Cadence", "url": "https://www.cadence.com/en_US/home/training/all-courses/82143.html" },
          { "title": "SystemVerilog Accelerated Verification with UVM",    "issuer": "Cadence", "url": "https://www.cadence.com/en_US/home/training/all-courses/86070.html" },
          { "title": "SystemVerilog Assertions",                           "issuer": "Cadence", "url": "https://www.cadence.com/en_US/home/training/all-courses/82165.html" },
          { "title": "Cadence VIP",                                        "issuer": "Cadence" },
          { "title": "Advanced Synthesis with Genus Stylus",               "issuer": "Cadence" }
        ]
      },
      {
        "category": "AI / ML",
        "items": [
          {
            "title": "Deep Learning Specialization",
            "issuer": "Coursera — Deeplearning.ai",
            "period": "Mar 2020 – Jul 2020",
            "instructor": "Andrew Ng, Stanford",
            "modules": ["Neural Networks & Deep Learning", "Hyperparameter Tuning & Regularization", "Structuring ML Projects", "CNNs", "Sequence Models"]
          },
          {
            "title": "TensorFlow in Practice Specialization",
            "issuer": "Coursera — Deeplearning.ai",
            "period": "May 2020 – Jul 2020",
            "instructor": "Laurence Moroney, Google Brain",
            "modules": ["Intro to TensorFlow for AI/ML/DL", "CNNs in TensorFlow", "NLP in TensorFlow", "Sequences & Time Series"]
          }
        ]
      },
      {
        "category": "Programming",
        "items": [
          { "title": "Learn Python Programming Masterclass", "issuer": "Udemy", "period": "Nov 2019 – Jun 2020" }
        ]
      }
    ]
  }
};
