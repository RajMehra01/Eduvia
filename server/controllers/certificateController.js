let mockCertificates = [
  {
    id: 'EDV-CRED-8942-WD',
    studentName: 'Alex Morgan',
    courseTitle: 'Full-Stack Modern Web Development Masterclass',
    date: 'July 26, 2026',
    instructor: 'Alex Morgan'
  }
];

export const getCertificates = async (req, res) => {
  res.json({ success: true, count: mockCertificates.length, data: mockCertificates });
};

export const issueCertificate = async (req, res) => {
  const { studentName, courseTitle, instructor } = req.body;
  const cert = {
    id: `EDV-CRED-${Math.floor(1000 + Math.random() * 9000)}`,
    studentName: studentName || req.user?.name || 'Eduvia Learner',
    courseTitle: courseTitle || 'Technical Masterclass',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    instructor: instructor || 'Eduvia Lead Instructor'
  };

  mockCertificates.push(cert);
  res.status(201).json({ success: true, message: 'Certificate issued', data: cert });
};
