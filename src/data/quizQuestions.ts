// data/quizQuestions.ts
import { InsectCardData } from "../types/Insect";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  reward: InsectCardData;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Which insect undergoes complete metamorphosis?",
    options: ["Butterfly", "Ant", "Grasshopper", "Beetle"],
    answer: "Butterfly",
    reward: {
      name: "Monarch Butterfly",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTKye0vAJ3XVcMT3Sn8Df2xZAtRQ-IXHMAqg&s",
      habitat: "Meadows",
      behavior: "Migratory",
      description: "Famous for long migrations and metamorphosis.",
    },
  },
  {
    question: "Which insect is known for making honey?",
    options: ["Butterfly", "Beetle", "Honeybee", "Moth"],
    answer: "Honeybee",
    reward: {
      name: "Honeybee",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzWgJOAlVJaObmFOuCoob9pfqZr5cLyMvRBQ&s",
      habitat: "Gardens, hives",
      behavior: "Social, pollinator",
      description: "Vital pollinator that produces honey.",
    },
  },
  {
    question: "Which insect has a deadly sting and lives in colonies?",
    options: ["Wasp", "Firefly", "Termite", "Fly"],
    answer: "Wasp",
    reward: {
      name: "Yellow Wasp",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWlhUZ2G9KYHe17WQ3iWuX_6SMpmo4bC55Kw&s",
      habitat: "Urban areas, trees",
      behavior: "Aggressive, stinging",
      description: "Known for painful stings and building nests.",
    },
  },
  {
    question: "Which insect lights up at night to attract mates?",
    options: ["Firefly", "Beetle", "Moth", "Cricket"],
    answer: "Firefly",
    reward: {
      name: "Firefly",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgWTd1lF8s03A_mzSgII5w83IO2_QeGlpwNQ&s",
      habitat: "Forests, fields",
      behavior: "Bioluminescent",
      description: "Glows using chemical reaction in abdomen.",
    },
  },
  {
    question: "Which insect is known for chirping at night?",
    options: ["Cricket", "Ant", "Fly", "Beetle"],
    answer: "Cricket",
    reward: {
      name: "Field Cricket",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlCQCj96Ax6dzawIh62whTc24NLLOPVsWY-Q&s",
      habitat: "Fields, grass",
      behavior: "Nocturnal, chirping",
      description: "Produces sound by rubbing wings together.",
    },
  },
  {
    question: "What do ladybugs primarily eat?",
    options: ["Nectar", "Aphids", "Leaves", "Fungi"],
    answer: "Aphids",
    reward: {
      name: "Ladybug",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6EslMaZ4uDQPmftb_ueyaZJBgcMggTW5y-A&s",
      habitat: "Gardens",
      behavior: "Beneficial predator",
      description: "Helps gardeners by eating plant pests.",
    },
  },
  {
    question: "Which insect has the strongest bite for its size?",
    options: ["Ant", "Termite", "Beetle", "Centipede"],
    answer: "Ant",
    reward: {
      name: "Army Ant",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlWMPQE1KmVDryislLGn5753WXea5ltTuL8g&s",
      habitat: "Rainforest",
      behavior: "Aggressive swarm",
      description: "Known for powerful jaws and group attacks.",
    },
  },
  {
    question: "Which insect can walk on water?",
    options: ["Water strider", "Dragonfly", "Bee", "Butterfly"],
    answer: "Water strider",
    reward: {
      name: "Water Strider",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUaBduRJBs3w-kt9uVrxWflVtcXHp_oO8n4w&s",
      habitat: "Ponds, streams",
      behavior: "Surface walking",
      description: "Skims across water using surface tension.",
    },
  },
  {
    question: "Which insect builds silk traps to catch prey?",
    options: ["Spider", "Ant", "Moth", "Beetle"],
    answer: "Spider",
    reward: {
      name: "Orb Weaver",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykp5SJmUrNroMA6n_TNzjRon_3Nh60QMd4g&s",
      habitat: "Forests, gardens",
      behavior: "Web spinning",
      description: "Builds spiral webs to trap insects.",
    },
  },
  {
    question: "Which insect is a master of camouflage on leaves?",
    options: ["Leaf Insect", "Cicada", "Moth", "Dragonfly"],
    answer: "Leaf Insect",
    reward: {
      name: "Leaf Insect",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb6fU6-7iwtMrKa6svwUpZHbVSa_QhaV8wwQ&s",
      habitat: "Tropical forests",
      behavior: "Camouflage",
      description: "Mimics leaves to avoid predators.",
    },
  },

  // 10 more examples (continue pattern):
  {
    question: "Which insect has wings but is a poor flyer?",
    options: ["Termite", "Cockroach", "Beetle", "Grasshopper"],
    answer: "Cockroach",
    reward: {
      name: "Cockroach",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc7QuJ6G3RhkwQQ-lkXPueZpfbywDZ7gih4A&s",
      habitat: "Urban areas",
      behavior: "Nocturnal",
      description: "Survivor species with high resilience.",
    },
  },
  {
    question: "Which insect spends most of its life underground?",
    options: ["Cicada", "Beetle", "Firefly", "Cricket"],
    answer: "Cicada",
    reward: {
      name: "Cicada",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXyZx1dzsuczYSkLcp2KaXvJ4cQ1ljGSEd1Q&s",
      habitat: "Woodlands",
      behavior: "Emerges in cycles",
      description: "Known for 13–17 year life cycles.",
    },
  },
  {
    question: "Which insect has colorful wings and feeds on nectar?",
    options: ["Butterfly", "Beetle", "Wasp", "Moth"],
    answer: "Butterfly",
    reward: {
      name: "Swallowtail Butterfly",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA6xvWt0BJsTFlrkIGtI1YkNkkBu1lSgxs5A&s",
      habitat: "Gardens",
      behavior: "Pollinator",
      description: "Large wings with tail-like extensions.",
    },
  },
  {
    question: "Which insect is known for jumping long distances?",
    options: ["Grasshopper", "Beetle", "Ant", "Fly"],
    answer: "Grasshopper",
    reward: {
      name: "Green Grasshopper",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-EcpOHut_IDj38iMRrFiebJoKniLflb2uaA&s",
      habitat: "Fields",
      behavior: "Jumping, chewing",
      description: "Strong hind legs for leaping.",
    },
  },
  {
    question: "Which insect drills into wood and causes damage?",
    options: ["Termite", "Bee", "Ladybug", "Spider"],
    answer: "Termite",
    reward: {
      name: "Termite",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwCZhBFEHCN6B5JL_oBM8h3m1Dpp1C5QfToQ&s",
      habitat: "Wood structures",
      behavior: "Colony, wood-destroyer",
      description: "Feeds on cellulose, lives in colonies.",
    },
  },
  {
    question: "Which insect mimics a stick for camouflage?",
    options: ["Stick Insect", "Beetle", "Spider", "Wasp"],
    answer: "Stick Insect",
    reward: {
      name: "Stick Insect",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8abtwTTm-0SvnBM2EF2td9tMEkg7KiIL4Q&s",
      habitat: "Forest",
      behavior: "Camouflage",
      description: "Looks like twigs to avoid predators.",
    },
  },
  {
    question: "Which insect is the fastest flyer?",
    options: ["Dragonfly", "Bee", "Wasp", "Fly"],
    answer: "Dragonfly",
    reward: {
      name: "Dragonfly",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhDkdpphJz9xxIaDgG9c8JA5lJxcLnnbTeXw&s",
      habitat: "Near water",
      behavior: "Predator",
      description: "Can fly up to 30 mph.",
    },
  },
  {
    question: "Which insect can survive in extreme cold?",
    options: ["Snow Flea", "Beetle", "Ant", "Moth"],
    answer: "Snow Flea",
    reward: {
      name: "Snow Flea",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAr3-T0ZqlCXjp1WXA7Dsa9V6dcCQb8YqjTw&s",
      habitat: "Snowy areas",
      behavior: "Jumping",
      description: "Can live on snow using antifreeze proteins.",
    },
  },
  {
    question: "Which insect uses sound for mating calls?",
    options: ["Cricket", "Bee", "Spider", "Beetle"],
    answer: "Cricket",
    reward: {
      name: "House Cricket",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxfxyHYF5XJHZ2KdAx7Hz-COeJUNXiVQiPbA&s",
      habitat: "Urban",
      behavior: "Chirping",
      description: "Males chirp to attract females.",
    },
  },
  {
    question: "Which insect has scales on its wings?",
    options: ["Butterfly", "Beetle", "Bee", "Fly"],
    answer: "Butterfly",
    reward: {
      name: "Painted Lady",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7CFLqexqUkd0WWHkVY9Ks6dHCtvhTzhbX8g&s",
      habitat: "Fields",
      behavior: "Pollinator",
      description: "Wings covered with colorful scales.",
    },
  },

  // Continuing from quizQuestions.ts

  {
    question: "Which insect uses mimicry to look like a wasp?",
    options: ["Hoverfly", "Bee", "Butterfly", "Beetle"],
    answer: "Hoverfly",
    reward: {
      name: "Hoverfly",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYydKOiXepmRHdRaj-R5DB6Kd4Mybq_nSUQQ&s",
      habitat: "Gardens, fields",
      behavior: "Mimicry",
      description: "Mimics wasps for protection, but harmless.",
    },
  },
  {
    question: "Which insect has a proboscis for feeding?",
    options: ["Butterfly", "Beetle", "Ant", "Wasp"],
    answer: "Butterfly",
    reward: {
      name: "Zebra Longwing",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ujIfYvi46vSrzgM7Pd6cplB3fkODCov0lw&s",
      habitat: "Tropical areas",
      behavior: "Pollinator",
      description: "Feeds with a long coiled proboscis.",
    },
  },
  {
    question: "Which insect can regenerate lost legs?",
    options: ["Grasshopper", "Beetle", "Stick Insect", "Spider"],
    answer: "Stick Insect",
    reward: {
      name: "Indian Stick Insect",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Bgg4NdiUw-JymUTZYTm-RAc1PhAc737tpQ&s",
      habitat: "Jungles",
      behavior: "Camouflage",
      description: "Can regrow limbs after molting.",
    },
  },
  {
    question: "Which insect is a common indoor pest?",
    options: ["Cockroach", "Ladybug", "Dragonfly", "Bee"],
    answer: "Cockroach",
    reward: {
      name: "German Cockroach",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU6gdUrSBpyvNZ-42y_O7Cot6BJufMAujW-A&s",
      habitat: "Homes",
      behavior: "Nocturnal scavenger",
      description: "Infests kitchens and thrives in darkness.",
    },
  },
  {
    question: "Which insect is famous for synchronized flashing?",
    options: ["Firefly", "Wasp", "Beetle", "Fly"],
    answer: "Firefly",
    reward: {
      name: "Synchronous Firefly",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5DY5Wijg_Psg-AF9XuLgwC4Jzm2fwdl-yZA&s",
      habitat: "Forests",
      behavior: "Bioluminescent",
      description: "Males flash in unison to attract mates.",
    },
  },
  {
    question: "Which insect uses a stinger as defense?",
    options: ["Wasp", "Butterfly", "Beetle", "Firefly"],
    answer: "Wasp",
    reward: {
      name: "Paper Wasp",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtOO0YnRNw1ozE6L6r4qJgxB9_o18F_SWBQ&s",
      habitat: "Eaves, trees",
      behavior: "Stinging",
      description: "Defends its nest with repeated stings.",
    },
  },
  {
    question: "Which insect spins a silk cocoon?",
    options: ["Silkworm", "Ant", "Bee", "Grasshopper"],
    answer: "Silkworm",
    reward: {
      name: "Silkworm",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo-b8V8EnI_n3h92AHrR9QHw5QIrF7Enbx2g&s",
      habitat: "Mulberry trees",
      behavior: "Silk spinner",
      description: "Domesticated for silk production.",
    },
  },
  {
    question: "Which insect lives symbiotically with fungus?",
    options: ["Leafcutter Ant", "Wasp", "Termite", "Beetle"],
    answer: "Leafcutter Ant",
    reward: {
      name: "Leafcutter Ant",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZni4alxD4d8yvRg-5y3kWtb_uTjjoTJ8drQ&s",
      habitat: "Tropical forests",
      behavior: "Farming",
      description: "Cultivates fungus using chewed leaves.",
    },
  },
  {
    question: "Which insect often mimics bees?",
    options: ["Bee Fly", "Hoverfly", "Wasp Beetle", "All of the above"],
    answer: "All of the above",
    reward: {
      name: "Wasp Beetle",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqjJgaRiph__rtYXxIjwBJnV3jYSeLPiWyXA&s",
      habitat: "Woodlands",
      behavior: "Mimicry",
      description: "Harmless beetle mimicking wasp for defense.",
    },
  },
  {
    question: "Which insect has iridescent wings?",
    options: ["Dragonfly", "Butterfly", "Beetle", "Firefly"],
    answer: "Dragonfly",
    reward: {
      name: "Blue Dasher",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQURTCsxohxmjiHE0YIaegtMGCU1VKu_u_Q&s",
      habitat: "Wetlands",
      behavior: "Predatory",
      description: "Wings reflect vibrant metallic colors.",
    },
  },
  {
    question: "Which insect lays eggs in wood?",
    options: ["Carpenter Bee", "Butterfly", "Wasp", "Ant"],
    answer: "Carpenter Bee",
    reward: {
      name: "Carpenter Bee",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdLBICRzsYJpKShqCIddIHzUfWuJu7N02LWg&s",
      habitat: "Wooden structures",
      behavior: "Burrowing",
      description: "Drills into wood to lay eggs.",
    },
  },
  {
    question: "Which insect cleans itself frequently?",
    options: ["Fly", "Bee", "Ant", "Cricket"],
    answer: "Fly",
    reward: {
      name: "House Fly",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUin8HKfMWs96phCPLMB0_xRjBm0p-e02qyw&s",
      habitat: "Urban",
      behavior: "Cleaning",
      description: "Constantly grooms itself to stay sensitive.",
    },
  },
  {
    question: "Which insect carries pollen in pollen baskets?",
    options: ["Honeybee", "Butterfly", "Moth", "Wasp"],
    answer: "Honeybee",
    reward: {
      name: "Worker Bee",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjImgckeRkuI-uta6POAjtw3IZjMsxlIRIA&s",
      habitat: "Hives",
      behavior: "Pollination",
      description: "Collects pollen on hind leg structures.",
    },
  },
  {
    question: "Which insect uses a tail-like structure to lay eggs?",
    options: ["Ichneumon Wasp", "Fly", "Beetle", "Spider"],
    answer: "Ichneumon Wasp",
    reward: {
      name: "Ichneumon Wasp",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8sCVnZYNWy90Z5IXQ1wNqUEhiIaAZEssWlA&s",
      habitat: "Forests",
      behavior: "Parasitic",
      description: "Lays eggs in hosts using long ovipositor.",
    },
  },
  {
    question: "Which insect has large feathery antennae?",
    options: ["Moth", "Butterfly", "Beetle", "Wasp"],
    answer: "Moth",
    reward: {
      name: "Luna Moth",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXd7FlHNqfcPSqL20vfF3Qg_yq4T1popfXxA&s",
      habitat: "Woodlands",
      behavior: "Nocturnal",
      description: "Uses antennae to detect pheromones.",
    },
  },
  {
    question: "Which insect creates a foam nest on plants?",
    options: ["Spittlebug", "Fly", "Wasp", "Cicada"],
    answer: "Spittlebug",
    reward: {
      name: "Spittlebug",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbfY28OQMYkRB0mrqt3Ljdni0TfKnblkpg&s",
      habitat: "Grassy fields",
      behavior: "Foam protection",
      description: "Nymphs hide in frothy spittle mass.",
    },
  },
  {
    question: "Which insect has a sword-like ovipositor?",
    options: ["Katydid", "Bee", "Ant", "Dragonfly"],
    answer: "Katydid",
    reward: {
      name: "Katydid",
      image: "https://www.hiltonpond.org/images/KatydidBushFProfile01.jpg",
      habitat: "Trees",
      behavior: "Nocturnal",
      description: "Lays eggs with long blade-like structure.",
    },
  },
  {
    question: "Which insect drills into plant stems?",
    options: ["Corn Borer", "Moth", "Ant", "Fly"],
    answer: "Corn Borer",
    reward: {
      name: "European Corn Borer",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfakNmrmn2FTe9Pfdd7z9H3vtB5cM4xEkEMQ&s",
      habitat: "Fields",
      behavior: "Pest",
      description: "Damages crops by boring into stems.",
    },
  },
  {
    question: "Which insect uses ballooning to disperse?",
    options: ["Spider", "Ant", "Bee", "Beetle"],
    answer: "Spider",
    reward: {
      name: "Baby Spider",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT-L6ZwQa6lvgEdFdTGWXsjo7xHkeT1B6cow&s",
      habitat: "Various",
      behavior: "Ballooning",
      description: "Rides air currents with silk threads.",
    },
  },
  {
    question: "Which insect can shoot chemicals for defense?",
    options: ["Bombardier Beetle", "Wasp", "Fly", "Ant"],
    answer: "Bombardier Beetle",
    reward: {
      name: "Bombardier Beetle",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp5gwlWmc_uLVil8HeWOaVaQRi_XmK3N0e6g&s",
      habitat: "Forests",
      behavior: "Chemical defense",
      description: "Ejects hot toxic spray from abdomen.",
    },
  },
  {
    question: "Which insect can survive decapitation for days?",
    options: ["Cockroach", "Beetle", "Fly", "Ant"],
    answer: "Cockroach",
    reward: {
      name: "American Cockroach",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAxir2ZwkudAEPkugYzwmU3uS_q8fe3CmO4A&s",
      habitat: "Sewers",
      behavior: "Resilient",
      description: "Can live without a head for a week.",
    },
  },
];
