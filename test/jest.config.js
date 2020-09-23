//Or async function
module.exports = async () => {
    return {
        rootDir: __dirname,
        verbose: true,
        testMatch: ["<rootDir>/__**__/*.test.js"]
    };
};