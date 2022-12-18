import { FC } from 'react'
import { Layout, Space, Table, Button} from 'antd'
import { Report } from './types'
import { GetServerSideProps } from "next";

type reportProps = {
    reports: [Report]
}

const Report:FC<reportProps> = ({ reports }) => {
    return (
            <Layout.Content style={{ padding: 5 }}>
            <Space>
                <Button type='primary'
                    >Добавить отчет</Button>
                <Table
                    dataSource={reports}
                    ></Table
>
            </Space>
        </Layout.Content>
    )
}

export const getServerSideProps:GetServerSideProps = async() => {
    const api = process.env.API_URL
    const res = await fetch(api + `custom?id=number&name=name&description=name`)
    const reports = await res.json()

    console.log(reports)

    return { props: { reports } }
}

export {
    Report
}