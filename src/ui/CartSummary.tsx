import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CartSummary as CartSummaryType } from '@types';

type CartSummaryProps = {
  summary: CartSummaryType;
};

export function CartSummary({ summary }: CartSummaryProps) {
  return (
    <View>
      {summary.map(({ title, amount }) => (
        <View style={style.textRow}>
          <Text variant='bodyMedium'>{title}...</Text>
          <Text variant='bodyMedium' style={style.amount}>
            {amount}
          </Text>
        </View>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  textRow: { flexDirection: 'row', alignContent: 'center' },
  amount: { marginLeft: 8, fontWeight: '700' },
});
