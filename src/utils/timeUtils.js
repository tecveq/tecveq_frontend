import moment from 'moment-timezone';

/**
 * Time utility functions for centralized time conversion logic
 * This eliminates magic strings and provides better control and reusability
 */

/**
 * Convert UTC time to PKT (Pakistan Standard Time)
 * @param {Date|string} dateTime - Input date/time to convert
 * @returns {moment.Moment} Moment object in PKT timezone
 */
export const convertToPKT = (dateTime) => {
  return moment.utc(dateTime).tz('Asia/Karachi');
};

/**
 * Convert UTC time to PKT and subtract specified hours
 * @param {Date|string} dateTime - Input date/time to convert
 * @param {number} hours - Hours to subtract (default: 5)
 * @returns {moment.Moment} Moment object in PKT timezone with hours subtracted
 */
export const convertToPKTAndSubtractHours = (dateTime, hours = 5) => {
  return moment.utc(dateTime).tz('Asia/Karachi').subtract(hours, 'hours');
};

/**
 * Convert date string to PKT timezone
 * @param {string} dateString - Date string to convert
 * @returns {moment.Moment} Moment object in PKT timezone
 */
export const convertDateStringToPKT = (dateString) => {
  return moment.tz(dateString, 'Asia/Karachi');
};

/**
 * Format time in PKT timezone
 * @param {Date|string} dateTime - Input date/time to format
 * @param {string} format - Moment.js format string (default: 'HH:mm')
 * @returns {string} Formatted time string in PKT
 */
export const formatTimeInPKT = (dateTime, format = 'HH:mm') => {
  return moment.utc(dateTime).tz('Asia/Karachi').format(format);
};

/**
 * Create a date-time string in PKT timezone
 * @param {string} dateOnly - Date string in YYYY-MM-DD format
 * @param {string} timeOnly - Time string in HH:mm:ss format
 * @returns {string} Combined date-time string
 */
export const createDateTimeInPKT = (dateOnly, timeOnly) => {
  return `${dateOnly}T${timeOnly}`;
};

/**
 * Calculate duration between two times in hours
 * @param {Date|string} startTime - Start time
 * @param {Date|string} endTime - End time
 * @returns {number} Duration in hours
 */
export const calculateDurationHours = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return (end - start) / (1000 * 60 * 60); // Convert ms to hours
};

/**
 * Check if a date is a weekend
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if weekend, false otherwise
 */
export const isWeekend = (date) => {
  const day = new Date(date).getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

/**
 * Get start and end of day in PKT timezone
 * @param {Date|string} date - Date to get start/end of day for
 * @returns {Object} Object with start and end of day
 */
export const getDayBoundariesInPKT = (date) => {
  const pktDate = convertToPKT(date);
  return {
    startOfDay: pktDate.clone().startOf('day'),
    endOfDay: pktDate.clone().endOf('day')
  };
};
