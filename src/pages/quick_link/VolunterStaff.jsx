import React, { useState } from 'react';

export default function VolunteerApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    address: '',
    phone: '',
    email: '',
    preferredContact: [],
    languages: [],
    highestEducation: '',
    fieldOfStudy: '',
    islamicEducation: '',
    currentOccupation: '',
    employer: '',
    relevantExperience: '',
    volunteeredBefore: 'No',
    previousVolunteerDetails: '',
    skills: [],
    computerSkills: [],
    knowledgeZakat: '',
    knowledgeSadaqah: '',
    knowledgeQurban: '',
    knowledgeWaqf: '',
    involvedIslamicCharity: 'No',
    involvedIslamicCharityDetails: '',
    startDate: '',
    weeklyAvailability: {
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
      Saturday: '',
      Sunday: '',
    },
    hoursPerWeek: '',
    occasionalEvents: 'No',
    statementWhyVolunteer: '',
    statementSkillsBenefit: '',
    statementComplexInfo: '',
    ref1Name: '',
    ref1Relationship: '',
    ref1Phone: '',
    ref1Email: '',
    ref2Name: '',
    ref2Relationship: '',
    ref2Phone: '',
    ref2Email: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    emergencyEmail: '',
    acceptedTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayCheckbox = (category, value) => {
    setFormData((prev) => {
      const currentList = prev[category];
      if (currentList.includes(value)) {
        return { ...prev, [category]: currentList.filter((item) => item !== value) };
      } else {
        return { ...prev, [category]: [...currentList, value] };
      }
    });
  };

  const handleAvailabilityChange = (day, time) => {
    setFormData((prev) => ({
      ...prev,
      weeklyAvailability: {
        ...prev.weeklyAvailability,
        [day]: time,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      alert('Please agree to the terms and conditions before submitting.');
      return;
    }
    console.log('Form Submitted Data:', formData);
    alert('Thank you! Your volunteer application has been submitted.');
  };

  return (
    <div className="min-h-screen px-4 py-10 font-sans bg-slate-50 sm:px-6 text-slate-700">
      <div className="max-w-4xl p-6 mx-auto bg-white border shadow-sm sm:p-10 rounded-xl border-slate-200">
        
        {/* FORM TITLE */}
        <div className="mb-8 space-y-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0073B7] tracking-tight uppercase">
            CATA FOOD BANK INITIATIVE STAFF VOLUNTEER APPLICATION FORM
          </h1>

          <div>
            <a
              href="/forms/STAFF-VOLUNTEER-APPLICATION-FORM.docx"
              download="CATA_Volunteer_Application_Form.docx"
              className="inline-block px-6 py-2.5 bg-[#F99D1C] hover:bg-[#e08913] text-white font-bold text-xs sm:text-sm uppercase tracking-wide rounded shadow-sm transition-all"
            >
              OFFLINE FORMS DOWNLOAD HERE
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION: PERSONAL INFORMATION */}
          <div className="space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              PERSONAL INFORMATION
            </h2>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded bg-white focus:outline-none focus:border-[#0073B7]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Preferred Contact Method</label>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                {['Phone', 'Email', 'WhatsApp'].map((method) => (
                  <label key={method} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.preferredContact.includes(method)}
                      onChange={() => handleArrayCheckbox('preferredContact', method)}
                      className="rounded border-slate-300 text-[#0073B7]"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Languages Spoken:</label>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                {['Khmer', 'English', 'Arabic', 'Malay', 'Others'].map((lang) => (
                  <label key={lang} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.languages.includes(lang)}
                      onChange={() => handleArrayCheckbox('languages', lang)}
                      className="rounded border-slate-300 text-[#0073B7]"
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION: EDUCATIONAL BACKGROUND */}
          <div className="space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              EDUCATIONAL BACKGROUND
            </h2>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Highest Level of Education</label>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                {["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "Others"].map((level) => (
                  <label key={level} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="highestEducation"
                      value={level}
                      checked={formData.highestEducation === level}
                      onChange={handleInputChange}
                      className="text-[#0073B7]"
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Field(s) of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                placeholder="Field(s) of Study"
                value={formData.fieldOfStudy}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Islamic Education (if any):</label>
              <input
                type="text"
                name="islamicEducation"
                placeholder="Islamic Education (if any):"
                value={formData.islamicEducation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>
          </div>

          {/* SECTION: PROFESSIONAL EXPERIENCE */}
          <div className="space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              PROFESSIONAL EXPERIENCE
            </h2>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Current Occupation</label>
              <input
                type="text"
                name="currentOccupation"
                placeholder="Current Occupation"
                value={formData.currentOccupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Employer/Organization</label>
              <input
                type="text"
                name="employer"
                placeholder="Employer/Organization"
                value={formData.employer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Please list any relevant professional experience</label>
              <textarea
                name="relevantExperience"
                placeholder="Please list any relevant professional experience"
                rows={3}
                value={formData.relevantExperience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>
          </div>

          {/* SECTION: VOLUNTEER EXPERIENCE */}
          <div className="space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              VOLUNTEER EXPERIENCE
            </h2>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Have you volunteered before?</label>
              <div className="flex items-center gap-4 text-xs">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="volunteeredBefore"
                      value={opt}
                      checked={formData.volunteeredBefore === opt}
                      onChange={handleInputChange}
                      className="text-[#0073B7]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">If yes, please describe your previous volunteer experiences</label>
              <textarea
                name="previousVolunteerDetails"
                placeholder="If yes, please describe your previous volunteer experiences"
                rows={3}
                value={formData.previousVolunteerDetails}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>
          </div>

          {/* SECTION: SKILLS AND QUALIFICATIONS */}
          <div className="space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              SKILLS AND QUALIFICATIONS
            </h2>

            <div>
              <label className="block mb-2 text-xs font-semibold text-slate-500">Please check all that apply</label>
              <div className="flex flex-wrap items-center text-xs gap-x-6 gap-y-2">
                {[
                  'Public Speaking',
                  'Event Planning',
                  'Fundraising',
                  'Community Outreach',
                  'Social Media/Marketing',
                  'Program Coordination',
                  'Administrative Support',
                  'Other:',
                ].map((skill) => (
                  <label key={skill} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleArrayCheckbox('skills', skill)}
                      className="rounded border-slate-300 text-[#0073B7]"
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-xs font-semibold text-slate-500">Computer Skills:</label>
              <div className="flex flex-wrap items-center text-xs gap-x-6 gap-y-2">
                {[
                  'Microsoft Office (Word, Excel, PowerPoint)',
                  'Social Media Platforms',
                  'Database Management',
                  'Graphic Design',
                  'Other:',
                ].map((cSkill) => (
                  <label key={cSkill} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.computerSkills.includes(cSkill)}
                      onChange={() => handleArrayCheckbox('computerSkills', cSkill)}
                      className="rounded border-slate-300 text-[#0073B7]"
                    />
                    <span>{cSkill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION: KNOWLEDGE OF ISLAMIC CHARITABLE PRINCIPLES */}
          <div className="space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              KNOWLEDGE OF ISLAMIC CHARITABLE PRINCIPLES
            </h2>

            <p className="text-xs font-medium text-slate-500">Please rate your knowledge of the following Islamic concepts:</p>

            {[
              { label: 'Zakat', key: 'knowledgeZakat' },
              { label: 'Sadaqah Jariyah', key: 'knowledgeSadaqah' },
              { label: 'Qurban/Udhiyah', key: 'knowledgeQurban' },
              { label: 'Waqf', key: 'knowledgeWaqf' },
            ].map((concept) => (
              <div key={concept.key} className="space-y-1">
                <span className="block text-xs font-semibold text-slate-600">{concept.label}</span>
                <div className="flex items-center gap-4 text-xs">
                  {['Basic', 'Intermediate', 'Advanced'].map((level) => (
                    <label key={level} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name={concept.key}
                        value={level}
                        checked={formData[concept.key] === level}
                        onChange={handleInputChange}
                        className="text-[#0073B7]"
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Have you been involved with Islamic charitable activities before?</label>
              <div className="flex items-center gap-4 text-xs">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="involvedIslamicCharity"
                      value={opt}
                      checked={formData.involvedIslamicCharity === opt}
                      onChange={handleInputChange}
                      className="text-[#0073B7]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">If yes, please explain</label>
              <input
                type="text"
                name="involvedIslamicCharityDetails"
                placeholder="If yes, please explain"
                value={formData.involvedIslamicCharityDetails}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>
          </div>

          {/* SECTION: AVAILABILITY AND COMMITMENT */}
          <div className="space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              AVAILABILITY AND COMMITMENT
            </h2>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">When are you available to start?</label>
              <input
                type="text"
                name="startDate"
                placeholder="When are you available to start?"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-semibold text-slate-500">Please indicate your weekly availability</label>
              <div className="space-y-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-6">
                    <span className="w-24 font-medium text-slate-600">{day}</span>
                    <div className="flex items-center gap-4">
                      {['Morning', 'Afternoon', 'Evening'].map((time) => (
                        <label key={time} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name={`avail-${day}`}
                            value={time}
                            checked={formData.weeklyAvailability[day] === time}
                            onChange={() => handleAvailabilityChange(day, time)}
                            className="text-[#0073B7]"
                          />
                          <span>{time}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">How many hours per week can you commit to this volunteer position?</label>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                {['5-10 hours', '10-15 hours', '15-20 hours', '20+ hours'].map((hrs) => (
                  <label key={hrs} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="hoursPerWeek"
                      value={hrs}
                      checked={formData.hoursPerWeek === hrs}
                      onChange={handleInputChange}
                      className="text-[#0073B7]"
                    />
                    <span>{hrs}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Are you available for occasional evening or weekend events?</label>
              <div className="flex items-center gap-4 text-xs">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="occasionalEvents"
                      value={opt}
                      checked={formData.occasionalEvents === opt}
                      onChange={handleInputChange}
                      className="text-[#0073B7]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION: PERSONAL STATEMENT */}
          <div className="space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              PERSONAL STATEMENT
            </h2>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">
                Why are you interested in volunteering with the CATA Food Bank Initiative? (150-200 words)
              </label>
              <textarea
                name="statementWhyVolunteer"
                rows={4}
                value={formData.statementWhyVolunteer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">
                How do you believe your skills and experience would benefit our mission to address food insecurity through Islamic charitable mechanisms? (150-200 words)
              </label>
              <textarea
                name="statementSkillsBenefit"
                rows={4}
                value={formData.statementSkillsBenefit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">
                Share an example of how you have effectively communicated complex information to others in the past: (100-150 words)
              </label>
              <textarea
                name="statementComplexInfo"
                rows={4}
                value={formData.statementComplexInfo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>
          </div>

          {/* SECTION: REFERENCES */}
          <div className="space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              REFERENCES
            </h2>
            <p className="text-xs text-slate-500">Please provide two references who can speak to your character and abilities:</p>

            {/* Reference 1 */}
            <div className="pt-2 space-y-3">
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-500">Reference 1 Name</label>
                <input
                  type="text"
                  name="ref1Name"
                  placeholder="Reference 1 Name"
                  value={formData.ref1Name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-500">Relationship</label>
                <input
                  type="text"
                  name="ref1Relationship"
                  placeholder="Relationship"
                  value={formData.ref1Relationship}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-500">Phone</label>
                <input
                  type="text"
                  name="ref1Phone"
                  placeholder="Phone"
                  value={formData.ref1Phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-500">Email</label>
                <input
                  type="email"
                  name="ref1Email"
                  placeholder="Email"
                  value={formData.ref1Email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
                />
              </div>
            </div>

            {/* Reference 2 */}
            <div className="pt-4 space-y-3 border-t border-slate-100">
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-500">Reference 2 Name</label>
                <input
                  type="text"
                  name="ref2Name"
                  placeholder="Reference 2 Name"
                  value={formData.ref2Name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-500">Relationship</label>
                <input
                  type="text"
                  name="ref2Relationship"
                  placeholder="Relationship"
                  value={formData.ref2Relationship}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-500">Phone</label>
                <input
                  type="text"
                  name="ref2Phone"
                  placeholder="Phone"
                  value={formData.ref2Phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-slate-500">Email</label>
                <input
                  type="email"
                  name="ref2Email"
                  placeholder="Email"
                  value={formData.ref2Email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
                />
              </div>
            </div>
          </div>

          {/* SECTION: EMERGENCY CONTACT */}
          <div className="space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              EMERGENCY CONTACT
            </h2>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Name</label>
              <input
                type="text"
                name="emergencyName"
                placeholder="Name"
                value={formData.emergencyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Relationship</label>
              <input
                type="text"
                name="emergencyRelationship"
                placeholder="Relationship"
                value={formData.emergencyRelationship}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Phone</label>
              <input
                type="text"
                name="emergencyPhone"
                placeholder="Phone"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold text-slate-500">Email</label>
              <input
                type="email"
                name="emergencyEmail"
                placeholder="Email"
                value={formData.emergencyEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#0073B7]"
              />
            </div>
          </div>

          {/* SECTION: ACKNOWLEDGMENT AND SIGNATURE */}
          <div className="pt-2 space-y-4">
            <h2 className="pb-2 text-xl font-bold tracking-wide uppercase border-b text-slate-600">
              ACKNOWLEDGMENT AND SIGNATURE
            </h2>

            <p className="text-xs leading-relaxed text-slate-500">
              By submitting this form, I certify that the information provided in this application is true and complete to the best of my knowledge. I understand that any false statements or omissions may disqualify me from volunteer opportunities.
            </p>

            <label className="flex items-start gap-2.5 text-xs font-medium cursor-pointer text-slate-600">
              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleInputChange}
                className="mt-0.5 rounded border-slate-300 text-[#0073B7] focus:ring-[#0073B7]"
              />
              <span>I agree to the terms and confirm all information supplied above is accurate.</span>
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#0073B7] hover:bg-[#005a90] text-white font-bold text-sm uppercase tracking-wider rounded-lg shadow-md transition-all duration-200"
            >
              Submit Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}