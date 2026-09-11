import { SAMPLE_COURSES } from '../data/coursesData.js';

const DEMO_USER_EMAILS = ['alex.morgan@eduvia.org', 'demo.student@eduvia.org', 'student@eduvia.com'];
const DEMO_USER_IDS = ['usr-101', 'demo-student'];

export const isDemoUser = (user) => {
  if (!user) return false;
  if (user.isDemo) return true;
  if (DEMO_USER_IDS.includes(user.id)) return true;
  if (user.email && DEMO_USER_EMAILS.includes(user.email.toLowerCase())) return true;
  return false;
};

/**
 * Get enrolled courses & stats for a specific user
 */
export const getUserLearningState = (user) => {
  if (!user) {
    return {
      enrolledCourses: [],
      streak: 0,
      studyHours: 0,
      completedLessonsCount: 0,
      certificates: []
    };
  }

  const storageKey = `eduvia_user_data_${user.id || user.email}`;
  const saved = localStorage.getItem(storageKey);

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing user learning state', e);
    }
  }

  // If this is a seeded demo user and no saved data exists yet, return pre-seeded state
  if (isDemoUser(user)) {
    const course1 = SAMPLE_COURSES.find(c => c.id === 'course-1') || SAMPLE_COURSES[0];
    const course2 = SAMPLE_COURSES.find(c => c.id === 'course-2') || SAMPLE_COURSES[1];

    const demoState = {
      enrolledCourses: [
        {
          ...course1,
          progress: 68,
          lastLesson: 'Optimizing Render Cycles & Performance Profiling',
          lastAccessed: 'Today',
          completedLessons: ['l1', 'l2']
        },
        {
          ...course2,
          progress: 35,
          lastLesson: 'Pandas DataFrames, Missing Values & GroupBy Aggregations',
          lastAccessed: 'Yesterday',
          completedLessons: ['l601']
        }
      ],
      streak: 12,
      studyHours: 24.5,
      completedLessonsCount: 18,
      certificates: [
        {
          id: 'CERT-EDU-2026-9842',
          courseId: 'course-1',
          courseTitle: course1.title,
          instructor: course1.instructor,
          issueDate: 'October 14, 2026',
          recipientName: user.name || 'Alex Morgan',
          credentialUrl: 'https://eduvia.org/verify/CERT-EDU-2026-9842'
        }
      ]
    };

    localStorage.setItem(storageKey, JSON.stringify(demoState));
    return demoState;
  }

  // Truly new user: CLEAN EMPTY STATE
  const freshState = {
    enrolledCourses: [],
    streak: 0,
    studyHours: 0.0,
    completedLessonsCount: 0,
    certificates: []
  };

  localStorage.setItem(storageKey, JSON.stringify(freshState));
  return freshState;
};

/**
 * Enroll a user into a course
 */
export const enrollUserInCourse = (user, courseId) => {
  if (!user) return false;

  const storageKey = `eduvia_user_data_${user.id || user.email}`;
  const currentState = getUserLearningState(user);

  // Check if already enrolled
  const exists = currentState.enrolledCourses.some(c => c.id === courseId);
  if (exists) return true;

  const targetCourse = SAMPLE_COURSES.find(c => c.id === courseId);
  if (!targetCourse) return false;

  const firstLessonTitle = targetCourse.modules?.[0]?.lessons?.[0]?.title || 'Orientation & Setup';

  const newEnrolled = {
    ...targetCourse,
    progress: 0,
    lastLesson: firstLessonTitle,
    lastAccessed: 'Just now',
    completedLessons: []
  };

  const updatedState = {
    ...currentState,
    enrolledCourses: [newEnrolled, ...currentState.enrolledCourses],
    streak: currentState.streak === 0 ? 1 : currentState.streak
  };

  localStorage.setItem(storageKey, JSON.stringify(updatedState));
  return true;
};

/**
 * Check if a user is enrolled in a specific course
 */
export const isUserEnrolledInCourse = (user, courseId) => {
  if (!user) return false;
  const state = getUserLearningState(user);
  return state.enrolledCourses.some(c => c.id === courseId);
};

/**
 * Update lesson completion progress
 */
export const updateCourseLessonProgress = (user, courseId, lessonId, isCompleted = true) => {
  if (!user) return;

  const storageKey = `eduvia_user_data_${user.id || user.email}`;
  const state = getUserLearningState(user);

  let courseIndex = state.enrolledCourses.findIndex(c => c.id === courseId);

  // If not enrolled yet, auto-enroll
  if (courseIndex === -1) {
    enrollUserInCourse(user, courseId);
    courseIndex = 0;
  }

  const course = state.enrolledCourses[courseIndex] || SAMPLE_COURSES.find(c => c.id === courseId);
  if (!course) return;

  const completedSet = new Set(course.completedLessons || []);
  if (isCompleted) {
    completedSet.add(lessonId);
  } else {
    completedSet.delete(lessonId);
  }

  const totalLessons = course.totalLessons || 10;
  const completedArray = Array.from(completedSet);
  const newProgress = Math.min(100, Math.round((completedArray.length / totalLessons) * 100));

  const updatedCourse = {
    ...course,
    progress: newProgress,
    completedLessons: completedArray,
    lastAccessed: 'Just now'
  };

  const updatedCourses = [...state.enrolledCourses];
  updatedCourses[courseIndex] = updatedCourse;

  // If newly reached 100%, generate certificate if not existing
  let updatedCerts = [...state.certificates];
  if (newProgress === 100 && !updatedCerts.some(cert => cert.courseId === courseId)) {
    updatedCerts.push({
      id: `CERT-EDU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      courseId,
      courseTitle: course.title,
      instructor: course.instructor,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      recipientName: user.name || 'Eduvia Learner',
      credentialUrl: `https://eduvia.org/verify/CERT-EDU-2026-${courseId}`
    });
  }

  const updatedState = {
    ...state,
    enrolledCourses: updatedCourses,
    completedLessonsCount: state.completedLessonsCount + (isCompleted ? 1 : -1),
    studyHours: +(state.studyHours + 0.5).toFixed(1),
    certificates: updatedCerts
  };

  localStorage.setItem(storageKey, JSON.stringify(updatedState));
  return updatedState;
};
