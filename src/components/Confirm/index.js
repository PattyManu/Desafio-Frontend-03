import './styles.css';

function Confirm({ open, handleClose, handleConfirm }) {

  return (
    <>
      {open &&
        <div className='container-confirm'>
          <div className='arrow-up'>
          </div>

          <span>Apagar item?</span>
          <div className='container-buttons'>
            <button
              className='btn-extra-small btn-blue'
              onClick={handleConfirm}
            >
              Sim
            </button>
            <button
              onClick={handleClose}
              className="btn-extra-small btn-red"
            >
              Não
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default Confirm;