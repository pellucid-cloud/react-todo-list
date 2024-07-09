let timer: NodeJS.Timeout;
export type TimerProps = {
  type: 'start' | 'close' | 'finish',
  timeout?: number,
}

function clearTimer() {
  if (timer) clearTimeout(timer);
}

const handleMap: Record<string, (props?: TimerProps) => void> = {
  'start': (timerProps) => {
    if (!timerProps) return;
    const timeout = timerProps?.timeout || 0
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
