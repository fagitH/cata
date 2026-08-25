// src/data/donationProjects.js
import waterWell from '../assets/image/donation/water.webp';   
import zakat from '../assets/image/donation/zakat.webp';   
import educate from '../assets/image/donation/educat.jpg';   
import ramadhan from '../assets/image/donation/ramadhan.jpg';   
import orphan from '../assets/image/donation/orphan.jpg';   
import qurban from '../assets/image/donation/qurban.jpg';   
import umrah from '../assets/image/donation/umrah.webp';   
import communityFund from '../assets/image/donation/community_fund.jpg';   
import mosque from '../assets/image/donation/donate5.jpg';   
import emergency from '../assets/image/donation/emergency.webp';   
import waqf from '../assets/image/donation/waqf.webp';   

export const donationProjects = [
  {
    id: 'clean-water',
    title: 'Water Well / Clean Water Project',
    category: 'Community support',
    image: waterWell,
    href: '/donate-water-well',
  },
  {
    id: 'zakat',
    title: 'Zakat Al-Mal Fund',
    category: 'Donation',
    image: zakat,
    href: '/donate-zakat',
  },
  {
    id: 'education-support',
    title: 'Education & Student Support',
    category: 'Education',
    image: educate,
    href: '/donate-education',
  },
  {
    id: 'ramadan-food',
    title: 'Food Bank / Ramadan Food Package',
    category: 'Relief',
    image: ramadhan,
    href: '/donate-ramadhan',
  },
  {
    id: 'orphan-support',
    title: 'Orphan Care & Support',
    category: 'Sponsorship',
    image: orphan,
    href: '/donate-education',
  },
  {
    id: 'qurban-cambodia',
    title: 'Qurban in Cambodia',
    category: 'Qurban',
    image: qurban,
    href: '/donate-qurban',
  },
  {
    id: 'umrah-hajj',
    title: 'Umrah / Hajj Donation',
    category: 'Pilgrimage',
    image: umrah,
    href: '/donate-umrah-hajj',
  },
  {
    id: 'community-funds',
    title: 'My Community Support Funds',
    category: 'Community support',
    image:communityFund,
    href: '/my-comm-fund',
  },
  {
    id: 'mosque-development',
    title: 'Mosque & Madrasah Development',
    category: 'Infrastructure',
    image: mosque,
    href: '/donate-mosque',
  },
  {
    id: 'emergency-relief',
    title: 'Emergency Medical & Disaster Relief',
    category: 'Emergency',
    image: emergency,
    href: '/donate-emergency',
  },
    {
    id: 'waqf-contribution',
    title: 'Waqf Contribution',
    category: 'Donation',
    image:waqf,
    href: '/donate-waqf',
  },
];

/**
 * Dynamically retrieves related projects:
 * 1. Filters out the active project ID (leaving 9 items).
 * 2. Applies a Fisher-Yates shuffle algorithm to randomize order.
 * 3. Returns the specified limit (default: 4).
 *
 * @param {string} currentId - Active project ID to exclude
 * @param {number} limit - Number of related items to return
 */
export function getRelatedProjects(currentId, limit = 4) {
  // Exclude current project
  const availableProjects = donationProjects.filter((item) => item.id !== currentId);

  // Copy array and apply Fisher-Yates shuffle
  const shuffled = [...availableProjects];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, limit);
}

/**
 * Finds a specific project by ID.
 * @param {string} id
 */
export function getProjectById(id) {
  return donationProjects.find((item) => item.id === id);
}