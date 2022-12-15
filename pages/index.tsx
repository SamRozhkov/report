import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Layout, Select, Space } from 'antd'
const { Content } =  Layout
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = async (url: any) => await fetch(url).then((res) => res.json());

function LoadData(){
    const { data, error } = useSWR('https://fakerapi.it/api/v1/custom?id=number&name=name', fetcher)

    if (data != undefined){
        return data.data.map((x: any) => (
                {label: x.name, value: x.id })
                )
    }
    else{
        return []
    }
}

export default function Home() {

    const [active, setActive] = useState(true)
    const [organizations, setOrganizations] = useState([])

    const { data, error } = useSWR('https://fakerapi.it/api/v1/custom?id=number&name=name', fetcher)

    useEffect(() => {
        /*const result = LoadData()*/
        /*console.log(result)*/
    })

return (
    <Content
        style={{ padding: 20 }}>
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
