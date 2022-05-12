import React from 'react';

import { Heading, Flex } from '@chakra-ui/react';

import pabloImg from '../assets/pablo.jpg';

import Image from 'next/image';

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="wrap"
      padding={2}
      bg="teal.500"
      color="white"
      justifyContent="space-between"
      alignItems="center"
    >
      {' '}
      <Flex alig="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'lighter'}>
          Cadastro de Clientes
        </Heading>
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        size="sm"
        letterSpacing={'lighter'}
      >
        <Image
          height={100}
          width={100}
          style={{ borderRadius: '50px' }}
          src={pabloImg}
          alt="Pablo Azevedo"
        />
        <p>Desenvolvido por </p>
        <strong>
          <a href="https://github.com/pablohga">Pablo Azevedo</a>
        </strong>
      </Flex>
    </Flex>
  );
};

export default Header;
