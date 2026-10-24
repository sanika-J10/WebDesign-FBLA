const organizations = [
  {
    id: "forsyth-county-library",
    name: "Forsyth County Public Library",
    category: "Education",
    description:
      "A public library system offering teen learning resources, reading and writing opportunities, leadership programs, volunteering, and events at multiple branches.",
    website: "https://www.focolibrary.org/teens",
    phone: "770-781-9840",
    address:
      "Multiple branches throughout Forsyth County, including Cumming Library and Denmark Library.",
    serviceArea: ["Cumming", "Alpharetta"],
    featured: true
  }
];

const resources = [
  {
    id: "nfcc-financial-assistance",
    name: "North Fulton Community Charities — Financial Assistance",
    category: "Financial Assistance",
    city: "Roswell",
    description:
      "Provides emergency financial assistance to eligible residents experiencing temporary hardship. Support may include rent, mortgage, and essential utility bills such as gas, water, and electricity.",
    audience: "Residents experiencing temporary financial hardship in eligible ZIP codes",
    cost: "Free assistance for eligible applicants",
    website: "https://nfcchelp.org/financial-assistance/",
    actionLabel: "Complete Interest Form",
    actionUrl: "https://www.tfaforms.com/5116738",
    address: "11270 Elkins Road, Roswell, GA 30076",
    phone: "(770) 640-0399",
    serviceArea: [
      "Alpharetta",
      "Milton",
      "Johns Creek",
      "Roswell",
      "Duluth"
    ],
    eligibility:
      "Eligible ZIP codes: 30004, 30005, 30009, 30022, 30024, 30075, 30076, 30097. Confirm eligibility with NFCC before applying.",
    appointment:
      "Preliminary online registration and documentation are required. Financial assistance walk-ins are not accepted.",
    importantNote:
      "Applicants may need photo ID, proof of residency or lease, and income documentation. Confirm current requirements with NFCC.",
    source: "https://nfcchelp.org/financial-assistance/",
    tags: [
      "financial assistance",
      "rent",
      "mortgage",
      "utilities",
      "electricity",
      "gas",
      "water",
      "bills",
      "emergency help"
    ],
    featured: true,
    verified: false
  },
  {
    id: "nfcc-food-pantry",
    name: "North Fulton Community Charities — Food Pantry",
    category: "Food & Essentials",
    city: "Roswell",
    description:
      "Offers food and essential household items, including canned goods, dry goods, fresh produce, snacks, meats, toiletries, diapers, paper goods, and cleaning products.",
    audience: "Community members seeking food and essential supplies; confirm eligibility with NFCC",
    cost: "Contact NFCC to confirm any requirements",
    website: "https://nfcchelp.org/food-assistance/",
    actionLabel: "View Food Assistance",
    actionUrl: "https://nfcchelp.org/food-assistance/",
    address: "11270 Elkins Road, Roswell, GA 30076",
    phone: "(770) 640-0399",
    hours: {
      Monday: "9:00 AM–4:30 PM",
      Tuesday: "9:00 AM–7:30 PM",
      Wednesday: "9:00 AM–4:30 PM",
      Thursday: "9:00 AM–7:30 PM",
      Friday: "9:00 AM–4:30 PM",
      Saturday: "10:00 AM–1:00 PM",
      Sunday: "Closed"
    },
    appointment:
      "The information collected indicates that the main food pantry does not require an appointment. Confirm current hours and requirements before visiting.",
    services: [
      "Canned goods",
      "Dry goods",
      "Fresh fruit and vegetables",
      "Snacks and meats",
      "Toiletries and diapers",
      "Paper goods and cleaning products"
    ],
    source: "https://nfcchelp.org/food-assistance/",
    tags: [
      "food",
      "food pantry",
      "groceries",
      "produce",
      "essentials",
      "toiletries",
      "diapers",
      "household supplies"
    ],
    featured: true,
    verified: false
  },
  {
    id: "east-roswell-food-pantry",
    name: "East Roswell Food Pantry",
    category: "Food & Essentials",
    city: "Roswell",
    description:
      "Provides food and essential supplies through an appointment-only pantry serving people who need assistance.",
    audience: "People seeking food assistance; confirm eligibility with the pantry",
    cost: "Contact the pantry to confirm any requirements",
    website: "https://nfcchelp.org/food-assistance/",
    actionLabel: "View Pantry Information",
    actionUrl: "https://nfcchelp.org/food-assistance/",
    address: "2385 Holcomb Bridge Road, Roswell, GA 30076",
    phone: "678-387-4465",
    hours: {
      Tuesday: "10:00 AM–1:00 PM",
      Thursday: "1:00 PM–4:00 PM"
    },
    appointment:
      "Appointment required. Contact the pantry or check the official food assistance page before visiting.",
    source: "https://nfcchelp.org/food-assistance/",
    tags: [
      "food",
      "food pantry",
      "groceries",
      "essentials",
      "appointment required",
      "East Roswell"
    ],
    featured: false,
    verified: false
  },
  {
    id: "the-place-food-pantry",
    name: "The Place of Forsyth County — Food Pantry",
    category: "Food & Essentials",
    city: "Cumming",
    description:
      "Provides a client-choice food pantry, online grocery ordering, emergency food boxes, and mobile food pantry distributions for people experiencing food insecurity.",
    audience:
      "Individuals and families in need who live in Forsyth or Dawson County",
    cost: "Free",
    website: "https://www.theplacega.org/",
    actionLabel: "Visit The Place Website",
    actionUrl: "https://www.theplacega.org/",
    address:
      "Forsyth location: 2550 The Place Circle, Cumming, GA 30040. Dawson location: 829 GA 9 N, Dawsonville, GA 30534.",
    phone: "770-887-1098",
    serviceArea: ["Cumming", "Dawsonville"],
    importantNote:
      "Initial client registration requires photo ID and proof of address in Forsyth or Dawson County. According to the information collected, online food ordering is available from Thursday at 5:00 AM through Monday at 11:59 PM. Confirm the current schedule and ordering process with The Place.",
    source: "https://www.theplacega.org/",
    tags: [
      "food",
      "food pantry",
      "groceries",
      "emergency food",
      "food boxes",
      "mobile pantry",
      "online ordering",
      "Forsyth County",
      "Dawson County"
    ],
    featured: false,
    verified: false
  },
  {
    id: "the-place-financial-assistance",
    name: "The Place of Forsyth County — Emergency Financial Assistance",
    category: "Financial Assistance",
    city: "Cumming",
    description:
      "Offers partial emergency financial assistance to eligible households facing a temporary crisis. Assistance may help with rent, utilities, and prescription costs.",
    audience:
      "Eligible households in Forsyth and Dawson counties, particularly households with children and senior households facing emergencies",
    cost: "Free; assistance is partial and eligibility-based",
    website: "https://www.theplacega.org/",
    actionLabel: "View Assistance Information",
    actionUrl: "https://www.theplacega.org/",
    address:
      "Forsyth location: 2550 The Place Circle, Cumming, GA 30040. Dawson location: 829 GA 9 N, Dawsonville, GA 30534.",
    phone: "770-887-1098",
    serviceArea: ["Cumming", "Dawsonville"],
    importantNote:
      "Ongoing financial assistance is not offered. Applicants may need photo ID, a current signed lease or utility bill, proof of income, and financial or bank statements from the past 30 days. Contact The Place to confirm current requirements and availability.",
    source: "https://www.theplacega.org/",
    tags: [
      "financial assistance",
      "emergency aid",
      "rent",
      "utilities",
      "prescription costs",
      "eviction prevention",
      "bills",
      "Forsyth County",
      "Dawson County"
    ],
    featured: false,
    verified: false
  },
  {
    id: "the-place-employment-education",
    name: "The Place of Forsyth County — Employment & Adult Education",
    category: "Education",
    city: "Cumming",
    description:
      "Offers skill-building and coaching intended to help adults improve practical skills and work toward long-term financial independence. Reported offerings include GED preparation, English language classes, financial literacy, parenting classes, and resume and interview preparation.",
    audience:
      "Adults in Forsyth and Dawson counties seeking education, employment preparation, or practical life skills",
    cost: "Reported as free; confirm with the organization",
    website: "https://www.theplacega.org/",
    actionLabel: "Explore Programs",
    actionUrl: "https://www.theplacega.org/",
    address:
      "Forsyth location: 2550 The Place Circle, Cumming, GA 30040. Dawson location: 829 GA 9 N, Dawsonville, GA 30534.",
    phone: "770-887-1098",
    serviceArea: ["Cumming", "Dawsonville"],
    importantNote:
      "The information collected says interested participants can submit an intake form and staff follow up within 24 hours to arrange coaching or class placement. Confirm current programs and intake instructions with The Place.",
    source: "https://www.theplacega.org/",
    tags: [
      "education",
      "adult education",
      "GED",
      "ESL",
      "English classes",
      "employment",
      "job training",
      "resume",
      "interview skills",
      "financial literacy",
      "parenting classes"
    ],
    featured: false,
    verified: false
  },
  {
    id: "library-teen-learning",
    organizationId: "forsyth-county-library",
    name: "Teen Learning & Digital Resources",
    category: "Education",
    city: "Cumming",
    description:
      "Explore free digital learning tools, research databases, e-books, audiobooks, and reading resources through Forsyth County Public Library. These tools can help students with homework, independent learning, and finding their next book.",
    audience: "Teens, students, and library users; some digital services may require a library card",
    cost: "Free library resources; individual services may have their own requirements",
    website: "https://www.focolibrary.org/teens",
    actionLabel: "Explore Teen Resources",
    actionUrl: "https://www.focolibrary.org/teens",
    serviceArea: ["Cumming", "Alpharetta"],
    tags: [
      "library",
      "homework",
      "research",
      "learning",
      "databases",
      "ebooks",
      "audiobooks",
      "reading",
      "digital resources"
    ],
    featured: true,
    verified: false
  },
  {
    id: "library-teen-writers-club",
    organizationId: "forsyth-county-library",
    name: "Teen Writers' Club",
    category: "Education",
    city: "Cumming",
    description:
      "A writing group for students in grades 6–12 who want to develop their writing, discuss tips and strategies, share original work, and receive feedback from other writers.",
    audience: "Students in grades 6–12",
    cost: "Free; check the event listing for current details",
    website: "https://www.focolibrary.org/teens-Reading-Writing",
    actionLabel: "View Writing Programs",
    actionUrl: "https://www.focolibrary.org/teens-Reading-Writing",
    address: "Cumming Library, Cumming, Georgia",
    serviceArea: ["Cumming"],
    importantNote:
      "Check the official event calendar for upcoming meeting dates, times, and any registration requirements.",
    tags: [
      "library",
      "writing",
      "creative writing",
      "writers club",
      "storytelling",
      "feedback",
      "English",
      "grades 6-12"
    ],
    featured: false,
    verified: false
  },
  {
    id: "library-teen-advisory-board",
    organizationId: "forsyth-county-library",
    name: "Teen Advisory Board",
    category: "Volunteering",
    city: "Cumming",
    description:
      "A leadership opportunity where teens can contribute ideas for library programs, help plan and promote activities, and share feedback about library services for young people.",
    audience: "Teens in grades 6–12; branch-specific participation requirements may apply",
    cost: "Free",
    website: "https://www.focolibrary.org/teens",
    actionLabel: "Explore Teen Opportunities",
    actionUrl: "https://www.focolibrary.org/teens",
    address: "Program availability varies by library branch",
    serviceArea: ["Cumming", "Alpharetta"],
    importantNote:
      "Check the official events calendar for recruitment information, meetings, and membership requirements. Opportunities may differ by branch.",
    tags: [
      "library",
      "leadership",
      "volunteering",
      "community service",
      "student leadership",
      "teen advisory board",
      "planning",
      "grades 6-12"
    ],
    featured: false,
    verified: false
  },
  {
    id: "library-volunteen",
    organizationId: "forsyth-county-library",
    name: "Summer VolunTEEN",
    category: "Volunteering",
    city: "Cumming",
    description:
      "A summer volunteer opportunity for eligible teens to assist library staff with summer reading activities, help patrons participate, and support library materials and events.",
    audience: "Rising grades 9–12; participants must be at least 14 years old",
    cost: "Free volunteer opportunity",
    website: "https://events.forsythpl.org/volunteer",
    actionLabel: "View Volunteer Requirements",
    actionUrl: "https://events.forsythpl.org/volunteer",
    address: "Multiple library branches; confirm the placement when applying",
    serviceArea: ["Cumming", "Alpharetta"],
    importantNote:
      "This is a seasonal summer program. The 2026 application window is closed; the library says the 2027 application process will begin in February 2027. Check the official page for updated requirements.",
    tags: [
      "library",
      "volunteering",
      "summer volunteer",
      "VolunTEEN",
      "community service",
      "summer reading",
      "teen volunteer"
    ],
    featured: false,
    verified: false
  },
];

