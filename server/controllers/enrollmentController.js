let mockEnrollments = [
  { id: 'en-1', userId: 'user-101', courseId: 'course-1', enrolledAt: new Date().toISOString() }
];

export const enrollInCourse = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user?.id || 'usr-101';

  const enrollment = { id: `en-${Date.now()}`, userId, courseId, enrolledAt: new Date().toISOString() };
  mockEnrollments.push(enrollment);

  res.status(201).json({ success: true, message: 'Enrolled in course', data: enrollment });
};

export const getUserEnrollments = async (req, res) => {
  const userId = req.user?.id || 'usr-101';
  const enrollments = mockEnrollments.filter(e => e.userId === userId);
  res.json({ success: true, count: enrollments.length, data: enrollments });
};
