import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { MD3Colors } from 'react-native-paper/lib/typescript/types'

type WarningCartProps = {
  text: string
  btnText: string
  onPress: () => void
}

export function WarningCart({ text, btnText, onPress }: WarningCartProps) {
  const { colors } = useTheme()
  const style = useMemo(() => styles(colors), [colors])

  return (
    <View style={style.warningContainer}>
      <Text variant="headlineSmall" style={style.warningText}>
        {text}
      </Text>
      <Button
        style={style.styledBtn}
        onPress={onPress}
        mode="outlined"
        textColor={colors.secondary}
      >
        {btnText}
      </Button>
    </View>
  )
}

const styles = (colors?: MD3Colors) =>
  StyleSheet.create({
    styledBtn: {
      borderColor: colors?.secondary,
    },
    warningContainer: {
      backgroundColor: colors?.secondaryContainer,
      padding: 24,
    },
    warningText: {
      marginBottom: 24,
      color: colors?.secondary,
    },
  })
