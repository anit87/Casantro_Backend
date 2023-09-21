function generateOTP() {
    return new Promise((resolve, reject) => {
        const otpLength = 6;
        const randomNum = Math.floor(Math.random() * Math.pow(10, otpLength)).toString();
        const otp = randomNum.padStart(otpLength, '0');
        if (otp.length === otpLength) {
            resolve(otp);
        } else {
            reject(new Error('OTP generation failed'));
        }
    });
}

module.exports = { generateOTP }