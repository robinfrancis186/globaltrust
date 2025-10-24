import React from 'react';

interface Partner {
  name: string;
  role: string;
  image: string;
  url: string;
}

const partners: Partner[] = [
  {
    name: "Amir Banifatemi",
    role: "AI Commons | Cognizant",
    image: "https://maximages.s3.us-west-1.amazonaws.com/banifatemi.png",
    url: "https://www.linkedin.com/in/abanifatemi/"
  },
  {
    name: "Karine Perset",
    role: "OECD",
    image: "https://maximages.s3.us-west-1.amazonaws.com/karineperset3.jpg",
    url: "https://oecd.ai/en/community/karine"
  },
  {
    name: "Konstantinos Karachalios",
    role: "IEEE SA",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Konstantinos-Picture.jpg",
    url: "https://www.itu.int/en/ITU-T/AI/Pages/karachalios.aspx"
  },
  {
    name: "Sebastian Hallensleben",
    role: "CEN-CENELEC JTC 21",
    image: "https://maximages.s3.us-west-1.amazonaws.com/sebastian.jpg",
    url: "https://oecd.ai/en/community/sebastian-hallensleben"
  },
  {
    name: "Mariagrazia Squicciarini",
    role: "UNESCO",
    image: "https://maximages.s3.us-west-1.amazonaws.com/mariagrazia.jpg",
    url: "https://www.linkedin.com/in/mariagrazia-squicciarini-9a607bba/"
  },
  {
    name: "David Satola",
    role: "World Bank",
    image: "https://maximages.s3.us-west-1.amazonaws.com/davidsatola.jpg",
    url: "https://live.worldbank.org/en/experts/d/david-satola"
  },
  {
    name: "Elham Tabassi",
    role: "NIST",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Elham-Tabassi.jpg",
    url: "https://en.wikipedia.org/wiki/Elham_Tabassi"
  },
  {
    name: "Benoît Bergeret",
    role: "Metalab, Essec Business School",
    image: "https://maximages.s3.us-west-1.amazonaws.com/benoit-bergeret-1.jpeg",
    url: "https://www.linkedin.com/in/benbergeret/"
  },
  {
    name: "Nikita Lukianets",
    role: "OpenEthics",
    image: "https://maximages.s3.us-west-1.amazonaws.com/nikita2.png",
    url: "https://lukianets.com/about/bio/"
  },
  {
    name: "Alice Pavaloiu",
    role: "OpenEthics",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Alice-Pavaloiu.jpg",
    url: "https://www.linkedin.com/in/alice-pavaloiu/"
  },
   {
    name: "Chris Beall",
    role: "Project CONNIE",
    image: "https://maximages.s3.us-west-1.amazonaws.com/beall.jpg",
    url: "https://www.linkedin.com/in/chris-beall-7b2389114/"
  },
  {
    name: "Amanda Leal",
    role: "The Future Society",
    image: "https://maximages.s3.us-west-1.amazonaws.com/amandaleal.jpg",
    url: "https://thefuturesociety.org/team-member/amanda-leal/"
  },
{
    name: "Lihui Xu",
    role: "UNESCO",
    image: "https://maximages.s3.us-west-1.amazonaws.com/lxu.jpg",
    url: "https://www.linkedin.com/in/lihuixu/"
  },
{
    name: "Manpreet Dash",
    role: "AIShield – Powered by Bosch",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Manpreet-Dash.jpeg",
    url: "https://oecd.ai/en/community/manpreet-dash"
  },
{
    name: "Ori Freiman",
    role: "McMaster University’s Digital Society Lab",
    image: "https://maximages.s3.us-west-1.amazonaws.com/orifreiman.jpg",
    url: "https://experts.mcmaster.ca/display/freimano"
  },
{
    name: "Yoav Evenstein",
    role: "AXITRACK",
    image: "https://maximages.s3.us-west-1.amazonaws.com/yoav.jpg",
    url: "https://www.linkedin.com/in/yoaveve/"
  },
{
    name: "Towela Nyirenda-Jere",
    role: "Africa-EU Energy Partnership (AEEP)",
    image: "https://maximages.s3.us-west-1.amazonaws.com/jere.jpg",
    url: "https://www.linkedin.com/in/towelajere/"
  },
{
    name: "David Marti",
    role: "Pour Demain",
    image: "https://maximages.s3.us-west-1.amazonaws.com/marti.jpg",
    url: "https://www.linkedin.com/in/david-b-marti/"
  },
{
    name: "Edward Teather",
    role: "Amazon Web Services (AWS)",
    image: "https://maximages.s3.us-west-1.amazonaws.com/teather.jpg",
    url: "https://x.com/ed_teather"
  },
{
    name: "Alexandra Ebert",
    role: "MOSTLY AI",
    image: "https://maximages.s3.us-west-1.amazonaws.com/ebert.jpg",
    url: "https://mostly.ai/team/alexandra-ebert"
  },
{
    name: "Ansgar Koene",
    role: "Ernst & Young (EY)",
    image: "https://maximages.s3.us-west-1.amazonaws.com/koene.jpg",
    url: "https://oecd.ai/en/community/ansgar-koene"
  },
{
    name: "Keita Azuma",
    role: "UNUCRIS",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Keita-Azuma.jpg",
    url: "https://cris.unu.edu/keita-azuma"
  },
{
    name: "Kathleen Walch",
    role: "Cognilytica at Project Management Institute (PMI)",
    image: "https://maximages.s3.us-west-1.amazonaws.com/walch.jpg",
    url: "https://www.linkedin.com/in/kathleen-walch-50185112/"
  },
{
    name: "Mark Rowlands",
    role: "Amazon Web Services (AWS)",
    image: "https://maximages.s3.us-west-1.amazonaws.com/rowlands.jpg",
    url: "https://www.linkedin.com/in/mark-rowlands-649254a/"
  },
{
    name: "Paul-Joël Kamtchang",
    role: "ADISI-Cameroon",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Kamtchang.png",
    url: "https://www.linkedin.com/in/paul-joel-kamtchang-6a8940187/"
  },
{
    name: "Chris Howard",
    role: "Gartner",
    image: "https://maximages.s3.us-west-1.amazonaws.com/chris-howard.jpg",
    url: "https://www.gartner.com/en/experts/chris-howard"
  },
{
    name: "Katell Thielemann",
    role: "Gartner",
    image: "https://maximages.s3.us-west-1.amazonaws.com/katell-thielemann.jpg",
    url: "https://www.gartner.com/en/experts/katell-thielemann"
  },
{
    name: "Noah Giansiracusa",
    role: "Bentley University",
    image: "https://maximages.s3.us-west-1.amazonaws.com/noahgian.jpg",
    url: "https://www.noahgian.com/"
  },
{
    name: "Alberto Fernandez Gibaja",
    role: "International IDEA",
    image: "https://maximages.s3.us-west-1.amazonaws.com/alberto-fernandez-gibaja-staff-2.jpg",
    url: "https://www.idea.int/about-us/people/alberto-fernandez-gibaja"
  },
{
    name: "Oana Goga",
    role: "Inria",
    image: "https://maximages.s3.us-west-1.amazonaws.com/oana1.jpg",
    url: "https://www.lix.polytechnique.fr/Labo/Oana.GOGA/"
  },
{
    name: "Fenwick McKelvey",
    role: "Applied AI Institute, Concordia University",
    image: "https://maximages.s3.us-west-1.amazonaws.com/fenwick.jpg",
    url: "https://www.concordia.ca/faculty/fenwick-mckelvey.html"
  },
{
    name: "Dominic Wilhelm",
    role: "The Global Trust Project",
    image: "https://maximages.s3.us-west-1.amazonaws.com/dominicwilhelm.png",
    url: "https://www.theglobaltrustproject.com/"
  },
{
    name: "Laura Ellis",
    role: "BBC",
    image: "https://maximages.s3.us-west-1.amazonaws.com/Laura+Ellis.jpeg",
    url: "https://www.linkedin.com/in/moira-s-patterson-896a1a2/"
  },
{
    name: "Sarah Bérubé",
    role: "OECD",
    image: "https://maximages.s3.us-west-1.amazonaws.com/sarahberube.jpg",
    url: "https://www.linkedin.com/in/sarah-b%C3%A9rub%C3%A9-034190116/"
  },
{
    name: "Jamie Berryhill",
    role: "OECD",
    image: "https://maximages.s3.us-west-1.amazonaws.com/berryhill2.jpg",
    url: "https://jamieberryhill.com/"
  },
{
    name: "Denia Psarrou",
    role: "IEEE SA",
    image: "https://maximages.s3.us-west-1.amazonaws.com/denia-1.png",
    url: "https://www.linkedin.com/in/denia-p-b5bb31170/"
  },
{
    name: "Moira Patterson",
    role: "IEEE SA",
    image: "https://maximages.s3.us-west-1.amazonaws.com/moirapatterson.jpg",
    url: "https://www.linkedin.com/in/moira-s-patterson-896a1a2/"
  },
  {
    name: "Gilles Fayad",
    role: "AI Commons",
    image: "https://maximages.s3.us-west-1.amazonaws.com/GillesFayad.jpeg",
    url: "https://www.linkedin.com/in/gillesf/"
  }
  // Add more partners as needed
];

export default function PartnersScroll() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner, index) => (
          <a href={partner.url} key={"A" + index} target="new"><div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 transition-transform hover:scale-105"
          >
            <div className="aspect-w-1 aspect-h-1 w-full mb-4">
              <img
                src={partner.image}
                alt={partner.name}
                className="w-full h-48 object-cover rounded-lg"
                style={{objectFit: 'scale-down'}}
              />
            </div>
            <h3 className="text-lg font-semibold text-center">{partner.name}</h3>
            <p className="text-gray-600 text-center">{partner.role}</p>
          </div>
            </a>
        ))}
      </div>
    </div>
  );
}