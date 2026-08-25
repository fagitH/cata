-- Sample Data for CATA Foundation Database

-- Banners
INSERT INTO banners (image, title, description, link) VALUES
('https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=1200', 'Help Us Build a Better Future', 'Join our community in making a positive impact', '/donate'),
('https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=1200', 'Education for All', 'Empowering youth through quality education', '/scholarship'),
('https://images.unsplash.com/photo-1516534775068-bb57341ef743?w=1200', 'Water Wells for Villages', 'Bringing clean water to underserved communities', '/project/water-well');

-- News Articles
INSERT INTO news (slug, title, date, author, category, image, cover_image, excerpt, content, images) VALUES
(
    'cata-youth-leadership-workshop-2026',
    'CATA Youth Leadership Workshop 2026',
    '2026-08-14',
    'John Doe',
    'Education',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
    'Join us for an intensive leadership development program designed for young leaders in Cambodia.',
    '["This workshop brings together young leaders from across Cambodia for intensive training in leadership, public speaking, and community development.", "Participants will engage with experienced mentors and industry experts who will share insights on youth empowerment and social impact.", "The program culminates with a final project where participants present their community development ideas to potential funders and partners."]',
    '["https://images.unsplash.com/photo-1552664730-d307ca884978?w=500", "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500", "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500"]'
),
(
    'water-well-project-success',
    'Water Well Project: Bringing Clean Water to 500 Families',
    '2026-08-10',
    'Jane Smith',
    'Community',
    'https://images.unsplash.com/photo-1559000532-13d2d16f3d1e?w=500',
    'https://images.unsplash.com/photo-1559000532-13d2d16f3d1e?w=1200',
    'Our water well project in rural Cambodia has successfully provided clean drinking water to over 500 families.',
    '["Through the generous support of our donors, we have successfully drilled and installed water wells in three remote villages.", "Each well serves approximately 150-200 families and includes a hand pump system that is easy to maintain and repair.", "The local communities have been trained on maintenance and water hygiene practices to ensure long-term sustainability."]',
    '["https://images.unsplash.com/photo-1559000532-13d2d16f3d1e?w=500"]'
);

-- Donation Projects
INSERT INTO donation_projects (title, category, description, image, goal_amount, collected_amount, status) VALUES
(
    'Water Well Project',
    'Infrastructure',
    'Provide clean drinking water to rural villages through the installation of sustainable water wells.',
    'https://images.unsplash.com/photo-1559000532-13d2d16f3d1e?w=500',
    5000.00,
    3200.00,
    'active'
),
(
    'Zakat Al-Mal Fund',
    'Zakat',
    'Support underprivileged families through direct financial assistance during religious obligations.',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500',
    10000.00,
    7500.00,
    'active'
),
(
    'Education & Student Support',
    'Education',
    'Provide scholarships and educational resources to deserving students in Cambodia.',
    'https://images.unsplash.com/photo-1427504494785-cddf194bbb20?w=500',
    8000.00,
    5400.00,
    'active'
);

-- Donations
INSERT INTO donations (transaction_id, donor_name, donor_email, donor_phone, donor_address, amount, payment_method, campaign_title, status) VALUES
(
    'TXN001A2B',
    'John Doe',
    'john@example.com',
    '+855-12-345-678',
    '{"street": "123 Main St", "city": "Phnom Penh", "country": "Cambodia"}',
    100.00,
    'bank_transfer',
    'Education Fund',
    'completed'
),
(
    'TXN002C3D',
    'Jane Smith',
    'jane@example.com',
    '+855-98-765-432',
    '{"street": "456 Oak Ave", "city": "Siem Reap", "country": "Cambodia"}',
    250.00,
    'acleda_khqr',
    'Water Well Project',
    'completed'
);

