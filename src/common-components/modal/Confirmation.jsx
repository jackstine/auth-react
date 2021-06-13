import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

/**
 *
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @param {string} props.text
 * @param {string} props.title
 * @param {function} props.onOk
 * @returns
 */
const Confirmation = function (props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      // TODO investigate later
      // PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{props.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.onOk} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
