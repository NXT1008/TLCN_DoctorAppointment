// Models/Cancellation.ts
export interface Cancellation {
  cancellationId: number;
  cancelReason: string;
  cancelBy: string;
  cancelTime: Date;
  appointmentId: number;
}  