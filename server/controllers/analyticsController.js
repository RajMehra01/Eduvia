import { fallbackStore } from '../config/db.js';

// GET sprint analytics and velocity telemetry
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
        activeSprint: 'Sprint #14 — Distributed Consensus & Delivery Roadmap'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
