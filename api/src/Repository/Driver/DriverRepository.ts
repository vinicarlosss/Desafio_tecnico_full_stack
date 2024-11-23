import  mysql  from 'mysql2/promise';
import { Driver } from '../../Models/Driver/Driver';

const dbConfig = {
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE,
};

class DriverRepository {
    
    private connection: mysql.Pool;

    constructor(){
        
        this.connection = mysql.createPool(dbConfig);
    }

    async getEligibleDrivers(distance: number): Promise<Driver[]>{

        const query = `
        Select * FROM Driver
        WHERE km_minimum <= ?`;
        const [rows] = await this.connection.execute(query, [distance]);
        return rows as Driver[];
    };
}
export default DriverRepository;
