import { Button, Form, FormProps, Input, Modal } from "antd";
import React from "react";
import { HouseDescriptionModel, ParticipantModel } from "../../utils/Models";
import { modalError, modalSuccess } from "../../utils/Functions";
import { DataSnapshot, child, get, update } from "firebase/database";
import { dbRef } from "../../firebase";
import { IModalGestione } from "../../containers/ManageHouses/ManageHouses";

type ModalAggiungiPartecipantiProps = {
    modalAggiungiPartecipanti: IModalGestione;
    setModalAggiungiPartecipanti: React.Dispatch<React.SetStateAction<IModalGestione>>;
};

function ModalAggiungiPartecipanti(props: ModalAggiungiPartecipantiProps) {
    const [form] = Form.useForm();

    const onFinish: FormProps<ParticipantModel>["onFinish"] = async (values) => {
        try {
            const snapshot: DataSnapshot = await get(child(dbRef, `/houseDescription/${props.modalAggiungiPartecipanti.index}/participants`));
            let data: ParticipantModel[] = snapshot.val();
            data.push({
                name: values.name,
                surname: values.surname,
            });

            const updates: { [key: string]: ParticipantModel[] } = {};
            updates[`/houseDescription/${props.modalAggiungiPartecipanti.index}/participants`] = data;
            await update(dbRef, updates);

            props.setModalAggiungiPartecipanti({ open: false, record: new HouseDescriptionModel() });

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

    return (
        <Modal
            title={"Aggiungi partecipante a " + props.modalAggiungiPartecipanti.record.title}
            width={1000}
            centered
            open={props.modalAggiungiPartecipanti.open}
            onClose={() => props.setModalAggiungiPartecipanti({ open: false, record: new HouseDescriptionModel() })}
            // onOk={() => props.setModalAggiungiPartecipanti({ open: false, record: new HouseDescriptionModel() })}
            onCancel={() => props.setModalAggiungiPartecipanti({ open: false, record: new HouseDescriptionModel() })}
            footer={<></>}
        >
            <Form
                layout={"vertical"}
                form={form}
                // initialValues={{ title: props.modalAggiungiPartecipanti.record.title, description: props.modalAggiungiPartecipanti.record.description }}
                onFinish={onFinish}
            >
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

export default ModalAggiungiPartecipanti;
