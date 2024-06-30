import { Button, Form, FormProps, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { HouseDescriptionModel } from "../../utils/Models";
import { IModalGestione } from "../../containers/ManageHouses/ManageHouses";
import { update } from "firebase/database";
import { dbRef } from "../../firebase";

type Props = {
    modalGestioneCasate: IModalGestione;
    setModalGestioneCasate: React.Dispatch<React.SetStateAction<IModalGestione>>;
};

type FieldType = {
    title?: string;
    description?: string;
};

function ModalGestioneCasate(props: Props) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(props.modalGestioneCasate.record);
    }, [form, props.modalGestioneCasate.record]);

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const updates: { [key: string]: string } = {};
            updates[`/houseDescription/${props.modalGestioneCasate.index}/title`] = values.title;
            updates[`/houseDescription/${props.modalGestioneCasate.index}/description`] = values.description;
            await update(dbRef, updates);

            props.setModalGestioneCasate({ open: false, record: new HouseDescriptionModel() });
            modalSuccess();
        } catch (error) {
            console.log("error", error);
        }
    };

    const modalSuccess = () => {
        Modal.success({
            title: `Aggiornamento riuscito`,
            content: "",
            onOk: () => window.location.reload(),
        });
    };
    return (
        <Modal
            title={"Modifica il titolo e la descrizione " + props.modalGestioneCasate.record.title}
            width={1000}
            centered
            open={props.modalGestioneCasate.open}
            onClose={() => props.setModalGestioneCasate({ open: false, record: new HouseDescriptionModel() })}
            // onOk={() => props.setModalGestioneCasate({ open: false, record: new HouseDescriptionModel() })}
            onCancel={() => props.setModalGestioneCasate({ open: false, record: new HouseDescriptionModel() })}
            footer={<></>}
        >
            <Form
                layout={"vertical"}
                form={form}
                // initialValues={{ title: props.modalGestioneCasate.record.title, description: props.modalGestioneCasate.record.description }}
                onFinish={onFinish}
            >
                <Form.Item<FieldType> label="Titlo" name="title">
                    <Input />
                </Form.Item>
                <Form.Item<FieldType> label="Descrizione" name={"description"}>
                    <Input.TextArea />
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

export default ModalGestioneCasate;
