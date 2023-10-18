import { PropsWithChildren } from 'react'

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'

import { BottomNavBar } from './BottomNavbar'

export default function NavigationProvider({
  children,
}: PropsWithChildren<{}>) {
  const navigationRef = useNavigationContainerRef()

  return (
    <NavigationContainer ref={navigationRef}>
      {children}
      <BottomNavBar />
    </NavigationContainer>
  )
}
