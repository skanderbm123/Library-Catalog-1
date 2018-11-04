const MySql = require('sync-mysql')
const User = require('./User')

const connection = new MySql({
    host: '18.221.83.136',
    user: 'root',
    password: 'ribalestbeau',
    database: 'mysql',
})

class UserMapper{
    static PersistUser(user){
        try {
            const data = connection.query(`INSERT INTO users VALUES (${this.objectToQueryString(user)})`)
            return { status: 0, message: 'Ok', results: data }
        } catch (error) {
            return { status: 1, message: 'Error'+error, error }
        }
    }

    static RetrieveUserByEmail(email){
        try {
            const data = connection.query(`SELECT * FROM users where email='${email}'`)
            return { status: 0, results: data }
        } catch (error) {
            return { status: 1, error }
        }
    }

    static RetrieveUserById(id){
        try {
            const data = connection.query(`SELECT * FROM users where id='${id}'`)
            return { status: 0, message: "User found.", results: data }
        } catch (error) {
            return { status: 1, message : "Error...", error }
        }
    }

    static DeleteUser(id){
        try {
            const data = connection.query(`DELETE FROM users where id=${id}`);
            return { status: 0, message: "User Deleted.", results: data}
        } catch(error){
            return {status: 1, message: "Error...", error};
        }
    }

    static ActiveUsers(){
        try {
            const data = connection.query(`SELECT * FROM users where isActive=1`)
            const usersArray = data.map(user => { return { user: user.email, isAdmin: user.isAdmin ? 'Admin' : 'Client' } })

            return { status: 0, results: data,users: usersArray }
        } catch (error) {
            return { status: 1, error }
        }
    }

    static SetActive(id,isActive){
        try{
            const data = connection.query(`UPDATE users SET isActive=${isActive} WHERE id='${id}'`)
            return { status: 0, results: data }
        } catch (error) {
            return { status: 1, error}
        }
    }



    static objectToQueryString(object) { // Helper. This method turns an object into a string formated for an SQL query
        return Object.values(object).map(x => "'" + x + "'").join(',');
    }
}

module.exports=UserMapper;

