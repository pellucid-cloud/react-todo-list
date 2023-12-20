import { List as AntdList, Empty } from 'antd'
import { ReactNode } from 'react'

type ListProps<T> = {
  dataSource: T[],
  renderItem: (item: T, index: number) => ReactNode,
  header: string | ReactNode,
  empty?: string
}
export default function List<T extends {id: string}>({ dataSource, renderItem, header, empty }: ListProps<T>) {
  const pagination = {
    pageSize: 10,
  }
  const local = {
    emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={empty || "今日无事，勾栏听曲"} />,
  }
  return (
    <AntdList
      pagination={pagination}
      rowKey='id'
      size="large"
      locale={local}
      className="list"
      header={header}
      bordered
      dataSource={dataSource}
      renderItem={renderItem}
    />
  )
}