import React from 'react';
import './EditUserData.scss';
import { ReactComponent as CloseIcon } from '../../../../assets/img/close.svg';
import axios from 'axios';
import { USER_URL } from '../../../../helpers/constants';

export const EditUserData = ({ selectedUser, setShowEditUserForm, setUsers }) => {
  const [selectName, setSelectName] = React.useState(selectedUser?.name);
  const [selectLastname, setSelectLastname] = React.useState(selectedUser?.lastname);
  const [selectEmail, setSelectEmail] = React.useState(selectedUser?.email);

  const handleNameChange = (e) => {
    setSelectName(e.target.value);
  };
  const handleLastnameChange = (e) => {
    setSelectLastname(e.target.value);
  };
  const handleEmailChange = (e) => {
    setSelectEmail(e.target.value);
  };

  const editUserData = async (e) => {
    e.preventDefault();

    const newUserData = {
      ...selectedUser,
      name: selectName,
      lastname: selectLastname,
      email: selectEmail,
    };

    try {
      await axios.put(USER_URL + '/' + selectedUser.id, newUserData);
      await axios.get(USER_URL).then((usersFromServer) => {
        setUsers(usersFromServer.data);
      });
      setShowEditUserForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="editForm" onSubmit={editUserData}>
        <button className="hideBtn" onClick={() => setShowEditUserForm(false)}>
          <CloseIcon />
        </button>
        <h2>Редактирование пользователя</h2>
        <div>
          <input
            className="editFormInput"
            type="text"
            name="userName"
            placeholder="Имя"
            value={selectName}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <input
            className="editFormInput"
            type="text"
            name="userLastname"
            placeholder="Фамилия"
            value={selectLastname}
            onChange={handleLastnameChange}
            required
          />
        </div>
        <div>
          <input
            className="editFormInput"
            type="text"
            name="userEmail"
            placeholder="Email"
            value={selectEmail}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <button className="editUserBtn" type="submit">
            Добавить изменения
          </button>
        </div>
      </form>
      <div onClick={() => setShowEditUserForm(false)} className="overlay"></div>
    </>
  );
};
