import mysql from "mysql2/promise";

const dbConfig = {
    host: "127.0.0.1", 
    user: "app_user",
    password: "app_password", 
    database: "app_db",
};

class RideRepository  {

    private connection;

    constructor(){

        this.connection = mysql.createPool(dbConfig);
    };

}

export default RideRepository;
