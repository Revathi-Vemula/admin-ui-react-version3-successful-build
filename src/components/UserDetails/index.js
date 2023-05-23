import {useState} from 'react'
import Popup from 'reactjs-popup'
import {FiEdit} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const UserDetails = props => {
  const {deleteUser, userData, updateUser, checked, handleSelectedUser} = props

  const {id, name, email, role} = userData
  const [newName, setNewName] = useState(name)
  const [newEmail, setNewEmail] = useState(email)
  const [newRole, setNewRole] = useState(role)
  // const [newUser, setNewUser] = useState(userData)

  const onClickDeleteUser = () => {
    deleteUser(id)
  }

  const onChangeName = event => {
    setNewName(event.target.value)
  }

  const onChangeEmail = event => {
    setNewEmail(event.target.value)
  }

  const onChangeRole = event => {
    setNewRole(event.target.value)
  }

  const onClickUpdate = closePopUp => {
    const newUser = {
      id,
      name: newName,
      email: newEmail,
      role: newRole,
    }
    updateUser(newUser, id)
    closePopUp()
  }

  const onSelectUser = event => {
    handleSelectedUser(event.target)
  }

  return (
    <tr className={checked ? 'selected-row' : ''}>
      <td>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onSelectUser}
          value={id}
          className="input-checkbox-style"
        />
      </td>
      <td>
        <label className="label-data" htmlFor={id}>
          {name}
        </label>
      </td>
      <td>
        <label className="label-data" htmlFor={id}>
          {email}
        </label>
      </td>
      <td>
        <label className="label-data" htmlFor={id}>
          {role}
        </label>
      </td>
      <td>
        <Popup
          modal
          trigger={
            <button type="button" className="button-outline-none">
              <FiEdit size={20} />
            </button>
          }
          className="popup-content"
        >
          {close => (
            <div className="modal-container">
              <button
                testid="closeButton"
                type="button"
                className="close-button"
                onClick={() => close()}
              >
                <IoMdClose size="20" />
              </button>
              <h1 className="heading-popup">Edit User Details</h1>
              <form className="form-control p-3 m-2">
                <div className="input-container">
                  <label htmlFor={name} className="label-name">
                    Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={name}
                    id={name}
                    onChange={onChangeName}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor={email} className="label-name">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder={email}
                    id={email}
                    onChange={onChangeEmail}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor={role} className="label-name">
                    Role
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={role}
                    id={role}
                    onChange={onChangeRole}
                  />
                </div>
              </form>
              <div className="form-buttons-container">
                <button
                  type="button"
                  onClick={() => close()}
                  className="button-cancel"
                >
                  Discard
                </button>
                <button
                  type="button"
                  className="button-submit"
                  onClick={() => onClickUpdate(close)}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </Popup>
        <button
          type="button"
          className="button-outline-none"
          onClick={onClickDeleteUser}
        >
          <AiOutlineDelete color="#cc0000" size={23} />
        </button>
      </td>
    </tr>
  )
}

export default UserDetails
