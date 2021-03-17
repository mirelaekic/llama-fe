import React from 'react';
import "../styles.css";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Avatar } from '@material-ui/core';
import { Col,Row } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px strong #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button  onClick={handleOpen}
              className="post-input"              
            ><p className="text-muted">What's happening?</p></button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h5 id="transition-modal-title"><strong>Create a post</strong></h5>
            <hr />
            <Row>
            <Col lg={2}><Avatar /></Col>
            <Col lg={10}> user name</Col>
          </Row>
          <input placeholder="What's happening?" as="textarea" className="input-modal"/> 
          <hr /> 
          <div> icon buttons</div></div>
         
        </Fade>
      </Modal>
    </div>
  );
}