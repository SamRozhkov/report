import 'antd/dist/reset.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider, Layout, Menu, Typography } from 'antd'
import {useEffect, useState} from "react";
const { Header, Sider, Content, Footer } = Layout;
import Image from 'next/image'
import logo from '../public/logo.svg'
import styles from '../styles/App.module.css'
import { TbReport } from 'react-icons/tb'
import { RiAdminLine } from 'react-icons/ri'
import { useRouter } from "next/router";

import { store } from '../services/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    return (
        <Provider store={store}>
            <Layout>
                <Header style={{ display: 'inline-flex' }}>
                    <Image src={ logo } alt='Logo' height={52} width={52} className={styles.logo} priority={true} />
                    <h1 className={ styles.textLogo } >ARService</h1>
                </Header>

                <Layout style={{ height: '100vh' }}>
                    <Sider
                        collapsible defaultCollapsed={false}
                        >
                        <Menu
                            theme="dark"
                            mode="inline"
                            items={
                                [{
                                    key: 'index',
                                    label: 'Отчеты',
                                    icon: <TbReport/>,
                                    onClick:  () => { router.push('/') }
                                },{
                                    key: 'test',
                                    label: "Test",
                                    icon: <TbReport/>,
                                    onClick:  () => { router.push('/test') }
                                },{
                                    key: 'admin',
                                    label: "Администрирование",
                                    icon: <RiAdminLine/>,
                                    children: [{
                                        key:'users',
                                        label: 'Пользователи',
                                        onClick: () => { router.push('/admin/users/') }
                                    },{
                                        key: 'roles',
                                        label: 'Роли',
                                        onClick: () => { router.push('/admin/roles/') }
                                    },{
                                        key: 'reports',
                                        label: "Отчеты",
                                        onClick: () => { router.push('/admin/reports/') }
                                    }]
                                }]
                            }
                            >
                        </Menu>
                    </Sider>
                    <Content>
                        <Component {...pageProps}/>
                    </Content>
                </Layout>
                <Footer></Footer>
            </Layout>
        </Provider>
        )
}
