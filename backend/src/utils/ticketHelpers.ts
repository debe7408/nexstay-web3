import queryDb from "../databaseConnection";

export type Tickets = {
  id: number;
  property_id: string;
  user_id: number;
  message: string;
  status: TicketStatus;
  resolution: string;
  created_at: Date;
  updated_at: Date;
};

enum TicketStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  RESOLVED = "RESOLVED",
}

export const checkIfTicketPending = async (
  userId: number | string,
  propertyId: number | string
) => {
  const sql =
    "SELECT * FROM tickets WHERE property_id = ? AND user_id = ? AND status = 'OPEN'";

  const result: Tickets[] = await queryDb(sql, [propertyId, userId]);

  if (result.length === 0) return false;

  return true;
};

export const createTicket = async (
  propertyId: string,
  userId: number,
  message: string
) => {
  const sql =
    "INSERT INTO tickets (property_id, user_id, message) VALUES (?, ?, ?)";
  const result = await queryDb(sql, [propertyId, userId, message]);

  if (result.affectedRows === 0) return false;

  return true;
};

export const getAllTickets = async () => {
  const sql = "SELECT * FROM tickets";
  const result: Tickets[] = await queryDb(sql);

  if (result.length === 0) return false;

  return result;
};

export const getTicketById = async (id: number | string) => {
  const sql = "SELECT * FROM tickets WHERE id = ?";
  const result: Tickets[] = await queryDb(sql, [id]);

  if (result.length === 0) return false;

  return result[0];
};

export const getTicketsByPropertyId = async (propertyId: number | string) => {
  const sql = "SELECT * FROM tickets WHERE property_id = ?";
  const result: Tickets[] = await queryDb(sql, [propertyId]);

  if (result.length === 0) return false;

  return result;
};

export const getTicketsByUserId = async (userId: number | string) => {
  const sql = "SELECT * FROM tickets WHERE user_id = ?";
  const result: Tickets[] = await queryDb(sql, [userId]);

  if (result.length === 0) return false;

  return result;
};
