export type Ticket = {
  id: number;
  property_id: string;
  user_id: number;
  message: string;
  status: TicketStatus;
  created_at: Date;
  updated_at: Date;
  resolution?: string;
};

export enum TicketStatus {
  OPEN = "OPEN",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}
