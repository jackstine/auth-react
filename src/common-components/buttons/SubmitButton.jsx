import Button from '@material-ui/core/Button'

const SubmitButton = function (props) {
  let text = props.text ?? "Submit"
  return <Button 
    type="submit" 
    variant="contained"
    {...props}
    color="primary"
  >{text}</Button>
}

export default SubmitButton
