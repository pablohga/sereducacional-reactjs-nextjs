import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Square,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { InputForm } from '../components/input';
import api from '../services/api';

export default function Home() {
  const toast = useToast();

  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clients, setClients] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null
  });

  const [isLoading, setIsLoading] = useState(false);

  const isValideFormData = () => {
    if (!name) {
      setErrors({ name: 'Precisa informar um nome' });
      return false;
    }
    if (!email) {
      setErrors({ email: 'Precisa informar um email' });
      return false;
    }
    if (!password) {
      setErrors({ password: 'Precisa informar um senha' });
      return;
    }

    if (clients.some((client) => client.email === email && client._id !== id)) {
      setErrors({ email: 'Email já cadastrado' });
      return;
    }

    setErrors({});
    return true;
  };

  const handleSubmitCreateClient = async (e) => {
    e.preventDefault();
    if (!isValideFormData()) return;

    try {
      setIsLoading(true);
      const { data } = await api.post('/clients', { name, email, password });
      setClients(clients.concat(data.data));
      setEmail('');
      setName('');
      setPassword('');
      toggleFormState();
      setIsLoading(false);
      toast({
        title: 'Cliente adicionado!',
        description: 'O novo cliente foi adicionado ao seu Banco de Dados ;)',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }

    if (!name) {
      setErrors({ name: 'Precisa informar um nome' });
      return;
    }
    if (!email) {
      setErrors({ email: 'Precisa informar um email' });
      return;
    }
    if (!password) {
      setErrors({ password: 'Precisa informar um senha' });
      return;
    }
  };

  const handleSubmitUpdateClient = async (e) => {
    e.preventDefault();

    if (!isValideFormData()) return;

    try {
      setIsLoading(true);
      await api.put(`/clients/${id}`, { name, email, password });
      setClients(
        clients.map((client) =>
          client._id === id ? { name, email, password, _id: id } : client
        )
      );
      setEmail('');
      setName('');
      setPassword('');
      setId(null);
      toggleFormState();
      setIsLoading(false);
    } catch (err) {
      console.log('err:', err);
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (_id) => {
    try {
      await api.delete(`/clients/${_id}`);
      setClients(clients.filter((client) => client._id != _id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeName = (text) => {
    setName(text);
  };

  const handleChangeEmail = (text) => {
    setEmail(text);
  };

  const handleChangeSenha = (text) => {
    setPassword(text);
  };

  const handleShowUpdateClientForm = (client) => {
    setId(client._id);
    setName(client.name);
    setEmail(client.email);
    setPassword(client.password);
    toggleFormState(true);
  };

  const toggleFormState = () => {
    setIsFormOpen(!isFormOpen);
  };
  useEffect(() => {
    api.get('/clients').then(({ data }) => {
      setClients(data.data);
    });
  }, []);

  return (
    <Box mx={'auto'}>
      <Header />

      <Flex color="white" justifyContent="space-between" margin="4">
        <Text color="black" fontSize="2xl">
          Lista de Clientes
        </Text>
        <Button colorScheme="blue" onClick={toggleFormState}>
          {isFormOpen ? '-' : '+NOVO'}
        </Button>
      </Flex>
      {isFormOpen && (
        <VStack
          marginY="1rem"
          as="form"
          onSubmit={id ? handleSubmitUpdateClient : handleSubmitCreateClient}
        >
          <InputForm
            label="Nome"
            name="Nome"
            value={name}
            onChange={(e) => handleChangeName(e.target.value)}
            error={errors.name}
          />

          <InputForm
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => handleChangeEmail(e.target.value)}
            error={errors.email}
          />
          <InputForm
            type="password"
            label="Senha"
            name="senha"
            value={password}
            onChange={(e) => handleChangeSenha(e.target.value)}
            error={errors.password}
          />
          <Button
            fontSize="sm"
            alignSelf="flex-end"
            type="submit"
            colorScheme="green"
            isLoading={isLoading}
          >
            {id ? 'ATUALIZAR' : 'CADASTRAR'}
          </Button>
        </VStack>
      )}

      <Table variant="simple" my="10">
        <Thead bgColor="blue.500">
          <Tr>
            <Th textColor="white">Name</Th>
            <Th textColor="white">Email</Th>
            <Th textColor="white">Senha</Th>
            <Th textColor="white">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map((client) => (
            <Tr key={client.email}>
              <Th>{client.name}</Th>
              <Td>{client.email}</Td>
              <Td>{client.password}</Td>
              <Th>
                {/* <Flex justifyContent="space-between"> */}
                <Flex>
                  <Button
                    size="sm"
                    fontSize="smaller"
                    colorScheme="yellow"
                    mr="2"
                    onClick={() => handleShowUpdateClientForm(client)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    fontSize="smaller"
                    colorScheme="red"
                    onClick={() => handleDeleteClient(client._id)}
                  >
                    Excluir
                  </Button>
                </Flex>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Footer />
    </Box>
  );
}
