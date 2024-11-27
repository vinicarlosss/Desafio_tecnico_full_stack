import mysql, { QueryResult } from "mysql2/promise";
import { Driver } from "../../Models/Driver/Driver";
import { GetAllDriverResponse } from "../../Controller/Driver/response/GetAllDriverResponse";
import { HttpException } from "../../Exception/HttpException";

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

class DriverRepository {
  private connection: mysql.Pool;

  constructor() {
    this.connection = mysql.createPool(dbConfig);
  }

  public async getEligibleDrivers(distance: number): Promise<Driver[]> {
    
    const query = `
    SELECT * FROM Driver
    WHERE km_minimum <= ?
    ORDER BY CAST(REPLACE(SUBSTRING_INDEX(SUBSTRING_INDEX(tax, ' ', -1), '/', 1), ',', '.') AS DECIMAL) ASC;
    `;
    const [rows] = await this.connection.execute(query, [distance]);
    return rows as Driver[];
  }

  public async getById(driverId: number): Promise<Driver | null>{
    const query = `
      Select * from Driver 
      WHERE id = ?
    `;
    const [rows] = await this.connection.execute(query, [driverId]);
    if(Array.isArray(rows) && rows.length > 0){
      return rows[0] as Driver;
    }
    return null;
  }

  public async getAll(): Promise<GetAllDriverResponse[]>{
    const query = `Select d.id, d.name from Driver as d`;
    const [rows] = await this.connection.execute(query);
    if(Array.isArray(rows) && rows.length > 0){
      return rows as GetAllDriverResponse[];
    }
    throw new HttpException(404, "NO_DRIVER_FOUND", "Nenhum motorista encontrado");
  }
}
export default DriverRepository;
