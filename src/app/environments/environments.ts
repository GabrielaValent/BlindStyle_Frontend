export const environment = {
    production: Boolean(process.env['PRODUCTION']) || true,
    apiUrll: process.env['API_PATH'] || "erro",
    apiUrl: '${API_PATH}'
  }