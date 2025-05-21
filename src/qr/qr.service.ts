import * as QRCode from 'qrcode';

export class QrService {
  async generateQrCode(data: string): Promise<string> {
    return await QRCode.toDataURL(data);
  }
}
