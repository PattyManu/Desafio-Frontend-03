import './styles.css';

function Chip({ id, title, checked, categories, setCategories }) {

  function handleCheckCategorie() {
    const localCategories = [...categories];

    localCategories.forEach((categ) => {
      if (categ.id === id) {
        categ.checked = !categ.checked
      }
    });

    setCategories([...localCategories]);
  }

  return (
    <div
      className={`container-chip ${checked ? 'checked' : 'unchecked'}`}
      onClick={handleCheckCategorie}
    >
      <span>{title}</span>
      {checked ? 'x' : '+'}
    </div>
  )
}

export default Chip;