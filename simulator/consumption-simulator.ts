import axios from 'axios';
import { DeviceEntity } from '../src/domains/device/entities/device.entity';



export async function startSimulator(devices : DeviceEntity[]) {  
  let deviceId = null
    for(const device of devices) {

      deviceId = device.id

      const apiUrl = `http://localhost:3000/devices/${deviceId}/consumption`
      console.log(apiUrl)

        const voltage = Math.random() < 0.5 
          ? (127 + Math.random() * 40 - 20).toFixed(1) // Variação entre 107V e 147V
          : (220 + Math.random() * 60 - 30).toFixed(1); // Variação entre 190V e 250V
      
        const powerUsage = (100 + Math.random() * 4900).toFixed(2); // Consumo entre 100W e 5000W
        const current = (Number(powerUsage) / Number(voltage)).toFixed(2); // Corrente calculada com base na potência e tensão
      
        const consumptionData = {
          powerUsage: Number(powerUsage), // Em watts
          voltage: Number(voltage),       // Em volts
          current: Number(current),       // Em amperes
          timestamp: new Date()
        };
      
        try {
          await axios.post(apiUrl, consumptionData);
          console.log(`Enviado: ${consumptionData.powerUsage}W | ${consumptionData.voltage}V | ${consumptionData.current}A`);
          continue
      
        } catch (error) {
          console.error('Erro ao enviar dados:', error);
        }
    }
}

