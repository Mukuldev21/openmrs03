// Interface for login credentials
export interface LoginCredentials {
    username: string;
    password: string;
}

export const LoginDetails = {
    validUser: {
        username: process.env.OPENMRS03_USERNAME || 'admin',
        password: process.env.OPENMRS03_PASSWORD || 'Admin123'
    },
    invalidUser: {
        username: 'invaliduser',
        password: 'wrongpassword'
    },
    emptyUser: {
        username: '',
        password: ''
    },
    emptyUsername: {
        username: '',
        password: 'Admin123'
    },
    emptyPassword: {
        username: 'admin',
        password: ''
    },
    specialCharsUser: {
        username: 'admin@#$%',
        password: 'Admin123'
    },
    sqlInjectionUser: {
        username: "admin' OR '1'='1",
        password: "' OR '1'='1"
    },
    xssUser: {
        username: "<script>alert('XSS')</script>",
        password: 'Admin123'
    },
    longUsername: {
        username: 'a'.repeat(500),
        password: 'Admin123'
    },
    uppercaseUser: {
        username: 'ADMIN',
        password: 'Admin123'
    }
};
