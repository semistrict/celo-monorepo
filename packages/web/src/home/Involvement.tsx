import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { H2, H4 } from 'src/fonts/Fonts'
import { NameSpaces, useTranslation } from 'src/i18n'
import { Cell, GridRow, Spans } from 'src/layout/GridRow'
import { useScreenSize } from 'src/layout/ScreenSize'
import Button, { BTN, SIZE } from 'src/shared/Button.3'
import menuItems, { hashNav } from 'src/shared/menu-items'
import Navigation, { NavigationTheme } from 'src/shared/Navigation'
import { fonts, standardStyles, textStyles } from 'src/styles'

enum Paths {
  build,
  grow,
  validate,
  partner,
  connect,
  work,
}

const MOVE_Y = {
  [Paths.build]: -15,
  [Paths.grow]: -30,
  [Paths.validate]: -80,
  [Paths.partner]: -140,
  [Paths.connect]: -160,
  [Paths.work]: -180,
}

export default function Involvement() {
  const [currentPath, setPath] = React.useState(Paths.build)

  const { t } = useTranslation(NameSpaces.home)
  const { isMobile } = useScreenSize()

  return (
    <View style={standardStyles.darkBackground}>
      <GridRow
        nativeID={hashNav.home.partnerships}
        desktopStyle={standardStyles.blockMarginBottom}
        tabletStyle={standardStyles.blockMarginBottomTablet}
        mobileStyle={standardStyles.blockMarginBottomMobile}
      >
        <Cell span={Spans.three4th}>
          <Text style={subTitle}>{t('involve.subtitle')}</Text>
          <H2 style={titleStyle}>{t('involve.title')}</H2>
          <View
            style={[
              standardStyles.row,
              styles.controls,
              { transform: [{ translateX: isMobile ? MOVE_Y[currentPath] : MOVE_Y[Paths.build] }] },
            ]}
          >
            <Control setPath={setPath} currentPath={currentPath} path={Paths.build} />
            <Control setPath={setPath} currentPath={currentPath} path={Paths.grow} />
            <Control setPath={setPath} currentPath={currentPath} path={Paths.validate} />
            <Control setPath={setPath} currentPath={currentPath} path={Paths.partner} />
            <Control setPath={setPath} currentPath={currentPath} path={Paths.connect} />
            <Control setPath={setPath} currentPath={currentPath} path={Paths.work} />
          </View>
        </Cell>
      </GridRow>
      <GridRow
        desktopStyle={standardStyles.sectionMarginBottom}
        tabletStyle={standardStyles.sectionMarginBottomTablet}
        mobileStyle={standardStyles.sectionMarginBottomMobile}
      >
        <Content path={currentPath} />
      </GridRow>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
  buttons: {
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
  },
  controls: {
    transitionProperty: 'transform',
    transitionDuration: '300ms',
    justifyContent: 'space-between',
  },
  content: {},
  textArea: {
    minHeight: 120,
  },
  primary: {
    marginRight: 20,
  },
  secondary: {
    paddingVertical: 20,
  },
})

const subTitle = [fonts.h5, textStyles.invert, standardStyles.elementalMargin]
const titleStyle = [standardStyles.blockMarginBottom, textStyles.invert]

interface ControlProps {
  path: Paths
  currentPath: Paths
  setPath: (p: Paths) => void
}

function Control({ path, currentPath, setPath }: ControlProps) {
  const { t } = useTranslation(NameSpaces.home)
  const onPress = React.useCallback(() => setPath(path), [path, setPath])

  return (
    <Navigation
      theme={NavigationTheme.DARKGREEN}
      text={t(`involve.paths.${path}.name`)}
      selected={path === currentPath}
      onPress={onPress}
    />
  )
}

const LINKS = {
  [Paths.build]: {
    primary: 'https://docs.celo.org/v/master/developer-guide/overview/introduction',
    secondary: 'https://www.crowdcast.io/e/celo-tech-talks-part-2',
  },
  [Paths.grow]: {
    primary: 'TODO-LINK?',
    secondary: `${menuItems.COMMUNITY.link}#${hashNav.connect.fund}`,
  },
  [Paths.validate]: {
    primary: 'https://docs.celo.org/getting-started/mainnet/running-a-validator-in-mainnet',
    secondary: 'https://chat.celo.org',
  },
  [Paths.partner]: {
    primary: 'https://medium.com/celoorg/alliance/home',
    secondary: 'https://celo.org/alliance',
  },
  [Paths.connect]: {
    primary: 'https://airtable.com/shrfUJWk1eKfFcZKb',
    secondary: `${menuItems.COMMUNITY.link}#${hashNav.connect.events}`,
  },
  [Paths.work]: {
    primary: menuItems.JOBS.link,
    secondary: `${menuItems.COMMUNITY.link}#${hashNav.connect.fellowship}`,
  },
}

function Content({ path }) {
  const { t } = useTranslation(NameSpaces.home)

  return (
    <>
      {' '}
      <Cell span={Spans.half} tabletSpan={Spans.twoThird} style={styles.root}>
        <View style={styles.content} nativeID={Paths[path]}>
          <H4 style={textStyles.invert}>{t(`involve.paths.${path}.title`)}</H4>
          <Text
            style={[fonts.p, textStyles.invert, standardStyles.elementalMargin, styles.textArea]}
          >
            {t(`involve.paths.${path}.text`)}
          </Text>
          <View style={[standardStyles.row, styles.buttons]}>
            <Button
              kind={BTN.PRIMARY}
              text={t(`involve.paths.${path}.primary`)}
              style={styles.primary}
              href={LINKS[path].primary}
            />
            <Button
              kind={BTN.NAKED}
              text={t(`involve.paths.${path}.secondary`)}
              size={SIZE.normal}
              style={styles.secondary}
              href={LINKS[path].secondary}
            />
          </View>
        </View>
      </Cell>
    </>
  )
}
