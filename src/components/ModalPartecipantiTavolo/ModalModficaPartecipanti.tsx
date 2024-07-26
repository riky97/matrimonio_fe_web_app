import { Button, Form, FormProps, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { IModalGestione } from "../../containers/ManageHouses/ManageHouses";
import { HouseDescriptionModel, ParticipantModel } from "../../utils/Models";
import { update } from "firebase/database";
import { dbRef } from "../../firebase";
import { modalError, modalSuccess } from "../../utils/Functions";

type Props = {
    modalModificaPartecipanti: IModalGestione;
    setModalModificaPartecipanti: React.Dispatch<React.SetStateAction<IModalGestione>>;
};

function ModalModficaPartecipanti(props: Props) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (props.modalModificaPartecipanti.item) {
            form.setFieldsValue(props.modalModificaPartecipanti.item);
        }
    }, [form, props.modalModificaPartecipanti]);

    const onFinish: FormProps<ParticipantModel>["onFinish"] = async (values) => {
        try {
            const updates: { [key: string]: string } = {};
            updates[`/houseDescription/${props.modalModificaPartecipanti.record.key.toString()}/participants/${props.modalModificaPartecipanti.index}/name`] = values.name;
            updates[`/houseDescription/${props.modalModificaPartecipanti.record.key.toString()}/participants/${props.modalModificaPartecipanti.index}/surname`] = values.surname;
            await update(dbRef, updates);

            props.setModalModificaPartecipanti({ open: false, record: new HouseDescriptionModel() });

            modalSuccess({
                title: `Aggiornamento riuscito`,
                content: "",
                onOk: () => window.location.reload(),
            });
        } catch (error) {
            console.log("error", error);
            modalError({
                title: `Aggiornamento non riuscito`,
                content: "",
            });
        }
    };

    const getModalModificaTitle = (): string =>
        props.modalModificaPartecipanti.item ? "Modifica partecipante vecchio valore: " + props.modalModificaPartecipanti.item.name + " " + props.modalModificaPartecipanti.item.surname : "";
    return (
        <Modal
            title={getModalModificaTitle()}
            width={1000}
            centered
            open={props.modalModificaPartecipanti.open}
            onClose={() => props.setModalModificaPartecipanti({ open: false, record: new HouseDescriptionModel() })}
            // onOk={() => props.setModalAggiungiPartecipanti({ open: false, record: new HouseDescriptionModel() })}
            onCancel={() => props.setModalModificaPartecipanti({ open: false, record: new HouseDescriptionModel() })}
            footer={<></>}
        >
            <Form layout={"vertical"} form={form} onFinish={onFinish}>
                <Form.Item<ParticipantModel> label="Nome" name="name">
                    <Input />
                </Form.Item>
                <Form.Item<ParticipantModel> label="Cognome" name={"surname"}>
                    <Input />
                </Form.Item>
                <Form.Item className="d-flex justify-content-end">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalModficaPartecipanti;
