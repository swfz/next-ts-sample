import type { NextPage } from 'next'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

interface Item {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  remark: string;
}
type Column = 'name'|'startTime'|'endTime'|'remark';

// timeline
// デフォルトで24時間分
// スタート時刻を入力の中から最善選べるようにする
// 分単位の切り替え 5,10,30

const Schedule: NextPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const columns: Column[] = ['name', 'startTime', 'endTime', 'remark'];
  const times = [...Array(24 * 60)].map((_, i) => i);
  const [startTime, setStartTime] = useState();

  const addSampleData = () => {
    setItems([
      {
        id: uuid(),
        name: 'aaa',
        startTime: '09:00',
        endTime: '09:05',
        remark: ''
      },
      {
        id: uuid(),
        name: 'bbb',
        startTime: '10:00',
        endTime: '10:05',
        remark: ''
      },
    ])
  }

  const isBetween = (item: Item, time: number) => {
    const [startHour, startMin] = item.startTime.split(':').map(s => parseInt(s));
    const [endHour, endMin] = item.endTime.split(':').map(s => parseInt(s));
    const start = dayjs().hour(startHour).minute(startMin);
    const end = dayjs().hour(endHour).minute(endMin);

    const hour = time / 60;
    const min = time % 60;

    const targetDay = dayjs().hour(hour).minute(min);

    return targetDay.isBetween(start, end) ? "■" : "□";
  }

  const fixHandleInput = (targetItem: Item, column: Column) => {
    return (event: any) => {
      setItems((beforeItems) => {
        const newItems = beforeItems.reduce((acc: Item[], i: Item) => {
          const newItem = i.id === targetItem.id ? {...i, [column]: event?.target?.value} : i;

          return [...acc, newItem]
        }, []);

        return newItems;
      })
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map(column => {
              return <td key={column}>{column}</td>
            })}
            <td>timeline</td>
          </tr>
          <tr>
            {columns.map(column => {
              return <td key={column}></td>
            })}
            <td>
              {times.map(t => {
                if(t % 60 === 0){
                  return t/60
                }
                else {
                  return '□';
                }
              })}
            </td>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            return (
              <tr key={item.id}>
                {columns.map(column => {
                  return <td className={column} key={column}><input key={column} type="text" onChange={fixHandleInput(item,column)} value={item[column]} /></td>
                })}
                <td className="timeline">
                  {times.map(t => {
                    return <span key={t} className="block">{isBetween(item, t)}</span>
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <button onClick={addSampleData}>SampleData</button>
    </>
  )
}


export default Schedule