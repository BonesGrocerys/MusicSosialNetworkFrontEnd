import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { FC, useEffect, useState } from "react";
import Field from "../../ui/Field";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../providers/AuthProvider";

import Button from "../../ui/Button";
import { IRegistrationRequest } from "../../../Interfaces/Auth";
import Loader from "../../ui/Loader";

const Registration: FC = () => {
  const { register, isLoading, error, setError, clearError } = useAuth();

  const navigation = useNavigation();

  const [data, setData] = useState<IRegistrationRequest>(
    {} as IRegistrationRequest
  );

  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordConfirm = (): boolean => data.password === confirmPassword;

  const registerHandler = async () => {
    clearError();

    if (!isPasswordConfirm()) {
      setError("Пароли не совпадают");
      return;
    }

    if (await register(data)) navigation.navigate("Auth");
  };

  useEffect(() => {
    clearError();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Регистрация</Text>
        <Field
          onChange={(value) => {
            setData({ ...data, login: value });
          }}
          value={data.login}
          placeholder="Логин"
          style={styles.input}
        />
        <Field
          onChange={(value) => {
            setData({ ...data, name: value });
          }}
          value={data.name}
          placeholder="Имя"
          style={styles.input}
        />

        <Field
          onChange={(value) => {
            setData({ ...data, password: value });
          }}
          value={data.password}
          placeholder="Пароль"
          style={styles.input}
          isSecure={true}
        />
        <Field
          onChange={(value) => {
            setConfirmPassword(value);
          }}
          value={confirmPassword}
          placeholder="Повторите пароль"
          style={styles.input}
          isSecure={true}
        />
        {error && <Text style={{ height: 20, color: "red" }}>{error} </Text>}
        <Button
          style={{ marginTop: 10 }}
          disabled={isLoading}
          title="Зарегистрироваться"
          onPress={registerHandler}
        />
        {isLoading && <Loader />}
      </View>

      <TouchableOpacity
        style={{ width: "80%" }}
        onPress={() => navigation.navigate("Auth")}
      >
        <Text style={styles.bottomText}>Войти</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
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

export default Registration;
