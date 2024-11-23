import mysql from "mysql2/promise";
import { Driver } from "../../Models/Driver/Driver";

const dbConfig = {
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE,
};

class RideRepository  {

    private connection: mysql.Pool;

    constructor(){

        this.connection = mysql.createPool(dbConfig);
    };
}
export default RideRepository;
