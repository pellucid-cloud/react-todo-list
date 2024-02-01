import {ModalFunc} from "antd/es/modal/confirm"
import {FunctionComponent, ReactNode} from "react"
import {HookAPI} from "antd/es/modal/useModal"
import {ModalFuncProps} from "antd"

export type ModelContentProps<T> = {
  close: () => void,
  initial?: T
}
export type ModelConfigProps<T> = {
  modal: HookAPI,
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm',
  title: string,
  icon?: ReactNode,
  Content: FunctionComponent<ModelContentProps<T>> | ReactNode | string,
  onSuccess?: (arg?: T) => void,
  onClose?: () => void
}
export type ModalOperatorType<T> = {
  open: (arg?: T) => void,
  close: () => void
}

export function useModel<T>(config: ModelConfigProps<T>): ModalOperatorType<T> {
  const {
    modal,
    type = 'confirm',
    title,
    icon,
    Content,
    onSuccess,
    onClose
  } = config
  let instance: ReturnType<ModalFunc>;

  function close() {
    instance.destroy();
  }

  const model = {
    open(arg?: T) {
      const isFunctionComponent = typeof Content === 'function';
      const content = isFunctionComponent ? <Content initial={arg} close={close}/> : Content;
      const props: ModalFuncProps = {
        title,
        content,
        onOk: () => onSuccess && onSuccess(arg),
        onCancel: onClose,
        icon,
        zIndex: 1000
      }
      if (isFunctionComponent) props.footer = null
      instance = modal[type](props)
    },
    close
  }

  return model
}
