import mysql from "mysql2/promise";
import { Driver } from "../../Models/Driver/Driver";
import { DriverDTO } from "../../Models/Driver/DriverDTO";

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

class RideRepository {
  private connection: mysql.Pool;

  constructor() {
    this.connection = mysql.createPool(dbConfig);
  }

  public async saveRide(requestInfo: {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: DriverDTO;
    value: number;
    currentDateTime: string;
  }) {
    const query = `
    INSERT INTO Ride (
      distance, 
      duration, 
      value, 
      id_driver, 
      id_customer,
      date, 
      origin, 
      destination
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
    const values = [
        requestInfo.distance,
        requestInfo.duration,
        requestInfo.value,
        requestInfo.driver.id,
        requestInfo.customer_id,
        requestInfo.currentDateTime,
        requestInfo.origin,
        requestInfo.destination,
    ];
    try{
        await this.connection.execute(query, values);
    }catch(error: unknown){
        throw new Error("Dados fornecidos são inválidos");
    }
  }
}
export default RideRepository;
