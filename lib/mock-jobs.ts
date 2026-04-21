import { Job, JobCategory } from "@/types/job";

type JobSeed = [title: string, company: string, location: string];

const techJobs: JobSeed[] = [
  ["Frontend Developer", "Spotify", "Stockholm"],
  ["Backend Developer", "Ericsson", "Göteborg"],
  ["Fullstack Developer", "Klarna", "Stockholm"],
  ["React Developer", "Volvo Cars", "Göteborg"],
  ["AI Engineer", "Sana", "Stockholm"],
  ["Data Engineer", "H&M", "Stockholm"],
  ["DevOps Engineer", "King", "Stockholm"],
  ["iOS Developer", "Truecaller", "Stockholm"],
  ["Android Developer", "Kry", "Stockholm"],
  ["QA Engineer", "SEB", "Stockholm"],
  ["Cloud Engineer", "Tietoevry", "Malmö"],
  ["Platform Engineer", "Northvolt", "Skellefteå"],
  ["Security Engineer", "Axis", "Lund"],
  ["Product Engineer", "Bontouch", "Stockholm"],
  ["Web Developer", "Acast", "Stockholm"],
  ["Tech Lead", "Mojang", "Stockholm"],
  ["Machine Learning Engineer", "Volumental", "Stockholm"],
  ["IT Support Specialist", "IKEA", "Helsingborg"],
];

const salesMarketingJobs: JobSeed[] = [
  ["Account Executive", "HubSpot", "Göteborg"],
  ["B2B Säljare", "Salesforce", "Malmö"],
  ["Growth Marketer", "NA-KD", "Borås"],
  ["Digital Marketer", "Afound", "Stockholm"],
  ["Performance Marketer", "Matsmart", "Stockholm"],
  ["Brand Manager", "Oatly", "Malmö"],
  ["Content Manager", "Estrid", "Stockholm"],
  ["CRM Specialist", "CDON", "Malmö"],
  ["SEO Specialist", "Prisjakt", "Ängelholm"],
  ["Paid Social Manager", "Babyshop", "Stockholm"],
  ["SDR", "Lime", "Lund"],
  ["Business Developer", "Vainu", "Stockholm"],
  ["Marketing Coordinator", "Daniel Wellington", "Stockholm"],
  ["Copywriter", "iDeal of Sweden", "Norrköping"],
  ["Partnership Manager", "Bolt", "Stockholm"],
  ["PR Manager", "Paradox", "Stockholm"],
  ["Sales Manager", "Schibsted", "Stockholm"],
  ["E-commerce Manager", "Lyko", "Stockholm"],
];

const healthcareJobs: JobSeed[] = [
  ["Sjuksköterska", "Region Skåne", "Lund"],
  ["Nurse", "Capio", "Göteborg"],
  ["Undersköterska", "Attendo", "Malmö"],
  ["Vårdbiträde", "Humana", "Stockholm"],
  ["Läkare", "Kry", "Stockholm"],
  ["Barnmorska", "Karolinska", "Stockholm"],
  ["Arbetsterapeut", "Aleris", "Göteborg"],
  ["Fysioterapeut", "Praktikertjänst", "Malmö"],
  ["Kurator", "Stockholms Stad", "Stockholm"],
  ["Tandsköterska", "Folktandvården", "Uppsala"],
  ["Psykolog", "Mindler", "Stockholm"],
  ["Sjukgymnast", "Region Halland", "Halmstad"],
  ["Logoped", "Region Uppsala", "Uppsala"],
  ["Apotekstekniker", "Apotek Hjärtat", "Västerås"],
  ["Medicinsk Sekreterare", "Sahlgrenska", "Göteborg"],
  ["Omsorgsassistent", "Nytida", "Malmö"],
  ["Boendestödjare", "Frösunda", "Stockholm"],
  ["Personlig Assistent", "Kooperativet", "Örebro"],
];

