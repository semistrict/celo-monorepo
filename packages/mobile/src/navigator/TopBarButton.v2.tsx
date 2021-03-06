import Touchable from '@celo/react-components/components/Touchable'
import colors from '@celo/react-components/styles/colors.v2'
import fontStyles from '@celo/react-components/styles/fonts.v2'
import variables from '@celo/react-components/styles/variables'
import * as React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import CeloAnalytics from 'src/analytics/CeloAnalytics'
import { CustomEventNames } from 'src/analytics/constants'

interface CommonProps {
  disabled?: boolean
  testID?: string
  onPress: () => void
  eventName?: CustomEventNames
}

type WrapperProps = CommonProps & {
  children: JSX.Element
}

function Wrapper({ eventName, onPress, disabled, testID, children }: WrapperProps) {
  const onPressLocal = React.useCallback(() => {
    if (eventName) {
      CeloAnalytics.track(eventName)
    }
    onPress()
  }, [onPress, eventName])

  return (
    <Touchable
      disabled={disabled}
      testID={testID}
      onPress={onPressLocal}
      borderless={true}
      hitSlop={variables.iconHitslop}
    >
      {children}
    </Touchable>
  )
}

export type TopBarIconButtonProps = CommonProps & {
  icon: JSX.Element
}

export function TopBarIconButton(props: TopBarIconButtonProps) {
  return <Wrapper {...props}>{props.icon}</Wrapper>
}

export type TopBarTextButtonProps = CommonProps & {
  title: string
  titleStyle?: StyleProp<TextStyle>
}

export function TopBarTextButton(props: TopBarTextButtonProps) {
  const { titleStyle, title } = props
  return (
    <Wrapper {...props}>
      <Text style={titleStyle ? [styles.text, titleStyle] : styles.text}>{title}</Text>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  text: {
    ...fontStyles.regular,
    color: colors.greenUI,
    paddingHorizontal: 16,
  },
})
