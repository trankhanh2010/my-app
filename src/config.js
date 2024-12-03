const config = {
    laravelAppApiUrl: process.env.REACT_APP_LARAVEL_APP_API_URL,
    apiService: {
        bed: {
            typeGetApi: 'elastic'
        },
        bedRoom: {
            typeGetApi: 'elastic'
        },
        bedType: {
            typeGetApi: 'elastic'
        },
    }
  };
  
export default config;