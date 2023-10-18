import { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Card, IconButton, Text, useTheme } from 'react-native-paper'

import { Product } from '@types'

type ProductCardProps = Product & {
  id: string
  counter: number
  onChangeCounter: (id: string, value: number) => void
  onRemove: (id: string) => void
}

export const ProductCard = memo(function ProductCard({
  id,
  title,
  description,
  images,
  counter,
  onChangeCounter,
  onRemove,
}: ProductCardProps) {
  const theme = useTheme()

  const [mainImage] = images

  const handleAdd = () => onChangeCounter(id, 1)
  const handleReduce = () => onChangeCounter(id, -1)

  const handleRemove = () => onRemove(id)

  return (
    <Card style={styles.card} elevation={3}>
      <Card.Cover
        style={styles.cardCover}
        resizeMode="contain"
        source={{ uri: mainImage }}
      />
      <Card.Title
        title="Title"
        subtitle={title}
        titleStyle={styles.cardTitle}
        subtitleStyle={styles.cardSubtitle}
        titleNumberOfLines={1}
      ></Card.Title>
      <Card.Content>
        <Text
          variant="bodyLarge"
          numberOfLines={3}
          style={styles.descriptionTitle}
        >
          Description:
        </Text>
        <Text variant="bodyMedium" numberOfLines={3}>
          {description}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.buttonsContainer}>
        <Text variant="titleLarge">Number of items: {counter}</Text>
        <View style={styles.row}>
          <Button onPress={handleAdd} mode="contained">
            +
          </Button>
          <Button onPress={handleReduce} mode="outlined">
            -
          </Button>
        </View>
      </Card.Actions>

      <IconButton
        onPress={handleRemove}
        size={36}
        icon="delete-forever"
        style={styles.btnRemove}
        mode="contained"
        containerColor={theme.colors.tertiaryContainer}
        iconColor={theme.colors.tertiary}
      />
    </Card>
  )
})

const styles = StyleSheet.create({
  card: { margin: 8 },
  cardCover: { height: 200 },
  cardTitle: { fontWeight: '700', fontSize: 24 },
  cardSubtitle: { fontWeight: '300', fontSize: 18 },
  descriptionTitle: { fontWeight: '700' },
  btnRemove: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
})
