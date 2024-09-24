// types/invoiceItem.ts
export interface InvoiceItem {
  id: number; // Unique identifier for the invoice item
  invoiceId: number; // Reference to the associated invoice ID
  productId: number; // Reference to the product ID
  quantity: number; // Quantity of the product
  unitPrice: number; // Price per unit of the product
  totalPrice: number; // Total price for this line item (quantity * unitPrice)
}
