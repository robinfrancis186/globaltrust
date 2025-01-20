import React from 'react';

interface Partner {
  name: string;
  role: string;
  image: string;
  logo: string;
}

const partners: Partner[] = [
  {
    name: "Amir Banifatemi",
    role: "AI Commons | Cognizant",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/banifatemi.png",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "Karine Perset",
    role: "OECD",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/karineperset3.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "Konstantinos Karachalios",
    role: "IEEE SA",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/Konstantinos-Picture.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "Sebastian Hallensleben",
    role: "CEN-CENELEC JTC 21",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/sebastian.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "Mariagrazia Squicciarini",
    role: "UNESCO",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/mariagrazia.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "David Satola",
    role: "World Bank",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/davidsatola.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "Tanya Perelmuter",
    role: "Fondation Abeona",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/tanya.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "Elham Tabassi",
    role: "NIST",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/Elham-Tabassi.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "Benoît Bergeret",
    role: "Metalab, Essec Business School",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/benoit-bergeret-1.jpeg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "Nikita Lukianets",
    role: "OpenEthics",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/nikita2.png",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "Alice Pavaloiu",
    role: "OpenEthics",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/Alice-Pavaloiu.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
   {
    name: "Chris Beall",
    role: "Project CONNIE",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/beall.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  {
    name: "Amanda Leal",
    role: "The Future Society",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/amandaleal.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Lihui Xu",
    role: "UNESCO",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/lxu.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Manpreet Dash",
    role: "AIShield – Powered by Bosch",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/Manpreet-Dash.jpeg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Ori Freiman",
    role: "McMaster University’s Digital Society Lab",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/orifreiman.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Yoav Evenstein",
    role: "AXITRACK",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/yoav.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Towela Nyirenda-Jere",
    role: "Africa-EU Energy Partnership (AEEP)",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/jere.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "David Marti",
    role: "Pour Demain",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/marti.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Edward Teather",
    role: "Amazon Web Services (AWS)",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/teather.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Alexandra Ebert",
    role: "MOSTLY AI",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/ebert.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Ansgar Koene",
    role: "Ernst & Young (EY)",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/koene.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Keita Azuma",
    role: "UNUCRIS",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/Keita-Azuma.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Kathleen Walch",
    role: "Cognilytica at Project Management Institute (PMI)",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/walch.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Mark Rowlands",
    role: "Amazon Web Services (AWS)",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/rowlands.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Paul-Joël Kamtchang",
    role: "ADISI-Cameroon",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/Kamtchang.png",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Chris Howard",
    role: "Gartner",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/chris-howard.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Katell Thielemann",
    role: "Gartner",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/katell-thielemann.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Noah Giansiracusa",
    role: "Bentley University",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/noahgian.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Alberto Fernandez Gibaja",
    role: "International IDEA",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/alberto-fernandez-gibaja-staff-2.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Oana Goga",
    role: "Inria",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/oana1.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Fenwick McKelvey",
    role: "Applied AI Institute, Concordia University",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/fenwick.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Dominic Wilhelm",
    role: "The Global Trust Project",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/dominicwilhelm.png",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Laura Ellis",
    role: "BBC",
    image: "https://globalchallenge.ai/wp-content/uploads/2025/01/LauraWall.jpeg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Sarah Bérubé",
    role: "OECD",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/sarahberube.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Jamie Berryhill",
    role: "OECD",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/berryhill2.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Denia Psarrou",
    role: "IEEE SA",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/denia-1.png",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
{
    name: "Moira Patterson",
    role: "IEEE SA",
    image: "https://globalchallenge.ai/wp-content/uploads/2024/12/moirapatterson.jpg",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41"
  },
  // Add more partners as needed
];

export default function PartnersScroll() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner, index) => (
          <div
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
        ))}
      </div>
    </div>
  );
}