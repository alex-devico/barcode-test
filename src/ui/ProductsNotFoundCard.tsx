import { StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'

export function ProductsNotFoundCard() {
  return (
    <Card style={styles.errorCard} elevation={3}>
      <Card.Title title="Some products not found" />
    </Card>
  )
}

const styles = StyleSheet.create({
  errorCard: { margin: 8 },
})
