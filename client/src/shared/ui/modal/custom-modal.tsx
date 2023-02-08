import React, {forwardRef, useImperativeHandle} from 'react';
import Modal from "antd/es/modal/Modal";

export const CustomModal = forwardRef((props: any, ref) => {
        const [modalIsOpen, setIsOpen] = React.useState(false);

        useImperativeHandle(ref, () => ({
            openModal() {
                setIsOpen(true);
            },
            closeModal() {
                setIsOpen(false);
            }
        }))


        function afterOpenModal() {
        }

        function closeModal() {
            setIsOpen(false);
            props.afterCLose();
        }

        function onOk() {
            setIsOpen(false);
            props.onOk()
        }
        return (
            <div>
                <Modal
                    open={modalIsOpen}
                    afterClose={closeModal}
                    onCancel={closeModal}
                    onOk={onOk}
                    okButtonProps={{disabled: props.disableOk}}
                    okText={props.okText}
                >
                    {props.children}
                </Modal>
            </div>
        );
    }
)