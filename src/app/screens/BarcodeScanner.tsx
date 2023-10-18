import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useScanBarcodes } from 'vision-camera-code-scanner';

import { BarCodeList } from '@ui/BarCodeList';
import { DialogTemplate } from '@ui/DialogTemplate';
import { WarningCart } from '@ui/WarningCart';
import { prepareBarcodesData } from '@utils';
import { ALL_SUPPORTED_FORMATS } from '@constants/cameraFormats';

export function BarcodeScanner() {
  const { colors } = useTheme();
  const style = useMemo(() => styles(colors), [colors]);

  const [hasPermission, setHasPermission] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [barcodeState, setBarcodeState] = useState<string[]>([]);

  const devices = useCameraDevices();
  const device = devices.back;

  const [isHelperVisible, setIsHelperVisible] = useState(false);

  const [frameProcessor, barcodes] = useScanBarcodes(ALL_SUPPORTED_FORMATS, {
    checkInverted: true,
  });

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (barcodes.length) {
      setIsActive(false);
      setVisible(true);
      setBarcodeState(prepareBarcodesData(barcodes));
    }
  }, [barcodes]);

  const requestPermission = useCallback(async () => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === 'authorized');
  }, []);

  const handleUploadTestData = useCallback(() => {
    setIsActive(false);
    setVisible(true);
    setBarcodeState(['9780140157376', '8050509131257', 'brokenProduct']);
  }, []);

  const hideModal = useCallback(() => {
    setBarcodeState([]);
    setIsActive(true);
    setVisible(false);
  }, []);

  const showDialog = () => setIsHelperVisible(true);

  const hideDialog = () => setIsHelperVisible(false);

  return (
    <>
      {device != null && hasPermission ? (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          <View style={style.cameraContainer}>
            <MaterialCommunityIcons
              name='scan-helper'
              color={'white'}
              size={300}
              style={style.squareStyle}
            />
            <IconButton
              onPress={showDialog}
              size={36}
              icon='help'
              style={style.btnHelp}
              mode='contained'
            />
          </View>
        </>
      ) : (
        <View style={style.emptyContainer}>
          {!device ? (
            <WarningCart
              text='Your device doesn`t have camera module!'
              btnText=' Upload test data'
              onPress={handleUploadTestData}
            />
          ) : (
            <WarningCart
              text='You didn`t give access to the camera!'
              btnText='Request Camera Permission'
              onPress={requestPermission}
            />
          )}
        </View>
      )}
      <BarCodeList
        isVisible={visible}
        onDismiss={hideModal}
        barcodes={barcodeState}
      />
      <DialogTemplate
        isVisible={isHelperVisible}
        onDismiss={hideDialog}
        title='Help'
        bodyText={`Point your camera's viewfinder at the QR code.`}
        btnText='Ok'
        onBtnPress={hideDialog}
      />
    </>
  );
}

const styles = (colors?: MD3Colors) =>
  StyleSheet.create({
    emptyContainer: {
      flex: 1,
      backgroundColor: colors?.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    cameraContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    squareStyle: {
      position: 'absolute',
      margin: 'auto',
    },
    btnHelp: {
      position: 'absolute',
      right: 12,
      bottom: '10%',
    },
  });
