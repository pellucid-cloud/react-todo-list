let timer: NodeJS.Timeout;
export type TimerProps = {
  type: 'start' | 'close' | 'finish',
  timeout?: number,
}

function clearTimer() {
  if (timer) clearTimeout(timer);
}

const handleMap: Record<string, (props?: TimerProps) => void> = {
  'start': ({timeout}: TimerProps) => {
    if (!timeout) return
    clearTimer()
    timer = setTimeout(() => {
      self.postMessage({
        type: 'finish'
      })
    }, timeout);
  },
  'close': () => {
    clearTimer()
  }
}
self.addEventListener('message', function (event: MessageEvent<TimerProps>) {
  const {type} = event.data;
  handleMap[type] && handleMap[type](event.data);
})
