import 'antd/dist/reset.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ConfigProvider, Layout, Menu} from 'antd'
import {useState} from "react";
const {Header, Sider, Content} = Layout;
import Image from 'next/image'
import logo from '../public/logo.svg'
import styles from '../styles/App.module.css'
import { TbReport } from 'react-icons/tb'

export default function App({ Component, pageProps }: AppProps) {

    const [collapsed, setCollapsed] = useState(false)

    return (
            <Layout>
                <Header>
                    <Image src={ logo } alt='Logo' height={52} width={52} className={styles.logo}/>
                </Header>
                <Layout>
                    <Sider
                        collapsible defaultCollapsed={false}
                        >
                        <Menu
                            theme="dark"
                            items={
                                [{
                                    key: 'Reports',
                                    label: 'Отчеты',
                                    icon: <TbReport/>,
                                }]
                            }
                            >
                        </Menu>
                    </Sider>
                    <Content>
                        <Component {...pageProps}/>
                    </Content>
                </Layout>
            </Layout>

            )
}
