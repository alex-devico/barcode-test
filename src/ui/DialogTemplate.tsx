import { Button, Dialog, Portal, Text } from 'react-native-paper'

type DialogTemplateProps = {
  isVisible: boolean
  onDismiss: () => void
  title: string
  bodyText?: string
  body?: React.ReactNode
  btnText: string
  onBtnPress: () => void
}

export function DialogTemplate({
  isVisible,
  onDismiss,
  title,
  body,
  bodyText,
  btnText,
  onBtnPress,
}: DialogTemplateProps) {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {body ? body : <Text variant="bodyMedium">{bodyText}</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onBtnPress}>{btnText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
