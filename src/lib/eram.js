import * as LucideIcons from 'lucide-react';
import axesData from '../data/axes.json';

/**
 * Utility to get axes data with actual Lucide Icon components
 */
export const getEramAxes = () => {
  return axesData.map(axis => ({
    ...axis,
    iconComponent: LucideIcons[axis.icon] || LucideIcons.HelpCircle
  }));
};

/**
 * Mapping of data categories to ERAM Axis IDs
 */
export const CATEGORY_TO_AXIS = {
  'Bosques': 'bosques',
  'Incendios': 'bosques',
  'Biodiversidad': 'mares',
  'Mares': 'mares',
  'Agua': 'agua',
  'Clima': 'clima',
  'Calidad Ambiental': 'calidad'
};

/**
 * Helper to get color for a specific axis or category
 */
export const getAxisColor = (axisOrCategory) => {
  const axisId = CATEGORY_TO_AXIS[axisOrCategory] || axisOrCategory;
  const axis = axesData.find(a => 
    a.id.toLowerCase() === axisId.toLowerCase() ||
    a.text.toLowerCase() === axisOrCategory.toLowerCase()
  );
  return axis ? axis.color : '#64748b'; // Default slate
};
