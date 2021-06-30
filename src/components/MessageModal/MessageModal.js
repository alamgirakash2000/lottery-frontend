import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "80%",
  },
  paper: {
    backgroundColor: "#000",
    color: "#fff",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

const MessageModal = ({ message, open, setOpen }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}>
      <Fade in={open}>
        <div className={classes.paper}>
          <div className='w-100 d-flex justify-content-end'>
            <button className='btn-danger' onClick={() => setOpen(false)}>
              X
            </button>
          </div>
          <h2 id='transition-modal-title'>{message.title}</h2>
          {message.status === "waiting" && (
            <img
              alt='File:Gray circles rotate.gif'
              src='https://upload.wikimedia.org/wikipedia/commons/3/3a/Gray_circles_rotate.gif'
              decoding='async'
              height='250'
            />
          )}
          {message.status === "success" && (
            <img
              src='https://www.nicepng.com/png/full/362-3624869_icon-success-circle-green-tick-png.png'
              alt='Success'
              height='250'></img>
          )}
          {message.status === "error" && (
            <img
              src='https://www.nicepng.com/png/full/334-3345338_this-free-icons-png-design-of-error-dialog.png'
              alt='Success'
              height='250'></img>
          )}
          <p id='transition-modal-description'>{message.msg}</p>
        </div>
      </Fade>
    </Modal>
  );
};

export default MessageModal;
