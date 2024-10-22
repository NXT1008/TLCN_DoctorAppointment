// Models/Cancellation.ts
export interface Cancellation {
  cancellationId: string;
  cancelReason: string;
  cancelBy: string;
  cancelTime: Date;
  appointmentId: string;
}  