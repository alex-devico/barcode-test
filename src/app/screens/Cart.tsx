import { useMemo, useState } from 'react';
import React, { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useStore } from '@store';
import { DialogTemplate } from '@ui/DialogTemplate';
import { ProductCard } from '@ui/ProductCard';
import { CartSummary } from '@ui/CartSummary';
import { CartSummary as CartSummaryType } from '@types';

export function CartScreen() {
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();
  const style = useMemo(() => styles(colors), [colors]);

  const { products, removeProduct, counters, setCounter, clearCart } =
    useStore();

  const [isSubmitDialogVisible, setIsSubmitDialogVisible] = useState(false);
  const [summary, setSummary] = useState<CartSummaryType>([]);

  const handleSubmit = () => {
    const summary = Object.keys(products).map((id) => ({
      title: products[id].title?.slice(0, 25),
      amount: counters[id],
    }));

    setSummary(summary);
    setIsSubmitDialogVisible(true);
  };

  const handlePressDialogBtn = () => {
    setIsSubmitDialogVisible(false);
    clearCart();
  };

  const handleCloseDialog = () => {
    setIsSubmitDialogVisible(false);
  };

  return (
    <View style={[style.screen, { marginTop: insets.top }]}>
      <Text variant='headlineLarge' style={style.title}>
        Cart
      </Text>
      <View style={style.scrollContainer}>
        {Object.keys(products).length ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.keys(products).map((id) => (
              <ProductCard
                key={id}
                id={id}
                {...products[id]}
                counter={counters[id]}
                onChangeCounter={setCounter}
                onRemove={removeProduct}
              />
            ))}
          </ScrollView>
        ) : (
          <Text variant='headlineMedium' style={style.emptyTextStyle}>
            Your Cart is empty
          </Text>
        )}
      </View>
      <View style={style.btnWrapper}>
        <Button
          mode='contained'
          onPress={handleSubmit}
          style={style.btn}
          disabled={!Object.keys(products).length}
        >
          Submit
        </Button>
      </View>
      <DialogTemplate
        isVisible={isSubmitDialogVisible}
        onDismiss={handleCloseDialog}
        title='You successfully ordered the following products:'
        body={<CartSummary summary={summary} />}
        btnText='Ok'
        onBtnPress={handlePressDialogBtn}
      />
    </View>
  );
}

const styles = (colors?: MD3Colors) =>
  StyleSheet.create({
    title: {
      textAlign: 'center',
      marginVertical: 8,
      color: colors?.primary,
    },
    screen: { height: '100%' },
    btnWrapper: { width: '100%', height: 100 },
    btn: {
      margin: 4,
    },
    scrollContainer: {
      flex: 1,
    },
    emptyTextStyle: {
      marginLeft: 12,
      marginVertical: 8,
      color: colors?.primary,
    },
  });
