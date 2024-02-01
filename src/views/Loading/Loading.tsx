import styled from "styled-components";
import {COLORS} from "@/theme/colors";
import {hexToRgba} from "@/utils/colors";

type LoadingProps = {
  $count?: number,
  $ballSize?: number,
  $containerSize?: number,
  $aniDuration?: number
}
export default function Loading(props: LoadingProps) {
  const {
    $ballSize = 12,
    $count = 36,
    $aniDuration = 2000,
    $containerSize = 150
  } = props
  return (
    <Wrapper className="loading" $ballSize={$ballSize} $count={$count} $aniDuration={$aniDuration}
             $containerSize={$containerSize}>
      {new Array($count).fill(0).map((_, index) => {
        return <div className="dot" key={index}></div>
      })}
    </Wrapper>
  )
}

function generateSelector({$count, $containerSize, $aniDuration}: LoadingProps) {
  const pdeg = 360 / $count;
  const opacityStep = 1 / $count;
  const fn = (x) => Math.abs(Math.sin(9 * x));
  return new Array($count).fill(0).map((_, i) => {
    const index = i + 1
    return `
      .dot:nth-child(${index}){
        transform: rotate(${pdeg * index}deg) translateY(-${$containerSize / 2}px);
      }
      .dot:nth-child(${index})::before, .dot:nth-child(${index})::after {
        animation-delay: -${$aniDuration / $count * 6 * index}ms
      }
      .dot:nth-child(${index})::before {
        background-color: ${hexToRgba(COLORS.headerBg, fn(index * opacityStep))}
      }
      .dot:nth-child(${index})::after {
        background-color: ${hexToRgba(COLORS.vitality, fn(index * opacityStep))}
      }
    `
  }).join('\n')
}

const Wrapper = styled.div<{ $ballSize: number, $containerSize: number, $aniDuration: number, $count: number }>`
  height: 100%;

  .dot {
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${props => props.$ballSize}px;
    height: ${props => props.$ballSize}px;
    margin-left: ${props => props.$ballSize / 2}px;
    margin-top: ${props => props.$ballSize / 2}px;
    perspective: 70px;
    transform-style: preserve-3d;
  }

  .dot::before, .dot::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .dot::before {
    top: -100%;
    animation: moveBlack ${props => props.$aniDuration}ms infinite;
  }

  .dot::after {
    top: 100%;
    animation: moveWhite ${props => props.$aniDuration}ms infinite;
  }

  ${generateSelector} @keyframes moveBlack {
    0% {
      animation-timing-function: ease-in;
    }

    25% {
      animation-timing-function: ease-out;
      transform: translate3d(0, 100%, ${props => props.$ballSize}px);
    }

    50% {
      animation-timing-function: ease-in;
      transform: translate3d(0, 200%, 0);
    }

    75% {
      animation-timing-function: ease-out;
      transform: translate3d(0, 100%, -${props => props.$ballSize}px);
    }
  };

  @keyframes moveWhite {
    0% {
      animation-timing-function: ease-in;
    }

    25% {
      animation-timing-function: ease-out;
      transform: translate3d(0, -100%, -${props => props.$ballSize}px);
    }

    50% {
      animation-timing-function: ease-in;
      transform: translate3d(0, -200%, 0);
    }

    75% {
      animation-timing-function: ease-out;
      transform: translate3d(0, -100%, ${props => props.$ballSize}px);
    }
  }
`
