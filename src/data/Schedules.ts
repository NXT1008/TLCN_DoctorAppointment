import {Schedule} from '../models/Schedule';

export const schedules: Schedule[] = [
  // Bác sĩ 1 - Dr. Bowen Chan
  {
    scheduleId: 'sche_1',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T09:00:00'), // 9:00 AM
    endTime: new Date('2024-10-20T10:00:00'), // 10:00 AM
    doctorId: 'doc_1',
  },
  {
    scheduleId: 'sche_2',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T11:00:00'),
    endTime: new Date('2024-10-20T12:00:00'),
    doctorId: 'doc_1',
  },
  {
    scheduleId: 'sche_3',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T14:00:00'),
    endTime: new Date('2024-10-21T15:00:00'),
    doctorId: 'doc_1',
  },
  {
    scheduleId: 'sche_4',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T13:00:00'),
    endTime: new Date('2024-10-22T14:00:00'),
    doctorId: 'doc_1',
  },
  {
    scheduleId: 'sche_5',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T15:00:00'),
    endTime: new Date('2024-10-23T16:00:00'),
    doctorId: 'doc_1',
  },

  // Bác sĩ 2 - Dr. Sharon Hind
  {
    scheduleId: 'sche_6',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T10:00:00'), // 10:00 AM
    endTime: new Date('2024-10-20T11:00:00'), // 11:00 AM
    doctorId: 'doc_2',
  },
  {
    scheduleId: 'sche_7',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T12:00:00'),
    endTime: new Date('2024-10-20T13:00:00'),
    doctorId: 'doc_2',
  },
  {
    scheduleId: 'sche_8',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T14:30:00'),
    endTime: new Date('2024-10-21T15:30:00'),
    doctorId: 'doc_2',
  },
  {
    scheduleId: 'sche_9',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T09:30:00'),
    endTime: new Date('2024-10-22T10:30:00'),
    doctorId: 'doc_2',
  },
  {
    scheduleId: 'sche_10',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T16:00:00'),
    endTime: new Date('2024-10-23T17:00:00'),
    doctorId: 'doc_2',
  },

  // Bác sĩ 3 - Dr. Alex Johnson
  {
    scheduleId: 'sche_11',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T08:30:00'), // 8:30 AM
    endTime: new Date('2024-10-21T09:30:00'), // 9:30 AM
    doctorId: 'doc_3',
  },
  {
    scheduleId: 'sche_12',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T11:00:00'),
    endTime: new Date('2024-10-21T12:00:00'),
    doctorId: 'doc_3',
  },
  {
    scheduleId: 'sche_13',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T14:00:00'),
    endTime: new Date('2024-10-22T15:00:00'),
    doctorId: 'doc_3',
  },
  {
    scheduleId: 'sche_14',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T10:00:00'),
    endTime: new Date('2024-10-23T11:00:00'),
    doctorId: 'doc_3',
  },
  {
    scheduleId: 'sche_15',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T15:30:00'),
    endTime: new Date('2024-10-23T16:30:00'),
    doctorId: 'doc_3',
  },

  // Bác sĩ 4 - Dr. Maria White
  {
    scheduleId: 'sche_16',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T09:00:00'), // 9:00 AM
    endTime: new Date('2024-10-21T10:00:00'), // 10:00 AM
    doctorId: 'doc_4',
  },
  {
    scheduleId: 'sche_17',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T10:30:00'),
    endTime: new Date('2024-10-22T11:30:00'),
    doctorId: 'doc_4',
  },
  {
    scheduleId: 'sche_18',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T09:30:00'),
    endTime: new Date('2024-10-23T10:30:00'),
    doctorId: 'doc_4',
  },
  {
    scheduleId: 'sche_19',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T11:00:00'),
    endTime: new Date('2024-10-24T12:00:00'),
    doctorId: 'doc_4',
  },
  {
    scheduleId: 'sche_20',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T14:00:00'),
    endTime: new Date('2024-10-24T15:00:00'),
    doctorId: 'doc_4',
  },

  // Bác sĩ 5 - Dr. Emily Brown
  {
    scheduleId: 'sche_21',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T09:30:00'), // 9:30 AM
    endTime: new Date('2024-10-20T10:30:00'), // 10:30 AM
    doctorId: 'doc_5',
  },
  {
    scheduleId: 'sche_22',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T12:00:00'),
    endTime: new Date('2024-10-20T13:00:00'),
    doctorId: 'doc_5',
  },
  {
    scheduleId: 'sche_23',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T11:00:00'),
    endTime: new Date('2024-10-21T12:00:00'),
    doctorId: 'doc_5',
  },
  {
    scheduleId: 'sche_24',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T15:00:00'),
    endTime: new Date('2024-10-22T16:00:00'),
    doctorId: 'doc_5',
  },
  {
    scheduleId: 'sche_25',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T09:00:00'),
    endTime: new Date('2024-10-23T10:00:00'),
    doctorId: 'doc_5',
  },
  // Bác sĩ 6 - Dr. Ava Lee
  {
    scheduleId: 'sche_26',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T08:00:00'), // 8:00 AM
    endTime: new Date('2024-10-20T09:00:00'), // 9:00 AM
    doctorId: 'doc_6',
  },
  {
    scheduleId: 'sche_27',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T10:00:00'), // 10:00 AM
    endTime: new Date('2024-10-21T11:00:00'), // 11:00 AM
    doctorId: 'doc_6',
  },
  {
    scheduleId: 'sche_28',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T13:00:00'), // 1:00 PM
    endTime: new Date('2024-10-22T14:00:00'), // 2:00 PM
    doctorId: 'doc_6',
  },
  {
    scheduleId: 'sche_29',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T15:00:00'), // 3:00 PM
    endTime: new Date('2024-10-23T16:00:00'), // 4:00 PM
    doctorId: 'doc_6',
  },
  {
    scheduleId: 'sche_30',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T09:30:00'), // 9:30 AM
    endTime: new Date('2024-10-24T10:30:00'), // 10:30 AM
    doctorId: 'doc_6',
  },
  // Bác sĩ 7 - Dr. Sophia Kim
  {
    scheduleId: 'sche_31',
    availableDate: new Date('2024-10-20'),
    startTime: new Date('2024-10-20T08:30:00'), // 8:30 AM
    endTime: new Date('2024-10-20T09:30:00'), // 9:30 AM
    doctorId: 'doc_7',
  },
  {
    scheduleId: 'sche_32',
    availableDate: new Date('2024-10-21'),
    startTime: new Date('2024-10-21T10:00:00'), // 10:00 AM
    endTime: new Date('2024-10-21T11:00:00'), // 11:00 AM
    doctorId: 'doc_7',
  },
  {
    scheduleId: 'sche_33',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T14:00:00'), // 2:00 PM
    endTime: new Date('2024-10-22T15:00:00'), // 3:00 PM
    doctorId: 'doc_7',
  },
  {
    scheduleId: 'sche_34',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T09:00:00'), // 9:00 AM
    endTime: new Date('2024-10-23T10:00:00'), // 10:00 AM
    doctorId: 'doc_7',
  },
  {
    scheduleId: 'sche_35',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T13:00:00'), // 1:00 PM
    endTime: new Date('2024-10-24T14:00:00'), // 2:00 PM
    doctorId: 'doc_7',
  },
  // Bác sĩ 8 - Dr. Emma Lee
  {
    scheduleId: 'sche_36',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T08:00:00'), // 8:00 AM
    endTime: new Date('2024-10-22T09:00:00'), // 9:00 AM
    doctorId: 'doc_8',
  },
  {
    scheduleId: 'sche_37',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T11:00:00'), // 11:00 AM
    endTime: new Date('2024-10-23T12:00:00'), // 12:00 PM
    doctorId: 'doc_8',
  },
  {
    scheduleId: 'sche_38',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T13:00:00'), // 1:00 PM
    endTime: new Date('2024-10-24T14:00:00'), // 2:00 PM
    doctorId: 'doc_8',
  },
  {
    scheduleId: 'sche_39',
    availableDate: new Date('2024-10-25'),
    startTime: new Date('2024-10-25T15:00:00'), // 3:00 PM
    endTime: new Date('2024-10-25T16:00:00'), // 4:00 PM
    doctorId: 'doc_8',
  },
  {
    scheduleId: 'sche_40',
    availableDate: new Date('2024-10-26'),
    startTime: new Date('2024-10-26T10:00:00'), // 10:00 AM
    endTime: new Date('2024-10-26T11:00:00'), // 11:00 AM
    doctorId: 'doc_8',
  },

  // Bác sĩ 9 - Dr. Daniel Garcia
  {
    scheduleId: 'sche_41',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T09:30:00'), // 9:30 AM
    endTime: new Date('2024-10-22T10:30:00'), // 10:30 AM
    doctorId: 'doc_9',
  },
  {
    scheduleId: 'sche_42',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T14:00:00'), // 2:00 PM
    endTime: new Date('2024-10-23T15:00:00'), // 3:00 PM
    doctorId: 'doc_9',
  },
  {
    scheduleId: 'sche_43',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T11:00:00'), // 11:00 AM
    endTime: new Date('2024-10-24T12:00:00'), // 12:00 PM
    doctorId: 'doc_9',
  },
  {
    scheduleId: 'sche_44',
    availableDate: new Date('2024-10-25'),
    startTime: new Date('2024-10-25T16:00:00'), // 4:00 PM
    endTime: new Date('2024-10-25T17:00:00'), // 5:00 PM
    doctorId: 'doc_9',
  },
  {
    scheduleId: 'sche_45',
    availableDate: new Date('2024-10-26'),
    startTime: new Date('2024-10-26T08:30:00'), // 8:30 AM
    endTime: new Date('2024-10-26T09:30:00'), // 9:30 AM
    doctorId: 'doc_9',
  },

  // Bác sĩ 10 - Dr. Lily Nguyen
  {
    scheduleId: 'sche_46',
    availableDate: new Date('2024-10-22'),
    startTime: new Date('2024-10-22T10:00:00'), // 10:00 AM
    endTime: new Date('2024-10-22T11:00:00'), // 11:00 AM
    doctorId: 'doc_10',
  },
  {
    scheduleId: 'sche_47',
    availableDate: new Date('2024-10-23'),
    startTime: new Date('2024-10-23T13:00:00'), // 1:00 PM
    endTime: new Date('2024-10-23T14:00:00'), // 2:00 PM
    doctorId: 'doc_10',
  },
  {
    scheduleId: 'sche_48',
    availableDate: new Date('2024-10-24'),
    startTime: new Date('2024-10-24T14:30:00'), // 2:30 PM
    endTime: new Date('2024-10-24T15:30:00'), // 3:30 PM
    doctorId: 'doc_10',
  },
  {
    scheduleId: 'sche_49',
    availableDate: new Date('2024-10-25'),
    startTime: new Date('2024-10-25T09:00:00'), // 9:00 AM
    endTime: new Date('2024-10-25T10:00:00'), // 10:00 AM
    doctorId: 'doc_10',
  },
  {
    scheduleId: 'sche_50',
    availableDate: new Date('2024-10-26'),
    startTime: new Date('2024-10-26T15:00:00'), // 3:00 PM
    endTime: new Date('2024-10-26T16:00:00'), // 4:00 PM
    doctorId: 'doc_10',
  },
];
