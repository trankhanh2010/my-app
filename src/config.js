const config = {
    laravelAppApiUrl: process.env.REACT_APP_LARAVEL_APP_API_URL,
    tokenAppApiUrl: process.env.REACT_APP_TOKEN_APP_API_URL,

    apiService: {
        // category
        bed: {typeGetApi: 'elastic'},
        bedRoom: {typeGetApi: 'elastic'},
        bedType: {typeGetApi: 'elastic'},
        transactionType: {typeGetApi: 'elastic'},

        // data
        testServiceReqListVView: {typeGetApi: 'db'},
        testServiceTypeListVView: {typeGetApi: 'db'},
        treatmentFeeDetailVView: {typeGetApi: 'db'},
    }
  };
  
export default config;