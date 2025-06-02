import { useEffect, useState } from 'react';
import FilterIcon from '../../assets/filter-icon.svg';
import { loadCategories, loadTransactions } from '../../utils/requisitions';
import Chip from '../Chip';
import './styles.css';

function Filter({ transactions, setTransactions }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  async function handleClearFilters() {
    const localCategories = [...categories];

    localCategories.forEach(categ => categ.checked = false);

    setCategories([...localCategories]);

    const allTransactions = await loadTransactions();

    setTransactions([...allTransactions]);
  }

  async function handleApplyFilters() {
    const localTransactions = await loadTransactions();
    setTransactions([...localTransactions]);

    const categoriesCheckedId = [];

    categories.forEach((categ) => {
      if (categ.checked) {
        categoriesCheckedId.push(categ.id);
      }
    });

    if (!categoriesCheckedId.length) {
      return;
    }

    const onlyFilteredTransactions = localTransactions.filter(
      (transact) => categoriesCheckedId.includes(transact.categoria_id)
    );

    setTransactions([...onlyFilteredTransactions]);
  }

  useEffect(() => {
    async function getAllCategories() {
      const allCategories = await loadCategories();

      allCategories.forEach(categ => {
        categ.checked = false;
      });

      setCategories([...allCategories]);
    }

    if (open) {
      getAllCategories();
    }
  }, [open]);

  return (
    <div className='container-filter'>

      <button onClick={() => setOpen(!open)} className="btn-white btn-filter">
        <img src={FilterIcon} alt="filter" />
        Filtrar
      </button>

      {open &&
        <div className='filter-body'>
          <strong>Categoria</strong>

          <div className='container-categories'>
            {categories.map((categ) => (
              <Chip
                key={categ.id}
                checked={categ.checked}
                title={categ.descricao}
                id={categ.id}
                categories={categories}
                setCategories={setCategories}
              />
            ))}
          </div>

          <div className='container-btns-filter'>
            <button
              className='btn-white btn-extra-small'
              onClick={handleClearFilters}
            >
              Limpar Filtros
            </button>
            <button
              className='btn-purple btn-extra-small'
              onClick={handleApplyFilters}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      }

    </div>
  )
}

export default Filter;