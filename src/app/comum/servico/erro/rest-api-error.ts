export class RestApiError {

    constructor(
        public restapierror: {
            debugMessage: string,
            message: string,
            status: string,
            subErrors: string,
            timestamp: string
        }
    ) {
    }

}