-- Scholarship Programs
INSERT INTO scholarships (title, description, amount, deadline, requirements, contact_email, image, status) VALUES
(
    'CATA Foundation Scholarship 2026',
    'Comprehensive scholarship program providing financial support to high-achieving students from low-income backgrounds.',
    5000.00,
    '2026-12-31',
    '["Maintain minimum GPA of 3.5", "Active participation in community service", "Financial need documentation", "Recommendation letters from teachers"]',
    'scholarships@cata.org',
    'https://images.unsplash.com/photo-1427504494785-cddf194bbb20?w=500',
    'active'
),
(
    'CATA Youth Empowerment Program',
    'Targeted scholarship for youth engaging in leadership and entrepreneurship activities.',
    3000.00,
    '2026-10-31',
    '["Demonstrated leadership skills", "Entrepreneurial project proposal", "Community impact focus", "Essay on youth development"]',
    'youth@cata.org',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
    'active'
);

-- Annual Reports
INSERT INTO annual_reports (slug, title, year, description, content, pdf_url, image) VALUES
(
    'my-community-fund-2025',
    'Report of My Community Fund Program',
    2025,
    'Annual report detailing the impact and outcomes of the CATA Community Fund Program for 2025.',
    '["Executive Summary: The Community Fund Program reached over 1,000 families this year, with focus on sustainable development.", "Program Highlights: Water well installations, education initiatives, and emergency relief programs.", "Financial Overview: Total funds distributed: $45,000. Administrative costs: 8%. Program effectiveness: 92%.", "Beneficiary Stories: Personal accounts from community members whose lives were transformed by the program.", "2026 Targets: Expand to 5 new villages and increase educational scholarships by 50%."]',
    'https://example.com/reports/community-fund-2025.pdf',
    'https://images.unsplash.com/photo-1559000532-13d2d16f3d1e?w=500'
),
(
    'riba-clearance-2025',
    'Report of RIBA Clearance Program',
    2025,
    'Detailed report on Islamic financial compliance and Riba (interest) clearance initiatives.',
    '["Program Overview: Ensuring all CATA Foundation funds comply with Islamic principles.", "Clearance Process: Annual audits and Shariah compliance reviews.", "Beneficiaries: 500+ families received interest-free financial assistance.", "Success Rate: 100% of transactions deemed Shariah-compliant."]',
    'https://example.com/reports/riba-clearance-2025.pdf',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500'
),
(
    'sanitation-water-2025',
    'Report of Sanitation & Water Wells Project',
    2025,
    'Comprehensive report on water infrastructure and sanitation initiatives in rural Cambodia.',
    '["Wells Installed: 15 new water wells completed in remote villages.", "Sanitation Training: 50+ community health workers trained.", "Impact: 2,000+ people now have access to clean water.", "Sustainability: Community maintenance programs established."]',
    'https://example.com/reports/sanitation-water-2025.pdf',
    'https://images.unsplash.com/photo-1559000532-13d2d16f3d1e?w=500'
),
(
    'human-resource-development-2025',
    'Report of Human Resource Development',
    2025,
    'Annual review of CATA Foundation staff development and capacity building programs.',
    '["Staff Strength: 45 full-time employees across operations.", "Training Programs: 8 professional development courses conducted.", "Community Volunteers: 200+ volunteers engaged in programs.", "Retention Rate: 95% staff retention demonstrating strong organizational culture."]',
    'https://example.com/reports/human-resource-2025.pdf',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500'
),
(
    'partnership-2025',
    'Report of Partnership',
    2025,
    'Overview of CATA Foundation''s strategic partnerships and collaborative initiatives.',
    '["Local Partners: 20+ NGOs and community organizations", "International Partnerships: Collaborations with 5 international development organizations", "Government Coordination: Working with 3 provincial government offices", "Private Sector: Corporate partnerships with 8 local businesses", "Impact Multiplier: Partnerships increased program reach by 300%."]',
    'https://example.com/reports/partnership-2025.pdf',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500'
),
(
    'general-charity-2025',
    'Report of General Charity',
    2025,
    'Summary of CATA Foundation''s general charitable activities and direct relief programs.',
    '["Relief Programs: Emergency assistance provided to 300+ families.", "Disaster Response: Rapid deployment to 5 flood-affected areas.", "Orphan Care: 50 orphans supported with food, education, and healthcare.", "Elderly Support: 30 elderly persons receiving monthly assistance.", "Total Beneficiaries: 1,500+ direct beneficiaries of general charity programs."]',
    'https://example.com/reports/general-charity-2025.pdf',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500'
);
