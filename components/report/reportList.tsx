import useSWR from 'swr'
import {Layout, Space, Table, Button, Row, Col, Spin, Typography, Modal, Divider} from 'antd'
import { Report} from '../types'
import {useEffect, useState} from "react";
import { FaTrashAlt } from 'react-icons/fa'
import { BsFillPencilFill } from 'react-icons/bs'
import { AiOutlineConsoleSql } from 'react-icons/ai'
import { useRouter } from "next/router";
import { useGetReportQuery, useDeleteReportMutation } from "../../services/goodApi";
const { Title } = Typography
const { confirm } = Modal
import { ExclamationCircleFilled } from '@ant-design/icons';

/*const API_URL = process.env.NEXT_PUBLIC_API_URL*/

type reportProps = {
    reports?: [Report]
}

export function ReportList () {
    const router = useRouter()
    const [reports, setReports] = useState<[Report] | []>([])

    const [removeReport] = useDeleteReportMutation()
    const { data, isError, isSuccess, isLoading, refetch } = useGetReportQuery(1)

    const DeleteReport = async(id) => {
        removeReport(id)
        refetch()
    }

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Вы дейстивтельно хотите удалить Отчет?',
            icon: <ExclamationCircleFilled />,
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                DeleteReport(id)
                },
            onCancel() {

                },
        })
    }

    useEffect(() => {
        if (data) {
            setReports(data)
        }
    }, [data])

    useEffect(() => {
        refetch()
    },[])

    return (
            <Spin spinning={isLoading}>
            <Layout.Content style={{padding: 10}}>
                <Divider orientation="left">Отчеты</Divider>
  
            <Row style={{marginBottom: 20}}>
                <Col offset={20} span={4}>
                    <Button type='primary' onClick={() => {
                        router.push({
                            pathname: '/admin/reports/create',
                        })
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
                        {title: 'Действия', dataIndex: 'actions', width: 150, align: "center",
                            render: (_, record: Report) => {
                            return(
                                    <Space>
                                        <Button type="primary" icon={ <BsFillPencilFill/> } onClick={(e)=> {
                                            router.push({
                                                pathname:'/admin/reports/[id]',
                                                query: {"id": record.id}
                                            })
                                        }} />
                                        <Button type="primary" danger icon={ <FaTrashAlt/> } onClick={(e) =>{
                                            showDeleteConfirm(record.id)
                                        }}/>
                                        <Button type="ghost" icon = { <AiOutlineConsoleSql/> }/>
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