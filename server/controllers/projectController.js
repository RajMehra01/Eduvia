import { fallbackStore, pool, isConnected } from '../config/db.js';

// GET all projects with summary metrics
export const getProjects = async (req, res) => {
  try {
    if (isConnected && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        if (rows && rows.length > 0) {
          return res.json({ success: true, count: rows.length, data: rows });
        }
      } catch (dbErr) {
        console.warn('Falling back to store for getProjects:', dbErr.message);
      }
    }

    // Return in-memory store
    res.json({
      success: true,
      count: fallbackStore.projects.length,
      data: fallbackStore.projects
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET project info / active sprint
export const getProjectInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const project = fallbackStore.projects.find(p => p.id === id) || fallbackStore.projects[0];
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST create new project
export const createProject = async (req, res) => {
  try {
    const { name, keyIdentifier, description, ownerName, targetDate } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, error: 'Project name is required' });
    }

    const newProject = {
      id: `proj-${Date.now()}`,
      name,
      keyIdentifier: keyIdentifier || name.substring(0, 3).toUpperCase(),
      description: description || '',
      status: 'active',
      health: 'on_track',
      ownerName: ownerName || 'Elena Rostova',
      startDate: new Date().toISOString().split('T')[0],
      targetDate: targetDate || '2026-12-31',
      activeSprint: 'Sprint #01 — Setup & Initialization'
    };

    fallbackStore.projects.unshift(newProject);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const idx = fallbackStore.projects.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    fallbackStore.projects[idx] = {
      ...fallbackStore.projects[idx],
      ...req.body
    };

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: fallbackStore.projects[idx]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    fallbackStore.projects = fallbackStore.projects.filter(p => p.id !== id);
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
