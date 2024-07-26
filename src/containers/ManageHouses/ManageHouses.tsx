import { Button, Col, Row, Space, Spin, Table } from "antd";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import { dbRef } from "../../firebase";
import { child, get } from "firebase/database";
import { HouseDescriptionModel, ParticipantModel } from "../../utils/Models";
import ModalGestioneCasate from "../../components/ModalGestioneCasate/ModalGestioneCasate";
import ModalPartecipantiTavolo from "../../components/ModalPartecipantiTavolo/ModalPartecipantiTavolo";

type ManageHousesProps = {};

export interface IModalGestione {
    open: boolean;
    record?: HouseDescriptionModel;
    index?: number;
    item?: ParticipantModel
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
                setDataSource(data.val());
            } catch (error) {
                console.log("error", error);
            } finally {
                setSpinning(false);
            }
        };

        fecthInitalData();
    }, []);

    function onClickPartceipanti(record: HouseDescriptionModel, index: number) {
        setModalPartecipants({
            open: true,
            record,
            index
        });
    }

    function onClickOpenModalGestioneCasate(record: HouseDescriptionModel, index: number) {
        setModalGestioneCasate({ open: true, record, index });
    }

    return (
        <>
            <Spin spinning={spinning} tip="Loading" size="large" fullscreen />
            <Button style={{ margin: "30px 20px 0" }} type="primary" onClick={() => window.open("/", "_self")}>Torna alla home</Button>
            <div style={{ padding: "10px 10px" }}>
                <Row className="mt-20">
                    <Col>
                        <h1 style={{ fontFamily: "sans-serif" }}>Gestione Casate più partecipanti</h1>
                    </Col>
                </Row>

                <Row className="mt-50 d-flex justify-content-center">
                    <Col sm={20}>
                        <Table dataSource={dataSource} pagination={{ pageSize: dataSource.length }}>
                            <Column title="Titolo" dataIndex="title" key="title" />
                            <Column title="Descrizione" dataIndex="description" key="description" />
                            <Column
                                title="Partecipanti"
                                key="partecipants"
                                render={(_: any, record: HouseDescriptionModel, index: number) => (
                                    <Button onClick={() => onClickPartceipanti(record, index)}> Visualizza partecipanti</Button>
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
                                    </Space>
                                )}
                            />
                        </Table>
                    </Col>
                </Row>
            </div>

            <ModalGestioneCasate modalGestioneCasate={modalGestioneCasate} setModalGestioneCasate={setModalGestioneCasate} />

            <ModalPartecipantiTavolo modalPartecipants={modalPartecipants} setModalPartecipants={setModalPartecipants} />

        </>
    );
}

export default ManageHouses;
