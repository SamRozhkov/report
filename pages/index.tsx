import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Layout, Select, Space, Divider, Button } from 'antd'
const { Content } =  Layout
import { useState, useEffect } from 'react'
import {useGetReportQuery} from "../services/goodApi";
import { Report } from '../components/types'

export default function Home() {

    const [active, setActive] = useState(true)
    const [organizations, setOrganizations] = useState([])
    const [reports, setReports] = useState<Report[]>([])
    const { data, refetch } = useGetReportQuery()

    useEffect(()=>{
        if (data) {
            const r:Report[] = data.map((e:Report) => {
                return ({label: e.name, value: e.id})
            })
            setReports(r)
        }
    },[data])

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
                options={reports}
            />
            <Button type='primary'>Загрузить</Button>
        </Space>

    </Content>
  )
}
