<template>
  <div class="about">
    <h1>AES 테스트</h1>

    <div class="about1">
      AES 테스트를 위한 페이지 입니다.<br>
      <br>
      TypeScript (javascript) 에서 암호화하여,
      서버에서 암복호화하여 비교합니다.
      <br>

      서버는 encoding.jsp, decoding.jsp 를 이용하며,
      json 방식으로 데이터를 주고 받습니다.<br>
      <br>

      암호화 라이브러리는 타입스크립트로 구성되어 있으며,
      자바스크립트로 구현된 라이버러리를 타입스크립트 버전으로 변환하였습니다.<br>
      <br>

      자바는 표준 라이브러리를 사용합니다.<br>
      <code>
      <pre>
public String encrypt(String text, String key)
    throws UnsupportedEncodingException,
    NoSuchAlgorithmException,
    NoSuchPaddingException,
    InvalidKeyException,
    IllegalBlockSizeException,
    BadPaddingException,
    InvalidAlgorithmParameterException
{
  if (text == null || text.length() == 0) {
    return text;
  }

  String encrypted = null;
  byte[] source = text.getBytes("UTF-8");
  SecretKeySpec skeySpec =
    new SecretKeySpec(key.getBytes("UTF-8"), "AES");

  Cipher cipher = 
    Cipher.getInstance("AES/CBC/NoPadding");

  AlgorithmParameterSpec IVspec =
    new IvParameterSpec(ivBytes);
  cipher.init(Cipher.ENCRYPT_MODE, skeySpec, IVspec);

  int mod = source.length % 16;
  if (mod != 0) {
    text = String.format(
      text + "%" + (16 - mod) + "s", " ");
  }

  encrypted = byteArrayToHex(
    cipher.doFinal(text.getBytes("UTF-8")));

  return encrypted;
}
    </pre>
      </code>

    </div>
  </div>
</template>


<style scoped>
.about1 { text-align: left; }
code   { font-size:8pt; }
</style>