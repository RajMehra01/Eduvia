import { fallbackStore } from '../config/db.js';

// GET sprint analytics and velocity metrics
export const getSprintAnalytics = async (req, res) => {
  try {
    const tasks = fallbackStore.tasks;
    const totalPoints = tasks.reduce((acc, t) => acc + (t.points || 0), 0);
    const deployedPoints = tasks
      .filter(t => t.status === 'deployed')
      .reduce((acc, t) => acc + (t.points || 0), 0);
    const inProgressPoints = tasks
      .filter(t => t.status === 'in_progress')
      .reduce((acc, t) => acc + (t.points || 0), 0);
    const reviewPoints = tasks
      .filter(t => t.status === 'review')
      .reduce((acc, t) => acc + (t.points || 0), 0);
    const qaPoints = tasks
      .filter(t => t.status === 'qa')
      .reduce((acc, t) => acc + (t.points || 0), 0);
    const backlogPoints = tasks
      .filter(t => t.status === 'backlog')
      .reduce((acc, t) => acc + (t.points || 0), 0);

    const velocityRate = Math.round((deployedPoints / Math.max(totalPoints, 1)) * 100);

    // Distribution by status
    const statusDistribution = [
      { status: 'Backlog', count: tasks.filter(t => t.status === 'backlog').length, points: backlogPoints },
      { status: 'In Progress', count: tasks.filter(t => t.status === 'in_progress').length, points: inProgressPoints },
      { status: 'Code Review', count: tasks.filter(t => t.status === 'review').length, points: reviewPoints },
      { status: 'QA Testing', count: tasks.filter(t => t.status === 'qa').length, points: qaPoints },
      { status: 'Deployed', count: tasks.filter(t => t.status === 'deployed').length, points: deployedPoints }
    ];

    // Priority breakdown
    const priorityDistribution = [
      { priority: 'Blocker', count: tasks.filter(t => t.priority === 'Blocker').length },
      { priority: 'High', count: tasks.filter(t => t.priority === 'High').length },
      { priority: 'Normal', count: tasks.filter(t => t.priority === 'Normal').length },
      { priority: 'Low', count: tasks.filter(t => t.priority === 'Low').length }
    ];

    // Dynamic sprint risk evaluation (Section 9.A)
    const activeBlockers = tasks.filter(t => t.priority === 'Blocker' && t.status !== 'deployed').length;
    const highPriorityCount = tasks.filter(t => t.priority === 'High' && t.status !== 'deployed').length;

    let riskLevel = 'Low';
    let riskReason = 'All blockers resolved and deliverables tracking within target sprint velocity.';

    if (activeBlockers > 0) {
      riskLevel = 'Elevated';
      riskReason = `${activeBlockers} active blocker in sprint backlog requires resolution before release.`;
    } else if (highPriorityCount >= tasks.length * 0.5) {
      riskLevel = 'Moderate';
      riskReason = `${highPriorityCount} high-priority tasks in flight require active developer focus.`;
    }

    res.json({
      success: true,
      data: {
        totalPoints,
        deployedPoints,
        inProgressPoints,
        reviewPoints,
        qaPoints,
        backlogPoints,
        velocityRate,
        taskCount: tasks.length,
        statusDistribution,
        priorityDistribution,
        riskLevel,
        riskReason,
        activeSprint: 'Sprint #14 — Core Pipeline & Delivery Roadmap'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
