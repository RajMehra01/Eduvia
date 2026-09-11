import { fallbackStore, pool, isConnected } from '../config/db.js';

// GET all tasks (with optional query filter)
export const getTasks = async (req, res) => {
  try {
    const { projectId, status, priority } = req.query;
    let tasks = [...fallbackStore.tasks];

    if (projectId) {
      tasks = tasks.filter(t => t.projectId === projectId);
    }
    if (status) {
      tasks = tasks.filter(t => t.status === status);
    }
    if (priority) {
      tasks = tasks.filter(t => t.priority === priority);
    }

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST create task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, points, assignee, dueDate, category, projectId } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'Task title is required' });
    }

    const assignedMember = fallbackStore.team.find(m => m.name === assignee) || fallbackStore.team[0];

    const newTask = {
      id: `task-${Date.now()}`,
      projectId: projectId || 'proj-101',
      sprintId: 'sp-14',
      title: title.trim(),
      description: description || '',
      status: status || 'backlog',
      priority: priority || 'High',
      category: category || 'Engineering',
      points: Number(points) || 3,
      assignee: assignee || assignedMember.name,
      assigneeAvatar: assignedMember.avatar,
      dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      subtasks: [],
      comments: []
    };

    fallbackStore.tasks.unshift(newTask);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const idx = fallbackStore.tasks.findIndex(t => t.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // Update fields
    const updated = {
      ...fallbackStore.tasks[idx],
      ...req.body
    };

    // If assignee was changed, update avatar
    if (req.body.assignee && req.body.assignee !== fallbackStore.tasks[idx].assignee) {
      const member = fallbackStore.team.find(m => m.name === req.body.assignee);
      if (member) {
        updated.assigneeAvatar = member.avatar;
      }
    }

    fallbackStore.tasks[idx] = updated;

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    fallbackStore.tasks = fallbackStore.tasks.filter(t => t.id !== id);
    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST add subtask
export const addSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'Subtask title is required' });
    }

    const task = fallbackStore.tasks.find(t => t.id === id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    const newSubtask = {
      id: `st-${Date.now()}`,
      title: title.trim(),
      completed: false
    };

    task.subtasks.push(newSubtask);

    res.status(201).json({
      success: true,
      message: 'Subtask added successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT toggle subtask
export const toggleSubtask = async (req, res) => {
  try {
    const { id, subtaskId } = req.params;
    const task = fallbackStore.tasks.find(t => t.id === id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    const st = task.subtasks.find(s => s.id === subtaskId);
    if (!st) {
      return res.status(404).json({ success: false, error: 'Subtask not found' });
    }

    st.completed = !st.completed;

    res.json({
      success: true,
      message: 'Subtask updated',
      data: task
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST add activity comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: 'Comment text is required' });
    }

    const task = fallbackStore.tasks.find(t => t.id === id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    const newComment = {
      author: author || 'Elena Rostova',
      text: text.trim(),
      time: 'Just now'
    };

    task.comments.push(newComment);

    res.status(201).json({
      success: true,
      message: 'Comment posted successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
