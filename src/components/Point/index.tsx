import styled from "styled-components"

export type PointProps = {
  color: string,
  width?: number,
  height?: number,
  className?: string
}

export default function Point(props: PointProps) {
  const {
    color,
    width = 20,
    height = 20,
    className
  } = props
  return (
    <Wrapper className={`point ${className}`} color={color} width={width} height={height}/>
  )
}

const Wrapper = styled.div<{ color: string, width: number, height: number }>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
