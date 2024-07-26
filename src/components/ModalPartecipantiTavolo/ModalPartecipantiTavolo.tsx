import { Button, List, Modal } from "antd";
import React, { useState } from "react";
import { HouseDescriptionModel, ParticipantModel } from "../../utils/Models";
import { IModalGestione } from "../../containers/ManageHouses/ManageHouses";
import { DataSnapshot, child, get, update } from "firebase/database";
import { dbRef } from "../../firebase";
import ModalAggiungiPartecipanti from "./ModalAggiungiPartecipanti";
import { modalError, modalSuccess } from "../../utils/Functions";
import ModalModficaPartecipanti from "./ModalModficaPartecipanti";

type ModalPartecipantiTavoloProps = {
    modalPartecipants: IModalGestione;
    setModalPartecipants: React.Dispatch<React.SetStateAction<IModalGestione>>;
};

function ModalPartecipantiTavolo(props: ModalPartecipantiTavoloProps) {
    const [modalAggiungiPartecipanti, setModalAggiungiPartecipanti] = useState<IModalGestione>({ open: false, record: new HouseDescriptionModel() });
    const [modalModificaPartecipanti, setModalModificaPartecipanti] = useState<IModalGestione>({ open: false, record: new HouseDescriptionModel() });

    function openModalAddParticipantsInHouses(index: number) {
        setModalAggiungiPartecipanti({
            index,
            open: true,
            record: props.modalPartecipants.record,
        });
    }

    function openModalModificaParticipant(item: ParticipantModel, index: number) {
        setModalModificaPartecipanti({
            index,
            open: true,
            item,
            record: props.modalPartecipants.record,
        });
    }

    async function deleteParticipantFromHouses(item: ParticipantModel, index: number) {
        try {
            const snapshot: DataSnapshot = await get(child(dbRef, `/houseDescription/${props.modalPartecipants.index}/participants`));
            let data: ParticipantModel[] = snapshot.val();
            data.splice(index, 1);
            const updates: { [key: string]: ParticipantModel[] } = {};
            updates[`/houseDescription/${props.modalPartecipants.index}/participants`] = data;
            await update(dbRef, updates);

            modalSuccess({
                title: `Eliminazione riuscita`,
                content: "",
                onOk: () => window.location.reload(),
            });
        } catch (error) {
            console.log("error", error);
            modalError({
                title: `Eliminazione non riuscita`,
                content: "",
            });
        }
    }

    return (
        <>
            <Modal
                title={"Partecipanti al tavolo " + props.modalPartecipants.record.title}
                width={1000}
                centered
                open={props.modalPartecipants.open}
                onOk={() => { }}
                onCancel={() => props.setModalPartecipants({ open: false, record: new HouseDescriptionModel() })}
            >
                <div className="d-flex justify-content-end">
                    <Button onClick={() => openModalAddParticipantsInHouses(props.modalPartecipants.index)}>Aggiungi partecipanti</Button>
                </div>

                <List
                    itemLayout="horizontal"
                    dataSource={props.modalPartecipants.record.participants}
                    renderItem={(item, index) => (
                        <List.Item
                            key={index}
                            actions={[
                                <Button type="primary" onClick={() => openModalModificaParticipant(item, index)}>
                                    Modifica
                                </Button>,
                                <Button
                                    type="default"
                                    danger
                                    onClick={() => {
                                        Modal.info({
                                            title: `Sei sicuro di voler eliminare l'utente ${item.name} ${item.surname}`,
                                            content: "",
                                            onOk: () => deleteParticipantFromHouses(item, index),
                                            maskClosable: true,
                                        });
                                    }}
                                >
                                    Elimina
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta title={<label>{index + 1 + ". " + item.name + " " + item.surname}</label>} />
                        </List.Item>
                    )}
                />
            </Modal>

            <ModalAggiungiPartecipanti modalAggiungiPartecipanti={modalAggiungiPartecipanti} setModalAggiungiPartecipanti={setModalAggiungiPartecipanti} />

            <ModalModficaPartecipanti modalModificaPartecipanti={modalModificaPartecipanti} setModalModificaPartecipanti={setModalModificaPartecipanti} />
        </>
    );
}

export default ModalPartecipantiTavolo;
