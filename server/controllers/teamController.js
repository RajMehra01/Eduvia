import { fallbackStore } from '../config/db.js';

// GET team members with live capacity & workload allocation metrics
export const getTeamMembers = async (req, res) => {
  try {
    const enrichedTeam = fallbackStore.team.map(member => {
      const assignedTasks = fallbackStore.tasks.filter(t => t.assignee === member.name);
      const totalPoints = assignedTasks.reduce((acc, t) => acc + (t.points || 0), 0);
      const completedPoints = assignedTasks
        .filter(t => t.status === 'deployed')
        .reduce((acc, t) => acc + (t.points || 0), 0);
      const utilizationPercent = Math.min(Math.round((totalPoints / member.capacity) * 100), 100);

      // Semantic status determination
      let statusState = 'Healthy'; // < 75%
      if (utilizationPercent >= 90) {
        statusState = 'Overloaded';
      } else if (utilizationPercent >= 75) {
        statusState = 'At Capacity';
      }

      return {
        ...member,
        assignedTasksCount: assignedTasks.length,
        assignedPoints: totalPoints,
        completedPoints,
        utilizationPercent,
        workloadStatus: statusState,
        tasks: assignedTasks
      };
    });

    res.json({
      success: true,
      count: enrichedTeam.length,
      data: enrichedTeam
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
