/**
 * @typedef GradePreset
 * @prop {string} culture The string to identity the culture of grade presets. 
 * @prop {import('$lib/grades/gradeFactory').GradeDefinition[]} grades The low score of a grade
*/

import { JSONToGradeCollection } from './gradeConverter';
import gradeConfig from './gradePresets.json';

/**
 * Returns a list of predefined grade sets based on the two-letter country code (ISO 3166-1 alpha-2)
 * @param {string} culture
 * @returns {import('$lib/grades/gradeFactory').GradeDefinition[]}
 */
 export function GetGradePreset(culture) {
    const presets = JSONToGradeCollection(gradeConfig);
    const gradePreset = presets.find(p => p.culture.localeCompare(culture, undefined, { sensitivity: 'base' }) === 0);
    return gradePreset?.grades ?? [{label: 'N/A', base: 0}];
 }

 /**
 * Returns a list of predefined grade sets.
 * @returns {import('$lib/grades/gradeFactory').GradeCollection[]}
 */
 export function GetGradePresets() {
   const presets = JSONToGradeCollection(gradeConfig);
   return presets.map(p => { return {label: p.culture, id: p.culture, grades: p.grades}; });
}