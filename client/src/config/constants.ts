export interface IConfig {
  apiUrl: string;
}

const deducedConfig: IConfig = {
  apiUrl: process.env.API_URL || 'http://localhost:5000/api/v1',
};

export default deducedConfig;