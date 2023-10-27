const BASE_URL = 'http://localhost:999/';

const checkValue = (...value) => {
    for(const el of value) {
        if(el === null || el === undefined) return false;
    };
    return true;
};

const loginUser = (login, password) => {
    fetch(`${BASE_URL}api/user/auth`, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((resp) => resp.json())
        .then((resp) => {
            if(resp.message === 'User authorized') {
                const { name, login, password, id } = resp.data;
                localStorage.setItem('name', name);
                localStorage.setItem('login', login);
                localStorage.setItem('password', password);
                localStorage.setItem('id', id);
                alert('Пользователь авторизован');
                window.location.replace(`${BASE_URL}chat`);
            } else {
                alert('Ошибка авторизации');
            };
        })
        .catch((err) => console.log(err));
};

const signinUser = (login, password, name) => {
    fetch(`${BASE_URL}api/user`, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
            name,
        }),
    })
        .then((resp) => resp.json())
        .then((resp) => {
            if(resp.message === 'User created') {
                alert('Пользователь создан');
                window.location.replace(`${BASE_URL}login`);
            } else {
                alert('Ошибка создания пользователя');
            };
        })
        .catch((err) => console.log(err));
};

const logOutUser = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    window.location.replace(`${BASE_URL}`)
};

const deleteUser = () => {
    const id = localStorage.getItem('id');
    fetch(`${BASE_URL}api/user/${id}`, {
        method: 'DELETE',
    })
        .then((resp) => resp.json())
        .then((resp) => {
            if(resp.message === 'User deleted') {
                alert('Пользователь успешно удалён');
                localStorage.removeItem('name');
                localStorage.removeItem('id');
                localStorage.removeItem('login');
                localStorage.removeItem('password');
                window.location.replace(`${BASE_URL}login`);
            } else {
                alert('Ошибка при удалении пользователя');
            };
        })
        .catch((err) => console.log(err));
};

const submitNewMessage = (newMessage) => {
    fetch(`${BASE_URL}api/message`, {
        method: 'POST',
        body: JSON.stringify({
            user_name: localStorage.getItem('name'),
            message: newMessage,
        })
    })
        .then((resp) => resp.json())
        .then((resp) => {
            if(resp.message !== 'Add new message') {
                alert('Ошибка при отправке сообщения');
            };
        })
        .catch((err) => console.log(err));
};

const chatMessages = new EventSource(`${BASE_URL}api/message`);

chatMessages.addEventListener('message', (msg) => {
    const { user_name, message } = JSON.parse(msg.data); 
    document.querySelector('#chat').innerHTML += `
        <div class="mainPage__block_user">
           <div class="mainPage__block_user_name">${user_name}</div>
           <div class="mainPage__block_user_message">${message}</div>
        </div>
    `;
});

document.addEventListener('click', (el) => {
    const login = document.querySelector('#login');
    const password = document.querySelector('#password');
    const name = document.querySelector('#name');
    const newMessage = document.querySelector('#newMessage');

    if(
        el.target.id === 'login__submit' &&
        checkValue(login.value, password.value)
    ) loginUser(login.value, password.value);
    else if(
        el.target.id === 'signin__submit' &&
        checkValue(login.value, password.value, name.value)
    ) signinUser(login.value, password.value, name.value);
    else if(
        el.target.id === 'logout'
    ) logOutUser();
    else if(
        el.target.id === 'deleteUser'
    ) deleteUser();
    else if(
        el.target.id === 'message__submit' &&
        checkValue(newMessage.value)
    ) submitNewMessage(newMessage.value);
});