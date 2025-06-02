import './styles.css';
import CloseIcon from '../../assets/close-icon.svg';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { getItem, setItem } from '../../utils/storage';

const defaultForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function ProfileModal({ open, handleClose }) {
  const token = getItem('token');
  const [form, setForm] = useState({ ...defaultForm });

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        return;
      }

      if (form.password !== form.confirmPassword) {
        return;
      }

      const response = await api.put('/usuario',
        {
          nome: form.name,
          email: form.email,
          senha: form.password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status > 204) {
        return;
      }

      setItem('userName', form.name);

      handleClose();
      handleClearForm();

    } catch (error) {
      console.log(error.response);
    }
  }

  function handleClearForm() {
    setForm({ ...defaultForm });
  }

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const response = await api.get('/usuario', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { nome, email } = response.data;

        setForm({
          ...form,
          name: nome,
          email: email,
        });

      } catch (error) {
        console.log(error.response);
      }
    }

    if (open) {
      loadUserProfile();
    }
  }, [open]);

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
            <h2>Editar Perfil</h2>

            <form onSubmit={handleSubmit}>
              <div className='container-inputs'>
                <label>Nome</label>
                <input
                  type="text"
                  name='name'
                  value={form.name}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className='container-inputs'>
                <label>E-mail</label>
                <input
                  type="text"
                  name='email'
                  value={form.email}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className='container-inputs'>
                <label>Senha</label>
                <input
                  type="password"
                  name='password'
                  value={form.password}
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className='container-inputs'>
                <label>Confirmação de senha</label>
                <input
                  type="password"
                  name='confirmPassword'
                  value={form.confirmPassword}
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

export default ProfileModal;