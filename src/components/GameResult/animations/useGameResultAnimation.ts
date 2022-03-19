import React from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import useDesign from '../../../hooks/useDesign'
import { AppTitles } from '../../../lib/titles'
import { useAppSelector } from '../../../store/hooks'

type MoveTypes = {
  player: string
  playerSelection: string
  flipped: boolean
  shared: number
  score: number
}[]

const useGameResultAnimation = () => {
  const { t } = useDesign()

  const {
    userPlay,
    compPlay,
    score,
    result: RESULT_TITLE,
    selectedMoveBg,
    moveVisible,
    username: YOU_TITLE,
  } = useAppSelector((state) => state.game)

  const youTitle = t(YOU_TITLE)
  const compTitle = t(AppTitles.COMP_TITLE)
  const resultTitle = t(RESULT_TITLE)

  const move = useSharedValue(0)
  const zindex = useSharedValue(0)
  const scale = useSharedValue(0)
  const text = useSharedValue(1)

  const moveSelections: MoveTypes = [
    {
      player: youTitle,
      playerSelection: userPlay,
      flipped: true,
      shared: selectedMoveBg.user,
      score: score.user,
    },
    {
      player: compTitle,
      playerSelection: compPlay,
      flipped: false,
      shared: selectedMoveBg.comp,
      score: score.comp,
    },
  ]

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: move.value,
      zIndex: zindex.value,
      transform: [{ scale: scale.value }],
    }
  }, [])

  const rTextStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: text.value }] }
  }, [])

  React.useEffect(() => {
    if (moveVisible) {
      move.value = withDelay(20, withTiming(1))
      scale.value = withDelay(20, withTiming(1))
      zindex.value = withDelay(20, withTiming(2))
      text.value = withRepeat(
        withSequence(
          withTiming(1.5, { duration: 500, easing: Easing.ease }),
          withTiming(1.3, { duration: 500, easing: Easing.ease }),
        ),
        -1,
        true,
      )
    } else {
      scale.value = withDelay(170, withTiming(0))
      move.value = withDelay(170, withTiming(0))
      zindex.value = withDelay(170, withTiming(0))
      text.value = withDelay(170, withTiming(0))
    }
  }, [moveVisible])

  return { rStyle, rTextStyle, moveSelections, resultTitle }
}

export default useGameResultAnimation
