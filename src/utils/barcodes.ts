import { Barcode } from 'vision-camera-code-scanner';

export const prepareBarcodesData = (barcodes: Barcode[]): string[] => {
  if (barcodes.length) {
    const onlyWithValues = barcodes.filter(({ displayValue }) =>
      Boolean(displayValue)
    );

    const unique = [
      ...new Set(
        onlyWithValues.map(({ displayValue }) => displayValue as string)
      ),
    ];

    return unique;
  }

  return [];
};
