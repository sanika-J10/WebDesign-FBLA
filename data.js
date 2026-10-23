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
];

const events = [
  {
    id: "sample-event",
    name: "Example Community Workshop",
    category: "Education",
    city: "Cumming",
    date: "2027-01-15",
    description:
      "Example event record. Replace with a verified event.",
    website: "https://example.org",
    verified: false
  }
];
