import axios from "axios";

export default class userService {

    async getUsers() {
        return await axios.get('http://192.1.200.26:8000/user').then(res => res.data);
    }

    async getUserById(id) {

        let result = await axios.get(`http://192.1.200.26:8000/users/${id}`).then(res => res.data);
        return result;

    }

    async deleteById(id) {
        await axios.delete('http://192.1.200.26:8000/user/' + id).then(res => res.data);
        return true;
    }

    async logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        localStorage.removeItem('userFirstname');
        localStorage.removeItem('userLastname');
        localStorage.removeItem('userUsername');
    }

    async login(username, password) {
        let ans = 'false';
        await axios.post('http://192.1.200.26:8000/signin', {
            username: username,
            password: password
        }).then(async () => {
            ans = 'true';
            var id = await this.getIdByUsername(username);
            localStorage.setItem('id', id);
        }).catch(() => {
        });
        return ans;
    }

    async addUser(user) {
        let ans = false;
        await axios.post('http://192.1.200.26:8000/signup', user).then((res) => {
            ans = true;
        }).catch((err) => {
            console.log(err);
        });

        return ans;
    }

    async getIdByUsername(username) {
        let result = await axios.get(`http://192.1.200.26:8000/user/${username}`).then(res => res.data);
        return result.id;

    }
}