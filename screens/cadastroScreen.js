import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
// import { usuarios, adicionarUsuario, removerUsuario } from '../backend/dados.js';
import { firebaseConfig } from '../backend/autentica.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function CadastroScreen({ navigation }) {

  // const [nome, setNome] = useState('');
  // const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function cadastrar() {
    // Aqui você pode implementar a lógica para cadastrar o usuário
    // if ((nome, cpf, email, senha) !== '') {
    //   const usuario = { id: null, nome: nome, cpf: cpf, email: email, senha: senha };
    //   adicionarUsuario(usuario);
    //   limparCampos();
    //   alert("Usuário Cadastro com sucesso!")
    //   navigation.navigate('Home');
    // } else {
    //   alert("Favor digitar todos os campos!")
    // }

    if ((email, senha) !== '') {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          limparCampos();
          alert("Usuário Cadastro com sucesso! ")
          navigation.navigate('Home');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Faha na criação do Usuário: " + errorCode + errorMessage);
        });
    } else {
      alert("Favor digitar todos os campos!")
    }
  }

  function limparCampos() {
    // setNome('');
    // setCpf('');
    setEmail('');
    setSenha('');
  }

  return (
    <View style={[styles2.container, {
      flexDirection: "column"
    }]}>
      <View style={{ flex: 1 }} >
        <Header
          leftComponent={<Button
            icon={
              <Icon
                name="arrow-left"
                size={25}
                color="white"
              />
            }
            title=""
            onPress={() => navigation.navigate('Home')}
          />}
          centerComponent={{
            text: 'Usuário',
            style: { color: '#fff', fontSize: 25, width: 300, textAlign: 'auto', flex: 1, alignItems: 'center', justifyContent: 'center' }
          }}
          centerContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        />
      </View>
      {/* <View style={styles2.container}> */}
      <View style={{ flex: 2 }} >
        {/* <TextInput
        style={styles2.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles2.input}
        placeholder="CPF"
        keyboardType="numeric"
        maxLength={11}
        value={cpf}
        onChangeText={setCpf}
      /> */}
        <TextInput
          style={styles2.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles2.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity style={styles2.button} onPress={cadastrar}>
          <Text style={styles2.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 0
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    paddingTop: 40
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1c313a',
    padding: 10,
    margin: 10,
    borderRadius: 14,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CadastroScreen;