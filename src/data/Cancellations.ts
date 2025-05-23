import { Cancellation } from "../models/Cancellation";

export const cancellations: Cancellation[] = [
  {
    cancellationId: 'can_01',
    cancelReason: 'Family emergency',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-19T15:30:00'),
    appointmentId: 'app_02',
  },
  {
    cancellationId: 'can_02',
    cancelReason: 'Doctor unavailable',
    cancelBy: 'Doctor',
    cancelTime: new Date('2024-10-20T10:00:00'),
    appointmentId: 'app_05',
  },
  {
    cancellationId: 'can_03',
    cancelReason: 'Scheduling conflict',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-21T11:00:00'),
    appointmentId: 'app_08',
  },
  {
    cancellationId: 'can_04',
    cancelReason: 'Medical emergency',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-22T14:00:00'),
    appointmentId: 'app_12',
  },
  {
    cancellationId: 'can_05',
    cancelReason: 'Change of plans',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-22T16:00:00'),
    appointmentId: 'app_15',
  },
  {
    cancellationId: 'can_06',
    cancelReason: 'Doctor on leave',
    cancelBy: 'Doctor',
    cancelTime: new Date('2024-10-23T09:00:00'),
    appointmentId: 'app_20',
  },
  {
    cancellationId: 'can_07',
    cancelReason: 'Patient cancellation',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-24T13:00:00'),
    appointmentId: 'app_25',
  },
  {
    cancellationId: 'can_08',
    cancelReason: 'Personal reasons',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-25T10:30:00'),
    appointmentId: 'app_30',
  },
  {
    cancellationId: 'can_09',
    cancelReason: 'Health issues',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-26T11:15:00'),
    appointmentId: 'app_35',
  },
  {
    cancellationId: 'can_10',
    cancelReason: 'Other commitments',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-27T15:45:00'),
    appointmentId: 'app_40',
  },
  {
    cancellationId: 'can_11',
    cancelReason: 'Doctor changed schedule',
    cancelBy: 'Doctor',
    cancelTime: new Date('2024-10-28T08:00:00'),
    appointmentId: 'app_45',
  },
  {
    cancellationId: 'can_12',
    cancelReason: 'Emergency appointment',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-29T12:00:00'),
    appointmentId: 'app_50',
  },
  {
    cancellationId: 'can_13',
    cancelReason: 'Travel issues',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-10-30T14:00:00'),
    appointmentId: 'app_55',
  },
  {
    cancellationId: 'can_14',
    cancelReason: 'Doctor moved appointment',
    cancelBy: 'Doctor',
    cancelTime: new Date('2024-10-31T09:30:00'),
    appointmentId: 'app_60',
  },
  {
    cancellationId: 'can_15',
    cancelReason: 'Family obligation',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-11-01T10:00:00'),
    appointmentId: 'app_65',
  },
  {
    cancellationId: 'can_16',
    cancelReason: 'Patient decision',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-11-02T11:30:00'),
    appointmentId: 'app_70',
  },
  {
    cancellationId: 'can_17',
    cancelReason: 'Scheduling issue',
    cancelBy: 'Doctor',
    cancelTime: new Date('2024-11-03T13:00:00'),
    appointmentId: 'app_75',
  },
  {
    cancellationId: 'can_18',
    cancelReason: 'Personal emergency',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-11-04T14:30:00'),
    appointmentId: 'app_80',
  },
  {
    cancellationId: 'can_19',
    cancelReason: 'Health complications',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-11-05T09:00:00'),
    appointmentId: 'app_85',
  },
  {
    cancellationId: 'can_20',
    cancelReason: 'Last-minute decision',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-11-06T15:00:00'),
    appointmentId: 'app_90',
  },
  {
    cancellationId: 'can_21',
    cancelReason: 'Doctor unavailable due to illness',
    cancelBy: 'Doctor',
    cancelTime: new Date('2024-11-07T10:15:00'),
    appointmentId: 'app_95',
  },
  {
    cancellationId: 'can_22',
    cancelReason: 'Cancelled for personal reasons',
    cancelBy: 'Patient',
    cancelTime: new Date('2024-11-08T16:00:00'),
    appointmentId: 'app_100',
  },
];
