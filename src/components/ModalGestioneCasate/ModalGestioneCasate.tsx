import { Button, Form, FormProps, Input, Modal } from 'antd'
import React from 'react'
import { HouseDescriptionModel } from '../../utils/Models';
import { IModalGestione } from '../../containers/ManageHouses/ManageHouses';

type Props = {
    modalGestioneCasate: IModalGestione,
    setModalGestioneCasate: React.Dispatch<React.SetStateAction<IModalGestione>>
}

type FieldType = {
    title?: string;
    description?: string;
};

function ModalGestioneCasate(props: Props) {
    const [form] = Form.useForm();
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };
    return (
        <Modal
            title={"Modifica il titolo e la descrizione " + props.modalGestioneCasate.record.title}
            width={1000}
            centered
            open={props.modalGestioneCasate.open}
            onClose={() => props.setModalGestioneCasate({ open: false, record: new HouseDescriptionModel() })}
            onOk={() => props.setModalGestioneCasate({ open: false, record: new HouseDescriptionModel() })}
            onCancel={() => props.setModalGestioneCasate({ open: false, record: new HouseDescriptionModel() })}
        >
            <Form
                layout={'horizontal'}
                form={form}
                initialValues={{ title: props.modalGestioneCasate.record.title, description: props.modalGestioneCasate.record.description }}
                onFinish={onFinish}            >
                <Form.Item<FieldType> label="Titlo" name="title">
                    <Input />
                </Form.Item>
                <Form.Item<FieldType> label="Descrizione" name={"description"}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalGestioneCasate