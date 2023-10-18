import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

import { AppStackParamList, ROUTES } from '@app/navigation/routes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useStore } from '@store';
import { Product } from '@types';

import { ProductPreloadCard } from './ProductPreloadCard';
import { ProductsNotFoundCard } from './ProductsNotFoundCard';

type BarCodeListProps = {
  isVisible: boolean;
  barcodes: string[];
  onDismiss: () => void;
};

export function BarCodeList({
  isVisible,
  onDismiss,
  barcodes,
}: BarCodeListProps) {
  const { products, setProducts } = useStore();
  const [hasError, setHasError] = useState(false);

  const handleFailedRequest = useCallback(() => {
    setHasError(true);
  }, []);

  const { colors } = useTheme();
  const style = useMemo(() => styles(colors), [colors]);

  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const [selectedProducts, setSelectedProducts] = useState<
    Record<string, Product>
  >({});

  const handleSelectBarcode = useCallback(
    (item: Product, barcodeId: string) => {
      if (selectedProducts[barcodeId]) {
        const newObj = selectedProducts;
        delete newObj[barcodeId];
        setSelectedProducts({ ...newObj });
      } else {
        setSelectedProducts((state) => ({ ...state, [barcodeId]: item }));
      }
    },
    [selectedProducts]
  );

  const handleDismiss = useCallback(() => {
    setHasError(false);
    onDismiss();
  }, []);

  const handleAddPress = useCallback(() => {
    setProducts({ ...products, ...selectedProducts });
    setSelectedProducts({});
    handleDismiss();

    navigation.navigate(ROUTES.Cart);
  }, [products, selectedProducts]);

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={handleDismiss}
        contentContainerStyle={style.containerModalStyle}
        style={style.flatListStyle}
      >
        <View style={style.modalInnerWrapper}>
          <View style={style.header}>
            <Text variant='headlineMedium'>List of products</Text>
          </View>
          <View style={style.flatListWrapper}>
            <FlatList
              style={style.flatListStyle}
              data={barcodes}
              keyExtractor={(key) => key}
              extraData={[selectedProducts, hasError]}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ProductPreloadCard
                  barcode={item}
                  onCheckboxPress={handleSelectBarcode}
                  isChecked={Object.keys(selectedProducts).includes(item)}
                  onFailedRequest={handleFailedRequest}
                />
              )}
              ListHeaderComponent={hasError ? <ProductsNotFoundCard /> : null}
            />
          </View>
          <View style={style.buttonsContainer}>
            <Button
              onPress={handleAddPress}
              mode='elevated'
              style={style.btnStyle}
            >
              Add
            </Button>
            <Button
              onPress={handleDismiss}
              mode='elevated'
              style={style.btnStyle}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = (colors?: MD3Colors) =>
  StyleSheet.create({
    btnStyle: {
      flex: 1,
    },
    modalInnerWrapper: {
      width: '100%',
      height: '100%',
    },
    flatListStyle: {
      flex: 1,
    },
    flatListWrapper: {
      flex: 1,
    },
    containerModalStyle: {
      backgroundColor: colors?.primaryContainer,
      flex: 1,
      marginVertical: 64,
      marginHorizontal: 32,
      borderRadius: 8,
    },
    buttonsContainer: {
      paddingVertical: 16,
      paddingHorizontal: 8,
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderTopWidth: 1,
      borderColor: colors?.primary,
      gap: 8,
    },
    header: {
      padding: 8,
      borderBottomWidth: 1,
      borderColor: colors?.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
