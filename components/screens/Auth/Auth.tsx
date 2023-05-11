import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC, useEffect, useState } from "react";
import Field from "../../ui/Field";
import Button from "../../ui/Button";
import { useAuth } from "../../../providers/AuthProvider";
import { IAuthRequest } from "../../../Interfaces/Auth";
import Loader from "../../ui/Loader";

const Auth: FC = () => {
  const { isLoading, login, error, clearError } = useAuth();

  // const navigation = useNavigation();

  const [data, setData] = useState<IAuthRequest>({
    login: "",
    password: "",
  });

  const loginHandler = () => {
    clearError();
    login(data);
  };

  useEffect(() => {
    clearError();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 100, fontSize: 20, color: "white" }}>
        MusicStreamingService
      </Text>
      <View style={styles.content}>
        {/* <Text style={styles.text}>Войти</Text> */}
        <Field
          onChange={(value) => {
            setData({ ...data, login: value });
          }}
          value={data.login}
          placeholder="Login"
          style={styles.input}
        />
        <Field
          onChange={(value) => {
            setData({ ...data, password: value });
          }}
          value={data.password}
          placeholder="Password"
          isSecure={true}
          style={styles.input}
        />
        {/* {error && <Error style={{ marginTop: 10 }} text={error} />} */}
        <Button
          style={{ marginTop: 10 }}
          disabled={isLoading}
          title="Войти"
          onPress={loginHandler}
        />
      </View>

      <TouchableOpacity
        style={{ width: "80%" }}
        //   onPress={() => navigation.navigate('Registration')}
      >
        <Text style={styles.bottomText}>Зарегистрироваться</Text>
      </TouchableOpacity>
      {isLoading && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.93,
  },
  content: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
  },
  bottomText: {
    color: "white",
    marginTop: 10,
    textAlign: "right",
    opacity: 0.5,
    fontSize: 15,
  },
  input: {
    marginTop: 10,
  },
});

export default Auth;
