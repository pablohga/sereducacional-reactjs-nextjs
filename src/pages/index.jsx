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
  useToast,
  Stack,
  Heading
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { InputForm } from '../components/input';
import api from '../services/api';

export default function Home() {
  const toast = useToast();
  const [id, setId] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clients, setClients] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null
  });
  const router = useRouter();
  const isValideFormData = () => {
    if (!email) {
      setErrors({ email: 'Precisa informar um email' });
      return false;
    }
    if (!password) {
      setErrors({ password: 'Precisa informar um senha' });
      return;
    }

    if (
      clients.some(
        (client) => client.email === email && client.password === password
      )
    ) {
      console.log('fez login');
      router.replace('/dashboard');
    } else {
      console.log('nao fez login');
      setErrors({ email: 'E-mail ou senha incorretos' });
      toast({
        title: 'Login ou Senha incorretos!',
        description: 'Solicite a criação de usuário ao Administrador',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }

    setErrors({});
    return true;
  };

  const handleLogiin = async (e) => {
    e.preventDefault();

    if (!isValideFormData()) return;

    try {
      await api.get(`/users/${id}`, { email, password });
      setClients(
        clients.map((client) =>
          client._id === id ? { email, password, _id: id } : client
        )
      );
      setEmail('');
      setPassword('');
      setId(null);
    } catch (err) {
      console.log('err:', err);
    }
  };

  const handleChangeEmail = (text) => {
    setEmail(text);
  };

  const handleChangeSenha = (text) => {
    setPassword(text);
  };

  useEffect(() => {
    api.get('/clients').then(({ data }) => {
      setClients(data.data);
    });
  }, []);

  return (
    <Box>
      <Header />
      <Flex
        minH={'50vh'}
        align={'center'}
        justify={'center'}
        /* bg={useColorModeValue('gray.50', 'gray.800')} */
        as="form"
        onSubmit={handleLogiin}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Acesse sua conta</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            /*  bg={useColorModeValue('white', 'gray.700')} */
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleChangeEmail(e.target.value)}
                  error={errors.email}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  label="Senha"
                  name="senha"
                  value={password}
                  onChange={(e) => handleChangeSenha(e.target.value)}
                  error={errors.password}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                ></Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500'
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Footer />
    </Box>
  );
}
