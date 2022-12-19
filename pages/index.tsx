import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Layout, Select, Space, Divider } from 'antd'
const { Content } =  Layout
import { useState, useEffect } from 'react'

export default function Home({ data1 }) {

    const [active, setActive] = useState(true)
    const [organizations, setOrganizations] = useState([])

return (
    <Content
        style={{ padding: 5 }}>
        <Divider orientation="left">Настройки</Divider>
        <Space>
            <Select mode='multiple'
                placeholder='Организация'
                maxTagCount={"responsive"}
                style={{ width: 250 }}
                onSelect={(e, option) => {console.log(option)}}
                onClear={() => {console.log('clear')}}
                onDeselect={(e, option) => {console.log(option)}}
                onChange={(e: any, o: Array<Select.Option>) => {
                    o.length == 0 ? setActive(true) : setActive(false)
                }}
                options={[
                    {label: 'Аппарат Губернатора', value: 1},
                    {label: 'Счетная палата', value: 2},
                ]}
            />

            <Select
                placeholder='Отчет'
                style={{ width: 250 }}
                disabled={ active }
            />
        </Space>

    </Content>
  )
}

export async function getServerSideProps(){
    const api = process.env.NEXT_PUBLIC_API_URL
    const res = await fetch(api + `custom?id=number&name=name`)
    const data1 = await res.json()

    /*console.log(data1)*/

    return { props: { data1 } }
}
