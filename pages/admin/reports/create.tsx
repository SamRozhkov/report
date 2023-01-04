import {Report} from "../../../components/types";
import { Button, Input} from 'antd'
import { useRouter } from "next/router";
import {usePostReportMutation} from "../../../services/goodApi";
import { useState, useEffect} from "react";
import { Layout, Space, Row, Col } from 'antd'
import { Typography } from 'antd'
const { Title } = Typography

function Report(){
    const router = useRouter()
    const [addProduct, isError] =  usePostReportMutation()
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>()

    const saveReport = async () =>{
        const data: Report = {
            name: name,
            description: description
        }
        await addProduct(data)
        router.back()
    }

    return (
            <Layout.Content style={{padding: 10}}>
                <Row>
                    <Col>
                        <Title level={3}>Добавить отчет</Title>
                    </Col>
                </Row>
                <Row style={{marginBottom: 20}}>
                    <Col span={24}>
                        <Input placeholder='Наименование' onChange= {(e) => setName(e.target.value)} required/>
                    </Col>
                </Row>
                <Row style={{marginBottom: 20}}>
                    <Col span={24}>
                        <Input.TextArea placeholder='Описание' row={4} onChange={(e) => setDescription(e.target.value)} />
                    </Col>
                </Row>
                <Space>
                    <Button type='primary' disabled={ name == '' ? true : false } onClick={() => {
                        saveReport()
                    }}>Сохранить</Button>

                    <Button onClick={() => {
                        router.back()
                    }}>Отмена</Button>
                </Space>
            </Layout.Content>
    )
}

export default Report