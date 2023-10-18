import { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Avatar, Card, Checkbox } from 'react-native-paper';

import { getProductByBarcode } from '@api/products';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@types';

type ProductPreloadCardProps = {
  barcode: string;
  isChecked: boolean;
  onCheckboxPress: (product: Product, barcode: string) => void;
  onFailedRequest: () => void;
};

export const ProductPreloadCard = memo(function ProductPreloadCard({
  barcode,
  isChecked,
  onCheckboxPress,
  onFailedRequest,
}: ProductPreloadCardProps) {
  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ['product', barcode],
    queryFn: () => getProductByBarcode(barcode),
  });

  const handelPressCheckbox = () => {
    if (product) {
      onCheckboxPress(product, barcode);
    }
  };

  useEffect(() => {
    if (product) {
      onCheckboxPress(product, barcode);
    }
  }, [product]);

  useEffect(() => {
    if (error && !isLoading) {
      onFailedRequest();
    }
  }, [error, isLoading]);

  if (error) {
    return <></>;
  }

  return (
    <Card style={styles.card} elevation={3}>
      <Card.Title
        title={isLoading ? 'Loading...' : product?.title}
        subtitle={isLoading ? 'Loading...' : product?.brand}
        left={(props) =>
          isLoading ? (
            <ActivityIndicator animating={true} />
          ) : (
            <Avatar.Image {...props} source={{ uri: product?.images[0] }} />
          )
        }
        right={() => (
          <View style={styles.checkboxWrapper}>
            {isLoading ? (
              <ActivityIndicator animating={true} />
            ) : (
              <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={handelPressCheckbox}
              />
            )}
          </View>
        )}
      />
    </Card>
  );
});

const styles = StyleSheet.create({
  card: { margin: 6 },
  checkboxWrapper: { marginRight: 8 },
});
