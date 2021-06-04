import { TextField } from 'formik-material-ui'
import { styled } from '@material-ui/core/styles';
import {Field} from 'formik'

const StlyedTextField = styled(TextField)({
    '& .MuiFormLabel-root': {
      color: "inherit"
    },
    '& .MuiOutlinedInput-notchedOutline': {
      "border-color": 'rgba(255, 255, 255, 0.23)'
    },
    '& .MuiInputBase-root': {
      color: 'inherit'
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      'border-color': 'inherit'
    }
});

const OTF = function (props) {
  return <Field {...props} 
    variant="outlined" 
    component={StlyedTextField} 
    color="secondary"
  />
}

export default OTF

