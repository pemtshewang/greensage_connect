let exportReadings:{
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  cloud_cover: number;
};
const getWeather = async () => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,cloud_cover`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const readings = data["current"];
  exportReadings = readings;
  const units = data["current_units"];

  const combinedData: { [key: string]: string } = {};

  // Combine readings and units
  Object.keys(readings).forEach((key) => {
    const unit = units[key];
    const reading = readings[key];

    if (unit && reading !== undefined) {
      combinedData[key] = `${reading} ${unit}`;
    }
  });

  return combinedData;
};
export { exportReadings };
export default getWeather;

