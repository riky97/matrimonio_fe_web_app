import React from 'react'

import "./BottomNavbar.css"
import { Button, Flex } from 'antd'
import { AimOutlined, HomeFilled } from '@ant-design/icons'


interface IBottomNavbarProps { }

function BottomNavbar(props: IBottomNavbarProps) {

    return (
        <div>
            <Flex justify='space-between' align='center' className='bottom_navbar_container'>
                <HomeFilled style={{ fontSize: 32 }} />
                <p style={{ fontSize: 32 }}>titolo</p>
                <AimOutlined style={{ fontSize: 32 }} />
            </Flex>
        </div>
    )
}

export default BottomNavbar