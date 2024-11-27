import mysql from "mysql2/promise";
import { DriverRequest } from "../../Models/Driver/DriverRequest";
import { Ride } from "../../Models/Ride/Ride";
import { HttpException } from "../../Exception/HttpException";

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
    driver: DriverRequest;
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
    try {
      await this.connection.execute(query, values);
    } catch (error: unknown) {
      throw new Error("Dados fornecidos são inválidos");
    }
  }

  public async findAllByCustomerId(customer_id: string) {
    const query = `
      SELECT 
        r.id,
        r.date,
        r.origin,
        r.destination,
        r.duration,
        r.value,
        r.distance,
        d.id AS driver_id,
        d.name AS driver_name
      FROM 
        Ride r
      INNER JOIN 
        Driver d 
      ON 
        r.id_driver = d.id
      WHERE 
        r.id_customer = ?;
    `;
    const [rows] = await this.connection.execute<any[]>(query, [customer_id]);
    if (rows.length > 0) {
      return (rows as any[]).map((row) => ({
        id: row.id,
        date: row.date,
        origin: row.origin,
        destination: row.destination,
        duration: row.duration,
        distance: row.distance,
        driver: {
          id: row.driver_id,
          name: row.driver_name,
        },
        value: row.value,
      }));
    }
    throw new HttpException(
      404,
      "NO_RIDES_FOUND",
      "Não foram encontrados registros de corridas para o cliente especificado."
    );
  }
  public async findAllByCustomerIdAndDriverID(
    customer_id: string,
    driver_id: number | undefined
  ) {
    const query = `
      SELECT 
        r.id,
        r.date,
        r.origin,
        r.destination,
        r.duration,
        r.value,
        r,distance,
        d.id AS driver_id,
        d.name AS driver_name
      FROM 
        Ride r
      INNER JOIN 
        Driver d 
      ON 
        r.id_driver = d.id
      WHERE 
        r.id_customer = ? AND r.id_driver = ?;
    `;
    const [rows] = await this.connection.execute<any[]>(query, [customer_id, driver_id]);
    if (rows.length > 0) {
      return (rows as any[]).map((row) => ({
        id: row.id,
        date: row.date,
        origin: row.origin,
        destination: row.destination,
        duration: row.duration,
        distance: row.distance,
        driver: {
          id: row.driver_id,
          name: row.driver_name,
        },
        value: row.value,
      }));
    }
    throw new HttpException(
      404,
      "NO_RIDES_FOUND",
      "Não foram encontrados registros de corridas para o cliente ou motorista especificados."
    );
  }
}

export default RideRepository;
