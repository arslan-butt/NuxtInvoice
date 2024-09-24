export interface Invoice {
  id: number;
  date: string;
  customerName: string;
  totalAmount: number;
  status: "Pending" | "Paid" | "Cancelled"; // Invoice status
}
