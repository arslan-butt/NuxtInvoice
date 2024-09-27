export interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  customerName: string;
  totalAmount: number;
  status: "Pending" | "Paid" | "Cancelled"; // Invoice status
}
