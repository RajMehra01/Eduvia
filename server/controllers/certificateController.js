let mockCertificates = [
  {
    id: 'CERT-SKILL-8942',
    studentName: 'Yogesh Singh Bhadoriya',
    courseTitle: 'Full-Stack Modern Web Development Masterclass',
    date: 'July 26, 2026',
    instructor: 'Yogesh Singh'
  }
];

export const getCertificates = async (req, res) => {
  res.json({ success: true, count: mockCertificates.length, data: mockCertificates });
};

export const issueCertificate = async (req, res) => {
  const { studentName, courseTitle, instructor } = req.body;
  const cert = {
    id: `CERT-${Math.floor(1000 + Math.random() * 9000)}`,
    studentName: studentName || req.user?.name || 'Yogesh Singh Bhadoriya',
    courseTitle: courseTitle || 'Full-Stack Development Masterclass',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    instructor: instructor || 'Yogesh Singh'
  };

  mockCertificates.push(cert);
  res.status(201).json({ success: true, message: 'Certificate issued', data: cert });
};