const events = [
    {
        title: "Alpharetta Farmers Market",
        date: "2026-10-24",
        time: "08:30",
        city: "Alpharetta",
        location: "Downtown Alpharetta",
        category: "Community",
        description: "Browse a Saturday morning market featuring local vendors selling fresh produce, baked goods, cheese, meats, and other foods.",
        website: "https://www.awesomealpharetta.com/events/dont-miss-events/"
    },
    {
        title: "Paint the Town Exhibition",
        date: "2026-10-24",
        time: "10:00",
        city: "Alpharetta",
        location: "Alpharetta Arts Center",
        category: "Arts & Culture",
        description: "Explore artwork created during Alpharetta's Paint the Town plein-air event, where artists paint outdoor scenes inspired by local places.",
        website: "https://www.alpharetta.ga.us/city-events"
    },
    {
        title: "Teen Writers' Club",
        date: "2026-10-27",
        time: "18:30",
        city: "Cumming",
        location: "Cumming Library",
        category: "Education",
        description: "A library program for students in grades 6–12 who want to explore writing and connect with other young writers.",
        website: "https://www.forsythpl.org/cumming-library"
    },
    {
        title: "A History in Horror Movies",
        date: "2026-10-29",
        time: "18:30",
        city: "Cumming",
        location: "Cumming Library",
        category: "Arts & Culture",
        description: "Discover the history of horror movies through this library program. Check the official listing for program details and any attendance requirements.",
        website: "https://www.forsythpl.org/cumming-library"
    },
    {
        title: "Christmas Arts & Crafts Festival",
        date: "2026-11-14",
        time: "09:00",
        city: "Cumming",
        location: "Lanier Tech Conference Center, 111 Pilgrim Mill Road",
        category: "Arts & Culture",
        description: "Shop for handmade gifts and explore work by artists and craftspeople, including pottery, paintings, jewelry, woodwork, textiles, and more.",
        website: "https://cummingartscenter.com/event-item/christmas-arts-crafts-festival-2/"
    },
    {
        title: "Cumming City Center Winter/Holiday Market",
        date: "2026-11-21",
        time: "10:00",
        city: "Cumming",
        location: "Cumming City Center, 423 Canton Road",
        category: "Community",
        description: "Explore a holiday market featuring more than 100 vendors, live music, activities for kids, and photo opportunities with Santa.",
        website: "https://www.cityofcumming.net/event/city-center-winter-holiday-market"
    },
    {
        title: "Season of Celebration Tree Lighting",
        date: "2026-11-21",
        time: "",
        city: "Alpharetta",
        location: "Downtown Alpharetta",
        category: "Community",
        description: "Celebrate the start of the holiday season with a community tree-lighting event featuring seasonal entertainment and family activities.",
        website: "https://www.awesomealpharetta.com/events/dont-miss-events/"
    },
    {
        title: "The Lighting of Avalon",
        date: "2026-11-22",
        time: "",
        city: "Alpharetta",
        location: "Avalon",
        category: "Community",
        description: "Kick off the holiday season at Avalon with festive music, seasonal activities, the opening of Avalon on Ice, and a holiday tree lighting.",
        website: "https://www.awesomealpharetta.com/events/dont-miss-events/"
    },
    {
        title: "Lights on The Loop",
        date: "2026-12-04",
        time: "",
        city: "Alpharetta",
        location: "Alpha Loop",
        category: "Recreation",
        description: "Visit a seasonal light display along a one-mile stretch of the Alpha Loop trail. The listing describes a holiday display running into early January.",
        website: "https://exploregeorgia.org/alpharetta/events"
    }
];
