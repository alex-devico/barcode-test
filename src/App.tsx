import 'react-native-reanimated'

import { DefaultTheme, PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import NavigationProvider from '@app/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={DefaultTheme}>
        <SafeAreaProvider>
          <NavigationProvider />
        </SafeAreaProvider>
      </PaperProvider>
    </QueryClientProvider>
  )
}

export default App
