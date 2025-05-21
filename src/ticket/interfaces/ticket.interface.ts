export interface Ticket {
  id: string;
  code: string;
  createdAt: Date;
  maxUses: number;
  uses: number;
  valid: boolean;
  qrCode: string;
}

export interface ValidationResult {
  valid: boolean;
  remainingUses: number;
}

export interface DiscountResult {
  success: boolean;
  remainingUses?: number;
}