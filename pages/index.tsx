import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Layout, Select, Space } from 'antd'
const { Content } =  Layout

export default function Home() {

  return (
    <Content
        style={{ padding: 20 }}>
        <Space>
            <Select mode='multiple'
                placeholder='Организация'
                style={{ width: 250 }}
                onSelect={(e, option) => {console.log(option)}}
                options={[
                    {label: 'asd', value: 1},
                    {label: 'asd', value: 2},
                ]}
            />

            <Select
                placeholder='Отчет'
                style={{ width: 250 }}

            />
        </Space>
    </Content>
  )
}
