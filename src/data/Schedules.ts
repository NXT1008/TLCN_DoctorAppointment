import {Schedule} from '../models/Schedule';

export const schedules: Schedule[] = [
  // Bác sĩ 1 - Dr. Bowen Chan
  {
    scheduleId: 'sche_001',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T09:00:00'), // 9:00 AM
    endTime: new Date('2024-10-20T10:00:00'), // 10:00 AM
    doctorId: 'doc_001',
    isBook: false
  },
  {
    scheduleId: 'sche_002',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T11:00:00'),
    endTime: new Date('2024-10-20T12:00:00'),
    doctorId: 'doc_001',
    isBook: false
  },
  {
    scheduleId: 'sche_003',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T14:00:00'),
    endTime: new Date('2024-10-21T15:00:00'),
    doctorId: 'doc_001',
    isBook: false
  },
  {
    scheduleId: 'sche_004',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T13:00:00'),
    endTime: new Date('2024-10-22T14:00:00'),
    doctorId: 'doc_001',
    isBook: false
  },
  {
    scheduleId: 'sche_005',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T15:00:00'),
    endTime: new Date('2024-10-23T16:00:00'),
    doctorId: 'doc_001',
    isBook: false
  },

  // Bác sĩ 2 - Dr. Sharon Hind
  {
    scheduleId: 'sche_006',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T10:00:00'), // 10:00 AM
    endTime: new Date('2024-10-20T11:00:00'), // 11:00 AM
    doctorId: 'doc_002',
    isBook: false
  },
  {
    scheduleId: 'sche_007',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T12:00:00'),
    endTime: new Date('2024-10-20T13:00:00'),
    doctorId: 'doc_002',
    isBook: false
  },
  {
    scheduleId: 'sche_008',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T14:30:00'),
    endTime: new Date('2024-10-21T15:30:00'),
    doctorId: 'doc_002',
    isBook: false
  },
  {
    scheduleId: 'sche_009',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T09:30:00'),
    endTime: new Date('2024-10-22T10:30:00'),
    doctorId: 'doc_002',
    isBook: false
  },
  {
    scheduleId: 'sche_010',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T16:00:00'),
    endTime: new Date('2024-10-23T17:00:00'),
    doctorId: 'doc_002',
    isBook: false
  },

  // Bác sĩ 3 - Dr. Alex Johnson
  {
    scheduleId: 'sche_011',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T08:30:00'), // 8:30 AM
    endTime: new Date('2024-10-21T09:30:00'), // 9:30 AM
    doctorId: 'doc_003',
    isBook: false
  },
  {
    scheduleId: 'sche_012',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T11:00:00'),
    endTime: new Date('2024-10-21T12:00:00'),
    doctorId: 'doc_003',
    isBook: false
  },
  {
    scheduleId: 'sche_013',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T14:00:00'),
    endTime: new Date('2024-10-22T15:00:00'),
    doctorId: 'doc_003',
    isBook: false
  },
  {
    scheduleId: 'sche_014',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T10:00:00'),
    endTime: new Date('2024-10-23T11:00:00'),
    doctorId: 'doc_003',
    isBook: false
  },
  {
    scheduleId: 'sche_015',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T15:30:00'),
    endTime: new Date('2024-10-23T16:30:00'),
    doctorId: 'doc_003',
    isBook: false
  },

  // Bác sĩ 4 - Dr. Maria White
  {
    scheduleId: 'sche_016',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T09:00:00'), // 9:00 AM
    endTime: new Date('2024-10-21T10:00:00'), // 10:00 AM
    doctorId: 'doc_004',
    isBook: false
  },
  {
    scheduleId: 'sche_017',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T10:30:00'),
    endTime: new Date('2024-10-22T11:30:00'),
    doctorId: 'doc_004',
    isBook: false
  },
  {
    scheduleId: 'sche_018',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T09:30:00'),
    endTime: new Date('2024-10-23T10:30:00'),
    doctorId: 'doc_004',
    isBook: false
  },
  {
    scheduleId: 'sche_019',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T11:00:00'),
    endTime: new Date('2024-10-24T12:00:00'),
    doctorId: 'doc_004',
    isBook: false
  },
  {
    scheduleId: 'sche_020',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T14:00:00'),
    endTime: new Date('2024-10-24T15:00:00'),
    doctorId: 'doc_004',
    isBook: false
  },

  // Bác sĩ 5 - Dr. Emily Brown
  {
    scheduleId: 'sche_021',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T09:30:00'), // 9:30 AM
    endTime: new Date('2024-10-20T10:30:00'), // 10:30 AM
    doctorId: 'doc_005',
    isBook: false
  },
  {
    scheduleId: 'sche_022',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T12:00:00'),
    endTime: new Date('2024-10-20T13:00:00'),
    doctorId: 'doc_005',
    isBook: false
  },
  {
    scheduleId: 'sche_023',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T11:00:00'),
    endTime: new Date('2024-10-21T12:00:00'),
    doctorId: 'doc_005',
    isBook: false
  },
  {
    scheduleId: 'sche_024',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T15:00:00'),
    endTime: new Date('2024-10-22T16:00:00'),
    doctorId: 'doc_005',
    isBook: false
  },
  {
    scheduleId: 'sche_025',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T09:00:00'),
    endTime: new Date('2024-10-23T10:00:00'),
    doctorId: 'doc_005',
    isBook: false
  },
  // Bác sĩ 6 - Dr. Ava Lee
  {
    scheduleId: 'sche_026',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T08:00:00'), // 8:00 AM
    endTime: new Date('2024-10-20T09:00:00'), // 9:00 AM
    doctorId: 'doc_006',
    isBook: false
  },
  {
    scheduleId: 'sche_027',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T10:00:00'), // 10:00 AM
    endTime: new Date('2024-10-21T11:00:00'), // 11:00 AM
    doctorId: 'doc_006',
    isBook: false
  },
  {
    scheduleId: 'sche_028',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T13:00:00'), // 1:00 PM
    endTime: new Date('2024-10-22T14:00:00'), // 2:00 PM
    doctorId: 'doc_006',
    isBook: false
  },
  {
    scheduleId: 'sche_029',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T15:00:00'), // 3:00 PM
    endTime: new Date('2024-10-23T16:00:00'), // 4:00 PM
    doctorId: 'doc_006',
    isBook: false
  },
  {
    scheduleId: 'sche_030',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T09:30:00'), // 9:30 AM
    endTime: new Date('2024-10-24T10:30:00'), // 10:30 AM
    doctorId: 'doc_006',
    isBook: false
  },
  // Bác sĩ 7 - Dr. Sophia Kim
  {
    scheduleId: 'sche_031',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T08:30:00'), // 8:30 AM
    endTime: new Date('2024-10-20T09:30:00'), // 9:30 AM
    doctorId: 'doc_007',
    isBook: false
  },
  {
    scheduleId: 'sche_032',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T10:00:00'), // 10:00 AM
    endTime: new Date('2024-10-21T11:00:00'), // 11:00 AM
    doctorId: 'doc_007',
    isBook: false
  },
  {
    scheduleId: 'sche_033',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T14:00:00'), // 2:00 PM
    endTime: new Date('2024-10-22T15:00:00'), // 3:00 PM
    doctorId: 'doc_007',
    isBook: false
  },
  {
    scheduleId: 'sche_034',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T09:00:00'), // 9:00 AM
    endTime: new Date('2024-10-23T10:00:00'), // 10:00 AM
    doctorId: 'doc_007',
    isBook: false
  },
  {
    scheduleId: 'sche_035',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T13:00:00'), // 1:00 PM
    endTime: new Date('2024-10-24T14:00:00'), // 2:00 PM
    doctorId: 'doc_007',
    isBook: false
  },
  // Bác sĩ 8 - Dr. Emma Lee
  {
    scheduleId: 'sche_036',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T08:00:00'), // 8:00 AM
    endTime: new Date('2024-10-22T09:00:00'), // 9:00 AM
    doctorId: 'doc_008',
    isBook: false
  },
  {
    scheduleId: 'sche_037',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T11:00:00'), // 11:00 AM
    endTime: new Date('2024-10-23T12:00:00'), // 12:00 PM
    doctorId: 'doc_008',
    isBook: false
  },
  {
    scheduleId: 'sche_038',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T13:00:00'), // 1:00 PM
    endTime: new Date('2024-10-24T14:00:00'), // 2:00 PM
    doctorId: 'doc_008',
    isBook: false
  },
  {
    scheduleId: 'sche_039',
    availableDate: new Date('2024-10-25'),
    startTime: new Date('2024-10-25T15:00:00'), // 3:00 PM
    endTime: new Date('2024-10-25T16:00:00'), // 4:00 PM
    doctorId: 'doc_008',
    isBook: false
  },
  {
    scheduleId: 'sche_040',
    availableDate: new Date('2024-10-26'),
    startTime: new Date('2024-10-26T10:00:00'), // 10:00 AM
    endTime: new Date('2024-10-26T11:00:00'), // 11:00 AM
    doctorId: 'doc_008',
    isBook: false
  },

  // Bác sĩ 9 - Dr. Daniel Garcia
  {
    scheduleId: 'sche_041',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T09:30:00'), // 9:30 AM
    endTime: new Date('2024-10-22T10:30:00'), // 10:30 AM
    doctorId: 'doc_009',
    isBook: false
  },
  {
    scheduleId: 'sche_042',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T14:00:00'), // 2:00 PM
    endTime: new Date('2024-10-23T15:00:00'), // 3:00 PM
    doctorId: 'doc_009',
    isBook: false
  },
  {
    scheduleId: 'sche_043',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T11:00:00'), // 11:00 AM
    endTime: new Date('2024-10-24T12:00:00'), // 12:00 PM
    doctorId: 'doc_009',
    isBook: false
  },
  {
    scheduleId: 'sche_044',
    availableDate: new Date('2024-10-25'),
    startTime: new Date('2024-10-25T16:00:00'), // 4:00 PM
    endTime: new Date('2024-10-25T17:00:00'), // 5:00 PM
    doctorId: 'doc_009',
    isBook: false
  },
  {
    scheduleId: 'sche_045',
    availableDate: new Date('2024-10-26'),
    startTime: new Date('2024-10-26T08:30:00'), // 8:30 AM
    endTime: new Date('2024-10-26T09:30:00'), // 9:30 AM
    doctorId: 'doc_009',
    isBook: false
  },

  // Bác sĩ 10 - Dr. Lily Nguyen
  {
    scheduleId: 'sche_046',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T10:00:00'), // 10:00 AM
    endTime: new Date('2024-10-22T11:00:00'), // 11:00 AM
    doctorId: 'doc_010',
    isBook: false
  },
  {
    scheduleId: 'sche_047',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T13:00:00'), // 1:00 PM
    endTime: new Date('2024-10-23T14:00:00'), // 2:00 PM
    doctorId: 'doc_010',
    isBook: false
  },
  {
    scheduleId: 'sche_048',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T14:30:00'), // 2:30 PM
    endTime: new Date('2024-10-24T15:30:00'), // 3:30 PM
    doctorId: 'doc_010',
    isBook: false
  },
  {
    scheduleId: 'sche_049',
    availableDate: new Date('2024-10-25'),
    startTime: new Date('2024-10-25T09:00:00'), // 9:00 AM
    endTime: new Date('2024-10-25T10:00:00'), // 10:00 AM
    doctorId: 'doc_010',
    isBook: false
  },
  {
    scheduleId: 'sche_050',
    availableDate: new Date('2024-10-26'),
    startTime: new Date('2024-10-26T15:00:00'), // 3:00 PM
    endTime: new Date('2024-10-26T16:00:00'), // 4:00 PM
    doctorId: 'doc_010',
    isBook: false
  },
];
