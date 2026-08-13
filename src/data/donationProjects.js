// src/data/donationProjects.js

export const donationProjects = [
  {
    id: 'clean-water',
    title: 'Water Well / Clean Water Project',
    category: 'Community support',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop',
    href: '/donate-water-well',
  },
  {
    id: 'zakat',
    title: 'Zakat Al-Mal Fund',
    category: 'Donation',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=800&auto=format&fit=crop',
    href: '/donate-zakat',
  },
  {
    id: 'education-support',
    title: 'Education & Student Support',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
    href: '/donate-education',
  },
  {
    id: 'ramadan-food',
    title: 'Food Bank / Ramadan Food Package',
    category: 'Relief',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=500&auto=format&fit=crop',
    href: '/donate-ramadhan',
  },
  {
    id: 'orphan-support',
    title: 'Orphan Care & Support',
    category: 'Sponsorship',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop',
    href: '/donate-education',
  },
  {
    id: 'qurban-cambodia',
    title: 'Qurban in Cambodia',
    category: 'Qurban',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?q=80&w=500&auto=format&fit=crop',
    href: '/donate-qurban',
  },
  {
    id: 'umrah-hajj',
    title: 'Umrah / Hajj Donation',
    category: 'Pilgrimage',
    image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=500&auto=format&fit=crop',
    href: '/donate-umrah-hajj',
  },
  {
    id: 'community-funds',
    title: 'My Community Support Funds',
    category: 'Community support',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=500&auto=format&fit=crop',
    href: '/my-comm-fund',
  },
  {
    id: 'mosque-development',
    title: 'Mosque & Madrasah Development',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=500&auto=format&fit=crop',
    href: '/donate-mosque',
  },
  {
    id: 'emergency-relief',
    title: 'Emergency Medical & Disaster Relief',
    category: 'Emergency',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=500&auto=format&fit=crop',
    href: '/donate-emergency',
  },
    {
    id: 'waqf-contribution',
    title: 'Waqf Contribution',
    category: 'Donation',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop',
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