const designJobs: JobSeed[] = [
  ["UX Designer", "Kry", "Stockholm"],
  ["Product Designer", "Figma", "Remote"],
  ["UI Designer", "Klarna", "Stockholm"],
  ["Graphic Designer", "Sniph", "Stockholm"],
  ["Motion Designer", "SVT", "Stockholm"],
  ["Art Director", "Perfect Day", "Stockholm"],
  ["Content Designer", "Spotify", "Stockholm"],
  ["Brand Designer", "Volt", "Stockholm"],
  ["Service Designer", "Doberman", "Stockholm"],
  ["Visual Designer", "Toca Boca", "Stockholm"],
  ["Illustratör", "Storytel", "Stockholm"],
  ["Digital Designer", "NA-KD", "Borås"],
  ["Creative Producer", "Acne Studios", "Stockholm"],
  ["3D Designer", "IKEA", "Älmhult"],
  ["Experience Designer", "Bambuser", "Stockholm"],
  ["Design Lead", "Trustly", "Stockholm"],
  ["Interaction Designer", "Skatteverket", "Stockholm"],
  ["Junior UX Writer", "Avanza", "Stockholm"],
];

const financeAdminJobs: JobSeed[] = [
  ["Controller", "SEB", "Stockholm"],
  ["Ekonomiassistent", "Fortnox", "Växjö"],
  ["Handläggare", "Göteborgs Stad", "Göteborg"],
  ["HR Specialist", "IKEA", "Helsingborg"],
  ["Löneadministratör", "Visma", "Malmö"],
  ["Redovisningsekonom", "PwC", "Stockholm"],
  ["Recruiter", "Academic Work", "Stockholm"],
  ["Office Manager", "Voi", "Stockholm"],
  ["Projektkoordinator", "AFRY", "Göteborg"],
  ["Administratör", "Region Skåne", "Malmö"],
  ["People Partner", "Northvolt", "Stockholm"],
  ["Business Controller", "Volvo", "Göteborg"],
  ["HR Coordinator", "Kinnevik", "Stockholm"],
  ["Talent Acquisition Partner", "Einride", "Stockholm"],
  ["Skadereglerare", "If", "Stockholm"],
  ["Operations Specialist", "Budbee", "Stockholm"],
  ["Payroll Specialist", "Atea", "Malmö"],
  ["Executive Assistant", "EQT", "Stockholm"],
];

const industryJobs: JobSeed[] = [
  ["Platschef", "Skanska", "Uppsala"],
  ["Projektledare", "Tietoevry", "Stockholm"],
  ["Elektriker", "Bravida", "Göteborg"],
  ["Snickare", "Peab", "Malmö"],
  ["Produktionsledare", "Scania", "Södertälje"],
  ["Maskinoperatör", "Sandvik", "Gävle"],
  ["Installatör", "Assemblin", "Stockholm"],
  ["Byggledare", "NCC", "Uppsala"],
  ["Mekaniker", "Volvo", "Göteborg"],
  ["Svetsare", "SSAB", "Luleå"],
  ["Drifttekniker", "E.ON", "Malmö"],
  ["Anläggningsingenjör", "Sweco", "Stockholm"],
  ["Fastighetsskötare", "Riksbyggen", "Malmö"],
  ["Servicetekniker", "Atlas Copco", "Örebro"],
  ["Montör", "ABB", "Västerås"],
  ["Arbetsledare", "JM", "Stockholm"],
  ["Konstruktör", "Saab", "Linköping"],
  ["Processoperatör", "AAK", "Karlshamn"],
];

const serviceJobs: JobSeed[] = [
  ["Butikssäljare", "IKEA", "Stockholm"],
  ["Kundtjänstmedarbetare", "Telia", "Göteborg"],
  ["Lagerarbetare", "Apotea", "Morgongåva"],
  ["Servitör", "ESS Group", "Malmö"],
  ["Receptionist", "Elite Hotels", "Stockholm"],
  ["Barista", "Espresso House", "Göteborg"],
  ["Store Manager", "H&M", "Stockholm"],
  ["Orderplockare", "Mathem", "Stockholm"],
  ["Kassamedarbetare", "ICA", "Uppsala"],
  ["Support Agent", "Nordnet", "Stockholm"],
  ["Biluthyrare", "Mabi", "Malmö"],
  ["Chaufför", "PostNord", "Göteborg"],
  ["Eventpersonal", "Live Nation", "Stockholm"],
  ["Guest Experience Host", "Liseberg", "Göteborg"],
  ["Food Runner", "Basta", "Stockholm"],
  ["Terminalarbetare", "DHL", "Jönköping"],
  ["Nattreceptionist", "Scandic", "Malmö"],
  ["Call Center Agent", "Transcom", "Karlskrona"],
];

