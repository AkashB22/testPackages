const cryptoJs = require('crypto-js');

function encrypt(data) {
    const key = cryptoJs.enc.Base64.parse('zycus@2020!'),
        iv = cryptoJs.enc.Base64.parse("-5f0cf48fcfae2bb"),
        ciphertext = cryptoJs.AES.encrypt(data, key, { iv: iv });

    let encryoted = ciphertext.toString()
    return (encryoted.replace(/\//g, "@"));
}

function decrypt(data) {
    data = data.replace(/@/g, "\/")
    const key = cryptoJs.enc.Base64.parse('zycus@2020!'),
        iv = cryptoJs.enc.Base64.parse("-5f0cf48fcfae2bb"),
        bytes = cryptoJs.AES.decrypt(data, key, { iv: iv });

    return bytes.toString(cryptoJs.enc.Utf8);
}

console.log(encrypt("SHT/925e083c-99f3-40e7-908e-26549be45368/sht/1611740749051_1(22)-Copy.jpg"));
// console.log(decrypt("hgqPQup864sdbAsANwYSJ7K5sTQrTlyvXxtm1fHufV3f+XRl9eZz91e4yG0pgQn@@tjodjGrl8ItrGfF1axmhg=="));