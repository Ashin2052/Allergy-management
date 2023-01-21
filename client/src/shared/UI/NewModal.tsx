import React, {forwardRef, useImperativeHandle} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        width:'35%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#overlays');

export const NewModal = forwardRef((props: any, ref) => {
        let subtitle;
        const [modalIsOpen, setIsOpen] = React.useState(false);

        useImperativeHandle(ref, () => ({
            openModal() {
                setIsOpen(true);
            }
        }))


        function afterOpenModal() {
            // references are now sync'd and can be accessed.
            // subtitle.style.color = '#f00';
        }

        function closeModal() {
            setIsOpen(false);
            props.afterClose()

        }

        return (
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {props.children}
                </Modal>
            </div>
        );
    }
)