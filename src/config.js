const config = {
    laravelAppApiUrl: process.env.REACT_APP_LARAVEL_APP_API_URL,
    tokenAppApiUrl: process.env.REACT_APP_TOKEN_APP_API_URL,

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