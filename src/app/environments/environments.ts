export const environment = {
    production: Boolean(process.env['PRODUCTION']) || true,
    apiUrl: process.env['API_PATH'] || "erro"
  }