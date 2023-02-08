import React, {forwardRef, useImperativeHandle} from 'react';
import Modal from "antd/es/modal/Modal";

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        width: '35%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#overlays');

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
                    okText={props.okText}
                >
                    {props.children}
                </Modal>
            </div>
        );
    }
)