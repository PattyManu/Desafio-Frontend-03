import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import api from '../../services/api';
import { loadCategories, loadTransactions } from '../../utils/requisitions';
import { getItem } from '../../utils/storage';
import './styles.css';

const defaultForm = {
  value: '',
  category: {
    id: '',
    name: ''
  },
  date: '',
  description: ''
}

function AddTransactionModal({ open, handleClose, setTransactions }) {
  const token = getItem('token');
  const [option, setOption] = useState('out');
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ ...defaultForm })


  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  function handleChangeSelect({ target }) {
    const currentCategory = categories.find((categ) => categ.descricao === target.value);

    if (!currentCategory) {
      return;
    }
    setForm({ ...form, category: { id: currentCategory.id, name: currentCategory.descricao } });;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const [day, month, year] = form.date.split('/');

    try {
      await api.post('/transacao',
        {
          tipo: option === 'in' ? 'entrada' : 'saida',
          descricao: form.description,
          valor: form.value,
          data: new Date(`${year}-${month}-${day}`),
          categoria_id: form.category.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      handleClose();
      setForm({ ...defaultForm });

      const allTransactions = await loadTransactions();

      setTransactions([...allTransactions]);
    } catch (error) {
      console.log(error.response);
    }

  }

  useEffect(() => {
    async function getCategories() {
      const allCategories = await loadCategories();

      setCategories([...allCategories]);
    }

    getCategories();

  }, []);

  return (
    <>
      {open &&
        <div className='backdrop'>
          <div className='modal'>
            <img
              className='close-button'
              src={CloseIcon}
              alt="close-button"
              onClick={handleClose}
            />
            <h2>Adicionar Registro</h2>

            <div className='container-options'>
              <button
                className={`${option === 'out'
                  ? 'option-off'
                  : 'option-in'} 
                btn-big`}
                onClick={() => setOption('in')}
              >
                Entrada
              </button>
              <button
                className={`${option === 'out'
                  ? 'option-out'
                  : 'option-off'} 
              btn-big`}
                onClick={() => setOption('out')}
              >
                Saída
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='container-inputs'>
                <label>Valor</label>
                <input
                  name='value'
                  type="number"
                  value={form.value}
                  onChange={handleChangeForm}
                  required
                />
              </div>

              <div className='container-inputs'>
                <label>Categoria</label>

                <select
                  name='category'
                  value={form.category.name}
                  onChange={handleChangeSelect}
                  required
                >
                  <option>Selecione</option>
                  {categories.map((categ) => (
                    <option
                      key={categ.id}
                      value={categ.descricao}
                    >
                      {categ.descricao}
                    </option>
                  ))}
                </select>

              </div>

              <div className='container-inputs'>
                <label>Data</label>
                <input
                  name='date'
                  type="text"
                  value={form.date}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className='container-inputs'>
                <label>Descrição</label>
                <input
                  name='description'
                  type="text"
                  value={form.description}
                  onChange={handleChangeForm}
                  required
                />
              </div>

              <button className='btn-purple btn-small'>
                Confirmar
              </button>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default AddTransactionModal;