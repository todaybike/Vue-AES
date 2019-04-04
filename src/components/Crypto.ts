//
// HCrypto.ts
// 2019.4.2
//
// with AES.ts
//
import * as aesjs from '@/components/Aes';

export default class Crypto {

    private key: string = 'abcdefghijklmnopqrstuvxyz0123456'; // 32byte

    // The initialization vector (must be 16 bytes)
    private iv: number[] = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ];


    public encrypt( text: string ): string {
        // Convert text to bytes (text must be a multiple of 16 bytes)
        // let textBytes = aesjs.utils.utf8.toBytes(text);
        let textBytes = aesjs.ConvertUtf8.toBytes(text);

        const mod = textBytes.length % 16;
        if ( mod % 16 !== 0 ) {
            text += ''.padStart(16 - mod);
            textBytes = aesjs.ConvertUtf8.toBytes(text);
        }

        const aesCbc = new aesjs.ModeOfOperationCBC(
            aesjs.ConvertUtf8.toBytes(this.key), this.iv);

        const encryptedBytes = aesCbc.encrypt(textBytes);

        // To print or store the binary data, you may convert it to hex
        const encryptedHex = aesjs.ConvertHex.fromBytes(encryptedBytes);

        return encryptedHex;
    }

    public decrypt( text: string ): string {
        const encryptedBytes = aesjs.ConvertHex.toBytes( text );

        // The cipher-block chaining mode of operation maintains internal
        // state, so to decrypt a new instance must be instantiated.
        const aesCbc = new aesjs.ModeOfOperationCBC(aesjs.ConvertUtf8.toBytes(this.key), this.iv);
        const decryptedBytes = aesCbc.decrypt(encryptedBytes);

        // Convert our bytes back into text
        const decryptedText = aesjs.ConvertUtf8.fromBytes(decryptedBytes).trim();

        return decryptedText;
    }

} // end of class
