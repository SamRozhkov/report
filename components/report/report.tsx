import useSWR from 'swr'
import { Layout, Space, Table, Button, Row, Col} from 'antd'
import { ReportType} from './types'
import {useEffect, useState} from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL

type reportProps = {
    reports?: [ReportType]
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function Report () {

    const [reports, setReports] = useState([])

    const { data, error } = useSWR(API_URL + 'custom?id=number&name=name&description=long_text', fetcher)

    if (!data) return <div>Loading...</div>

    /*useEffect(() => {

        setReports(data.data)
    },[])*/

    return (
            <Layout.Content style={{padding: 10}}>
            <Row>
                <Col span={24}>
                    <Button type='primary'
                        >Добавить отчет</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        dataSource={data.data}
                        columns={[
                        {title: 'name', dataIndex: 'name', key: 'name', filtered: true},
                        {title: 'description', dataIndex: 'description', key: 'description'}
                    ]}></Table>
                </Col>
            </Row>
            </Layout.Content>
    )
}

export default Report