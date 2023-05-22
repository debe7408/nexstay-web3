export type Ticket = {
  id: number;
  property_id: string | number;
  user_id: number;
  message: string;
  status: TicketStatus;
  created_at: string | Date;
  updated_at: string | Date;
  resolution?: string;
};

export enum TicketStatus {
  OPEN = "OPEN",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}
