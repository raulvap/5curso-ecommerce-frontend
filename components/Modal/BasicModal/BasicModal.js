import { Modal, Icon } from "semantic-ui-react";

export default function BasicModal(props) {
   // este Modal se muestra en Menú

   const { show, setShow, title, children, ...otherProps } = props;

   const onClose = () => setShow(false);

   return (
      <Modal className="basic-modal" open={show} onClose={onClose} {...otherProps}>
         <Modal.Header>
            <span>{title}</span> <Icon name="close" onClick={onClose} />
         </Modal.Header>
         <Modal.Content>{children}</Modal.Content>
      </Modal>
   );
}
