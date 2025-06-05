import fetch from "node-fetch";
import chalk from "chalk";

const ENDPOINT = "https://callback-iot.onrender.com/data";

fetch(ENDPOINT)
  .then(res => res.json())
  .then(data => {
    console.log(chalk.yellow.bold("📡 Datos decodificados desde el endpoint:\n"));

    data.forEach(item => {
      if (item.hexData) {
        const buffer = Buffer.from(item.hexData, "hex");

        const temperatura = buffer.readFloatLE(0);
        const humedad     = buffer.readFloatLE(4);
        const presion     = buffer.readFloatLE(8);

        console.log(chalk.green("Dispositivo: ") + item.device);
        console.log(chalk.green("Fecha: ") + item.timestamp);
        console.log(chalk.blue("Temperatura: ") + temperatura.toFixed(2) + " °C");
        console.log(chalk.blue("Humedad: ") + humedad.toFixed(2) + " %");
        console.log(chalk.blue("Presión: ") + presion.toFixed(2) + " hPa");
        console.log(chalk.gray("oooooooooooooooooooooooooooooooo\n"));
      }
    });
  })
  .catch(err => {
    console.error(chalk.red("Error al obtener los datos: "), err);
  });
