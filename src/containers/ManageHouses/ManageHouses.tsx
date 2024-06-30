import { Button, Col, List, Modal, Row, Space, Spin, Table } from "antd";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import { dbRef } from "../../firebase";
import { child, get } from "firebase/database";
import { HouseDescriptionModel } from "../../utils/Models";
import ModalGestioneCasate from "../../components/ModalGestioneCasate/ModalGestioneCasate";

type ManageHousesProps = {};

export interface IModalGestione {
    open: boolean;
    record?: HouseDescriptionModel;
    index?: number;
}

function ManageHouses(props: ManageHousesProps) {
    const [dataSource, setDataSource] = useState<HouseDescriptionModel[]>([]);
    const [spinning, setSpinning] = useState<boolean>(true);

    const [modalPartecipants, setModalPartecipants] = useState<IModalGestione>({ open: false, record: new HouseDescriptionModel() });
    const [modalGestioneCasate, setModalGestioneCasate] = useState<IModalGestione>({ open: false, record: new HouseDescriptionModel() });

    useEffect(() => {
        const fecthInitalData = async () => {
            try {
                const data = await get(child(dbRef, `/houseDescription`));
                console.log("data", data.val());
                setDataSource(data.val());
            } catch (error) {
                console.log("error", error);
            } finally {
                setSpinning(false);
            }
        };

        fecthInitalData();
    }, []);

    function onClickPartceipanti(record: HouseDescriptionModel) {
        console.log("record", record);
        setModalPartecipants({
            open: true,
            record,
        });
    }

    function onClickOpenModalGestioneCasate(record: HouseDescriptionModel, index: number) {
        console.log("record", record);
        console.log("index", index);
        setModalGestioneCasate({ open: true, record, index });
    }

    return (
        <>
            <Spin spinning={spinning} tip="Loading" size="large" fullscreen />
            <div style={{ padding: "10px 10px" }}>
                <Row className="mt-50">
                    <Col>
                        <h1 style={{ fontFamily: "sans-serif" }}>Gestione Casate più partecipanti</h1>
                    </Col>
                </Row>

                <Row className="mt-50 d-flex justify-content-center">
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
                                render={(_: any, record: HouseDescriptionModel, index: number) => (
                                    <Space size="middle">
                                        <Button type="primary" onClick={() => onClickOpenModalGestioneCasate(record, index)}>
                                            Modifica
                                        </Button>
                                        <Button type="default" danger onClick={() => onClickPartceipanti(record)}>
                                            Elimina
                                        </Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </Col>
                </Row>
            </div>

            <ModalGestioneCasate modalGestioneCasate={modalGestioneCasate} setModalGestioneCasate={setModalGestioneCasate} />

            <Modal
                title={"Partecipanti al tavolo " + modalPartecipants.record.title}
                width={1000}
                centered
                open={modalPartecipants.open}
                onOk={() => {}}
                onCancel={() => setModalPartecipants({ open: false, record: new HouseDescriptionModel() })}
            >
                <div className="d-flex justify-content-end">
                    <Button>Aggiungi partecipanti</Button>
                </div>

                <List
                    itemLayout="horizontal"
                    dataSource={modalPartecipants.record.participants}
                    renderItem={(item, index) => (
                        <List.Item key={index} actions={[<a href="/">Modifica</a>, <a href="/">Rimuovi</a>]}>
                            <List.Item.Meta title={<label>{index + 1 + ". " + item.name + " " + item.surname}</label>} />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
}

export default ManageHouses;