const categoryData: Record<JobCategory, JobSeed[]> = {
  tech: techJobs,
  sales_marketing: salesMarketingJobs,
  healthcare: healthcareJobs,
  design: designJobs,
  finance_admin: financeAdminJobs,
  industry: industryJobs,
  service: serviceJobs,
};

const sizePattern: Job["size"][] = [
  "xl",
  "lg",
  "lg",
  "md",
  "md",
  "md",
  "md",
  "sm",
  "sm",
  "sm",
  "sm",
  "sm",
  "xs",
  "xs",
  "md",
  "lg",
  "sm",
  "md",
];

const matchingSkillPool = [
  "Communication",
  "Problem solving",
  "Team collaboration",
  "Customer focus",
  "Planning",
  "Quality mindset",
];

const missingSkillPool = [
  "Leadership",
  "Advanced analytics",
  "SQL",
  "System design",
  "Process improvement",
  "AI workflows",
];

const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  Stockholm: { lat: 59.3293, lng: 18.0686 },
  Göteborg: { lat: 57.7089, lng: 11.9746 },
  Malmö: { lat: 55.60498, lng: 13.0038 },
  Uppsala: { lat: 59.8586, lng: 17.6389 },
  Lund: { lat: 55.7047, lng: 13.191 },
  Västerås: { lat: 59.6099, lng: 16.5448 },
  Helsingborg: { lat: 56.0465, lng: 12.6945 },
  Örebro: { lat: 59.2753, lng: 15.2134 },
  Borås: { lat: 57.721, lng: 12.94 },
  Norrköping: { lat: 58.5877, lng: 16.1924 },
  Södertälje: { lat: 59.1955, lng: 17.6252 },
  Karlshamn: { lat: 56.1702, lng: 14.8631 },
  Skellefteå: { lat: 64.7502, lng: 20.9509 },
  Linköping: { lat: 58.4108, lng: 15.6214 },
  Jönköping: { lat: 57.7826, lng: 14.1618 },
  Karlskrona: { lat: 56.1612, lng: 15.5869 },
  Halmstad: { lat: 56.6745, lng: 12.8578 },
  Växjö: { lat: 56.879, lng: 14.8059 },
  Gävle: { lat: 60.6749, lng: 17.1413 },
  Luleå: { lat: 65.5848, lng: 22.1547 },
  Älmhult: { lat: 56.5515, lng: 14.1381 },
  Ängelholm: { lat: 56.2428, lng: 12.8627 },
  Morgongåva: { lat: 59.9345, lng: 16.9628 },
  Remote: { lat: 59.3293, lng: 18.0686 },
};

function hashSeed(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function withJitter(base: { lat: number; lng: number }, seed: string) {
  const hashed = hashSeed(seed);
  const latJitter = ((hashed % 17) - 8) * 0.006;
  const lngJitter = ((Math.floor(hashed / 17) % 17) - 8) * 0.006;

  return {
    lat: Number((base.lat + latJitter).toFixed(6)),
    lng: Number((base.lng + lngJitter).toFixed(6)),
  };
}

export const mockJobs: Job[] = Object.entries(categoryData).flatMap(
  ([category, jobs]) =>
  jobs.map(([title, company, location], index) => {
    const baseCoordinates = cityCoordinates[location] ?? cityCoordinates.Stockholm;
    const coordinates = withJitter(baseCoordinates, `${category}-${company}-${title}`);

    return {
      id: `${category}-${index + 1}`,
      title,
      company,
      location,
      companyAddress: `${company}, ${location}, Sweden`,
      coordinates,
      shortDescription: `${title} at ${company}. Help deliver clear impact for teams and customers in ${location}.`,
      matchScore: 58 + ((index * 9) % 39),
      popularityScore: 45 + ((index * 7) % 51),
      status: index % 11 === 0 ? "Closing soon" : index % 13 === 0 ? "Paused" : "Open",
      matchingSkills: matchingSkillPool.slice(0, 2 + (index % 2)),
      missingSkills: missingSkillPool.slice(index % 3, index % 3 + 2),
      category: category as JobCategory,
      size: sizePattern[index],
      x: 18 + ((index * 17) % 64),
      y: 18 + ((index * 13) % 58),
      isPopular: index < 3,
    };
  }),
);
