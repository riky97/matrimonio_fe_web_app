import { Button, Col, Form, Input, List, Modal, Row, Space, Spin, Table } from 'antd'
import Column from 'antd/es/table/Column';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import React, { useEffect, useState } from 'react'
import { dbRef } from '../../firebase';
import { child, get } from 'firebase/database';
import { HouseDescriptionModel } from '../../utils/Models';
import ModalGestioneCasate from '../../components/ModalGestioneCasate/ModalGestioneCasate';

type ManageHousesProps = {}

export interface IModalGestione {
    open: boolean;
    record?: HouseDescriptionModel
}

function ManageHouses(props: ManageHousesProps) {
    const [dataSource, setDataSource] = useState<HouseDescriptionModel[]>([])
    const [spinning, setSpinning] = useState<boolean>(true);

    const [modalPartecipants, setModalPartecipants] = useState<IModalGestione>({ open: false, record: new HouseDescriptionModel() });
    const [modalModifica, setModalModiifica] = useState<IModalGestione>({ open: false, record: new HouseDescriptionModel() });



    useEffect(() => {
        const fecthInitalData = async () => {
            try {
                const data = await get(child(dbRef, `/houseDescription`));
                console.log("data", data.val());
                setDataSource(data.val())
            } catch (error) {
                console.log("error", error);
            }
            finally {
                setSpinning(false)
            }
        };

        fecthInitalData();
    }, []);

    function onClickPartceipanti(record: HouseDescriptionModel) {
        console.log('record', record)
        setModalPartecipants({
            open: true,
            record
        })
    }

    return (
        <>
            <Spin spinning={spinning} tip="Loading" size="large" fullscreen />
            <div style={{ padding: "10px 10px" }}>
                <Row className='mt-50'>
                    <Col>
                        <h1 style={{ fontFamily: "sans-serif" }}>Gestione Casate più partecipanti</h1>
                    </Col>
                </Row>

                <Row className='mt-50 d-flex justify-content-center'>
                    <Col sm={20}>
                        <Table dataSource={dataSource}>
                            <Column title="Titolo" dataIndex="title" key="title" />
                            <Column title="Descrizione" dataIndex="description" key="description" />
                            <Column
                                title="Partecipanti"
                                key="partecipants"
                                render={(_: any, record: HouseDescriptionModel) => (
                                    <Button onClick={() => onClickPartceipanti(record)}> Visualizza partecipanti</Button>
                                )}
                            />
                            <Column
                                title="Action"
                                key="action"
                                render={(_: any, record: HouseDescriptionModel) => (
                                    <Space size="middle">
                                        <Button type='primary' onClick={() => setModalModiifica({ open: true, record })}> Modifica</Button>
                                        <Button type='default' danger onClick={() => onClickPartceipanti(record)}> Elimina</Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </Col>
                </Row>
            </div>

            <ModalGestioneCasate modalGestioneCasate={modalModifica} setModalGestioneCasate={setModalModiifica} />

            <Modal
                title={"Partecipanti al tavolo " + modalPartecipants.record.title}
                width={1000}
                centered
                open={modalPartecipants.open}
                onOk={() => { }}
                onCancel={() => setModalPartecipants({ open: false, record: new HouseDescriptionModel() })}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={modalPartecipants.record.participants}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<label>{index + 1 + ". " + item.name + " " + item.surname}</label>}
                            />
                        </List.Item>
                    )}
                />
            </Modal>

        </>

    )
}

export default ManageHouses