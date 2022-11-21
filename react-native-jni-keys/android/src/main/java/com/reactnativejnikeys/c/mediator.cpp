
  #include <jni.h>
  #include <string>
  #include "crypto.hpp"

  std::string jstring2string(JNIEnv *env, jstring jStr)
  {
      if (!jStr)
          return "";

      const jclass stringClass = env->GetObjectClass(jStr);
      const jmethodID getBytes = env->GetMethodID(stringClass, "getBytes", "(Ljava/lang/String;)[B");
      const jbyteArray stringJbytes = (jbyteArray) env->CallObjectMethod(jStr, getBytes,
                                                                         env->NewStringUTF("UTF-8"));

      size_t length = (size_t) env->GetArrayLength(stringJbytes);
      jbyte *pBytes = env->GetByteArrayElements(stringJbytes, NULL);

      std::string ret = std::string((char *) pBytes, length);
      env->ReleaseByteArrayElements(stringJbytes, pBytes, JNI_ABORT);

      env->DeleteLocalRef(stringJbytes);
      env->DeleteLocalRef(stringClass);
      return ret;
  }

  extern "C" JNIEXPORT jstring JNICALL
  Java_com_reactnativejnikeys_CLibController_getJniJsonStringyfyData(JNIEnv * env, jobject thiz,jstring key) {
      auto *crypto = new Crypto();
      std::string _key{jstring2string(env,key)};
      return env->NewStringUTF(crypto->getJniJsonStringyfyData(_key).c_str());
  }

