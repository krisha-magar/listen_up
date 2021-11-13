const {checkSchema} =  require ("express-validator");

const loginVerification = checkSchema({
    email: {
        isLength: {
            options: {min: 1, max: 255},
            errorMessage:"Email is required",
        },
        isEmail: {
            errorMessage: "Invalid email",
        },
        trim: true,
    },
    password: {
        isLength:{
            options: { min: 6, ma: 100},
            errorMessage: "Password is required and must be of minimum length of 6 characters"
        },
        trim: true,
    },
});

module.exports = loginVerification