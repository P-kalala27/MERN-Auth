import {Spinner} from 'react-bootstrap'


const Loader = () => {
  return (
    <Spinner
    animation='border'
    role='status'
    style={{
        width: '100px',
        height: '100px',
        display: 'inline-block',
        margin: 'auto'
    }}
    >Loader</Spinner>
  )
}

export default Loader