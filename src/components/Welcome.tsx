import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Welcome({ startTheTour }) {
  const [open, setOpen] = React.useState(true);

  const handleTakeTheTour = () => {
    startTheTour();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Welcome to Dynamic Multidimension Array Visualization"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We'll go through all features of this applications.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleTakeTheTour} variant="contained">
            Take the tour
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
