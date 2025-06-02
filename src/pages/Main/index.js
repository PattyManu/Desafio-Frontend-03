import { useEffect, useState } from 'react';
import AddTransactionModal from '../../components/AddTransactionModal';
import EditTransactionModal from '../../components/EditTransactionModal';
import Filter from '../../components/Filter';
import Header from '../../components/Header';
import ProfileModal from '../../components/ProfileModal';
import Resume from '../../components/Resume';
import Table from '../../components/Table';
import { loadTransactions } from '../../utils/requisitions';
import './styles.css';

function Main() {
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openModalAddTransaction, setOpenModalAddtransaction] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [currentItemToEdit, setCurrentItemToEdit] = useState(null);

  useEffect(() => {
    setTransactions([]);

    async function getAllTransactions() {
      const allTransactions = await loadTransactions();

      setTransactions([...allTransactions]);
    }

    getAllTransactions();

  }, []);

  return (
    <div className='container-main'>

      <Header
        handleEditProfile={() => setOpenModalProfile(true)}
      />

      <section>
        <div className='width-limit'>
          <div className='container-data'>
            <div className='container-left'>
              <Filter
                transactions={transactions}
                setTransactions={setTransactions}
              />
              <Table
                transactions={transactions}
                setTransactions={setTransactions}
                setOpenModalEdit={setOpenModalEdit}
                setCurrentItemToEdit={setCurrentItemToEdit}
              />
            </div>
            <div className='container-right'>
              <Resume
                transactions={transactions}
              />
              <button
                className='btn-purple btn-small'
                onClick={() => setOpenModalAddtransaction(true)}
              >
                Adicionar Registro
              </button>
            </div>
          </div>
        </div>
      </section>

      <AddTransactionModal
        open={openModalAddTransaction}
        handleClose={() => setOpenModalAddtransaction(false)}
        setTransactions={setTransactions}
      />

      <EditTransactionModal
        open={openModalEdit}
        setTransactions={setTransactions}
        handleClose={() => setOpenModalEdit(false)}
        currentItemToEdit={currentItemToEdit}
      />

      <ProfileModal
        open={openModalProfile}
        handleClose={() => setOpenModalProfile(false)}
      />
    </div>
  )
}

export default Main;