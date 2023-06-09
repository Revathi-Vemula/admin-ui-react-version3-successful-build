import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import {FcNext, FcPrevious} from 'react-icons/fc'
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserDetails from '../UserDetails'
import './index.css'

const AdminPortalHome = () => {
  const [usersList, setUsersList] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [pageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState()
  const [selectAll, setSelectAll] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])

  useEffect(() => {
    const getUsersList = async () => {
      const getUsersUrl =
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      const options = {
        method: 'GET',
      }

      const dataResponse = await fetch(getUsersUrl, options)

      if (dataResponse.ok === true) {
        const usersData = await dataResponse.json()

        setUsersList(usersData)
        setCurrentItems(usersData.slice(0, pageSize))
        setPageCount(Math.ceil(usersData.length / pageSize))
      }
    }
    getUsersList()
  }, [pageSize])

  const onChangeSearchInput = event => {
    const search = event.target.value
    const searchValue = search.toLowerCase()
    setSearchInput(event.target.value)

    const filteredUsersList = usersList.filter(eachUser => {
      const {name, email, role} = eachUser
      if (
        name.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue) ||
        role.toLowerCase().includes(searchValue)
      ) {
        return eachUser
      }
      return null
    })
    // console.log("filteredList: " ,filteredUsersList)
    setPageCount(Math.ceil(filteredUsersList.length / pageSize))
    setCurrentPage(0)
    setCurrentItems(filteredUsersList.slice(0, pageSize))
  }

  const onDeleteUser = id => {
    const deletedUserIndex = usersList.findIndex(eachUser => {
      if (eachUser.id === id) {
        return true
      }
      return false
    })

    const updatedUsersList = [...usersList]
    updatedUsersList.splice(deletedUserIndex, 1)

    if (currentItems.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1)
      setCurrentItems(
        updatedUsersList.slice(
          (currentPage - 1) * pageSize,
          pageSize * currentPage,
        ),
      )
    } else {
      setUsersList(updatedUsersList)
      setCurrentItems(
        updatedUsersList.slice(
          currentPage * pageSize,
          pageSize * (currentPage + 1),
        ),
      )
    }

    const newPageCount = Math.ceil(updatedUsersList.length / pageSize)
    setPageCount(newPageCount)
  }

  const onClickPageChange = index => {
    setCurrentPage(index)
    const currentItems = usersList.slice(index * 10, pageSize * (index + 1))
    setCurrentItems(currentItems)
    setSelectAll(false)
    setSelectedUsers([])
  }

  const onUpdateUserDetails = (user, id) => {
    const updatedUserDetails = [...usersList]
    const userIndex = updatedUserDetails.findIndex(eachUser => {
      if (eachUser.id === id) {
        return true
      }
      return false
    })

    updatedUserDetails.splice(userIndex, 1, user)
    setUsersList(updatedUserDetails)
    let updatedCurrentItems = updatedUserDetails.slice(currentPage * pageSize, pageSize * (currentPage + 1))
    console.log(updatedCurrentItems)
    setCurrentItems(updatedCurrentItems)
  }

  const onChangeSelectAll = event => {
    const {checked} = event.target

    setSelectAll(checked)
    const selectedUserIds = checked
      ? currentItems.map(eachUser => eachUser.id)
      : []
    setSelectedUsers(selectedUserIds)
  }

  const onChangeSelectedUser = target => {
    const {checked, value} = target

    if (checked) {
      setSelectedUsers([...selectedUsers, value])
    } else {
      setSelectedUsers(selectedUsers.filter(eachId => eachId !== value))
    }
  }

  const onClickDeleteAll = () => {
    if (selectedUsers.length !== 0) {
      const updatedUsersList = usersList.filter(
        user => !selectedUsers.includes(user.id),
      )
      setUsersList(updatedUsersList)

      if (currentPage > 0) {
        setCurrentPage(currentPage - 1)
        setCurrentItems(
          updatedUsersList.slice(
            (currentPage - 1) * pageSize,
            pageSize * currentPage,
          ),
        )
      } else {
        setCurrentPage(0)
        setCurrentItems(updatedUsersList.slice(0, pageSize * (currentPage + 1)))
      }
      const newPageCount = Math.ceil(updatedUsersList.length / pageSize)
      setPageCount(newPageCount)
      setSelectAll(false)
      setSelectedUsers([])
    }
  }

  const renderUsersList = () => {
    const disabledClass = selectedUsers.length === 0 ? 'button-disabled':''

    return (
    <div className="main-container">
      <div className='search-button-container-small'>
          <input
            type="search"
            className="search-input-style"
            placeholder="Search by Name,Email or Role"
            id="search"
            value={searchInput}
            onChange={onChangeSearchInput}
          />
          <button
            type="button"
            disabled = {selectedUsers.length === 0}
            className={`button-custom-delete button-display-small ${disabledClass}`}
            id="deleteAllSmall"
            onClick={onClickDeleteAll}
          >
            Delete All
          </button>
      </div>

      {/* Display table */}
      <table className="table table-hover mt-1">
        <thead>
          <tr>
            <th scope="col" className='column-select'>
              <input
                type="checkbox"
                id="allSelectCheckBox"
                checked={selectAll}
                onChange={onChangeSelectAll}
                className="input-style"
              />
            </th>
            <th scope="col" className='column-name'>Name</th>
            <th scope="col" className='column-email'>Email</th>
            <th scope="col" className='column-role'>Role</th>
            <th scope="col" className='column-actions'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {usersList.length > 0 ? (
              currentItems.map(eachUser => (
                  <UserDetails
                      userData={eachUser}
                      key={eachUser.id}
                      deleteUser={onDeleteUser}
                      updateUser={onUpdateUserDetails}
                      checked={selectAll || selectedUsers.includes(eachUser.id)}
                      handleSelectedUser={onChangeSelectedUser}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" rowSpan="8">
                      Oops! No Users Found!
                  </td>
                </tr>
              )}
        </tbody>
      </table>
          
      <div className="table-footer-container">
          <button
              type="button" disabled = {selectedUsers.length === 0}
              className={`button-custom-delete button-display-medium ${disabledClass}`}
              id="deleteAll"
              onClick={onClickDeleteAll}
          >
            Delete Selected
          </button>
          
          {/* Pagination */}
          <div className="pagination-container">
            {/* Skip to start page Button */}
            <button
                type="button"
                className="button-page"
                disabled={currentPage === 0}
                onClick={() => onClickPageChange(0)}
            >
                <MdKeyboardDoubleArrowLeft size={22} />
            </button>
              {/* Previous Button */}
            <button
                type="button"
                className="button-page"
                onClick={() => onClickPageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                <FcPrevious size={15} />
            </button>
            {Array(pageCount)
                .fill(null)
                .map((page, index) => (
                  <button
                    type="button"
                    className={`${
                      currentPage === index ? 'active-page-button' : ''
                    } button-page`}
                    key={uuidv4()}
                    onClick={() => onClickPageChange(index)}
                  >
                    {index + 1}
                  </button>))
            }
              {/* Next Button */}
            <button
                type="button"
                className="button-page"
                onClick={() => onClickPageChange(currentPage + 1)}
                disabled={currentPage === pageCount - 1}
            >
              <FcNext size={15} />
            </button>
              {/* Skip to last page Button */}
            <button
                type="button"
                className="button-page"
                onClick={() => onClickPageChange(pageCount - 1)}
                disabled={currentPage === pageCount - 1}
            >
              <MdKeyboardDoubleArrowRight size={22} />
            </button>
          </div>
      </div>
    </div>
  )
}

  return <div>{renderUsersList()}</div>
}

export default AdminPortalHome


