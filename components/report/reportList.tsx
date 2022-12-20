import useSWR from 'swr'
import {Layout, Space, Table, Button, Row, Col, Spin} from 'antd'
import { ReportType} from './types'
import {useEffect, useState} from "react";
import { FaTrashAlt } from 'react-icons/fa'
import { BsFillPencilFill } from 'react-icons/bs'
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL

type reportProps = {
    reports?: [ReportType]
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function ReportList () {
    const router = useRouter()
    const [reports, setReports] = useState<[ReportType] | []>([])
    const [loading, setLoading] = useState<boolean>(true)

    const { data, error } = useSWR(API_URL + 'custom?id=number&name=name&description=long_text&_locale=ru_RU', fetcher)

    useEffect(() => {
        if (data) {
            setReports(data.data)
            setLoading(false)
        }
    }, [data])

    return (
            <Spin spinning={loading}>
            <Layout.Content style={{padding: 10}}>
            <Row style={{marginBottom: 20}}>
                <Col offset={20} span={4}>
                    <Button type='primary' onClick={() => {
                        router.push('/admin/reports/create')
                    }}
                        >Добавить отчет</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        size="small"
                        dataSource={reports}
                        columns={[
                        {title: 'Наименование', dataIndex: 'name', key: 'name', width: 150, ellipsis: true},
                        {title: 'Описание', dataIndex: 'description', key: 'description', ellipsis: true},
                        {title: 'Действия', dataIndex: 'actions', width: 100, align: "center",
                        render: (_, record: ReportType) => {
                            return(
                            <Space>
                                <Button type="primary" icon={ <BsFillPencilFill/> } onClick={(e)=> {
                                    router.push('/admin/reports/create',)
                                }} />
                                <Button type="primary" danger icon={ <FaTrashAlt/> } />
                            </Space>
                            )
                        }}
                    ]}></Table>
                </Col>
            </Row>
            </Layout.Content>
            </Spin>
    )
}

export default ReportList