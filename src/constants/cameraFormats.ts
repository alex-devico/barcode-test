import { BarcodeFormat } from 'vision-camera-code-scanner';

export const ALL_SUPPORTED_FORMATS = [
  BarcodeFormat.UPC_A,
  BarcodeFormat.CODE_39,
  BarcodeFormat.CODE_128,
  BarcodeFormat.ITF,
  BarcodeFormat.PDF417,
  BarcodeFormat.QR_CODE,
  BarcodeFormat.DATA_MATRIX,
  BarcodeFormat.AZTEC,
];
