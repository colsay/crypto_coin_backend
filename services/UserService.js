module.exports = class UserService {
    constructor(knex) {
        this.knex = knex;
    }

    getUsername(address) {
        console.log("get alias", address);
        let query = this.knex("users")
            .select("users.alias")
            .where("users.address", address);
        return query
            .then((data) => {
                return data;
            })
            .catch((err) => console.log(err));
    }

    checkUser(address) {
        return this.knex("users")
            .where({ address: address })
            .then((data) => {
                return data.length > 0 ? true : false;
            });
    }

    addAlias(username, address) {
        return this.knex("users").insert({
            alias: username,
            address: address,
        });
    }

    updateAlias(username, address) {
        return this.knex("users").where("address", address).update({
            alias: username,
        });
    }
};