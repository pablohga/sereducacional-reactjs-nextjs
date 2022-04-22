import React from 'react';

import { Heading, Flex } from '@chakra-ui/react';

import pabloImg from '../assets/pablo.jpg';

import Image from 'next/image';

const Footer = () => {
  return (
    <Flex
      padding={6}
      bg="teal.500"
      color="white"
      justifyContent="space-around"
      alig="center"
    >
      <p size="sm" letterSpacing={'lighter'} color="blue">
        <strong>
          <a href="https://github.com/pablohga">GITHUB</a> &nbsp;|&nbsp;
          <a href="mailto:pablohga@gmail.com">PABLOHGA@GMAIL.COM</a>{' '}
          &nbsp;|&nbsp;
          <a href="https://www.linkedin.com/in/pablo-herivelton-g-azevedo-2a321320/">
            LINKEDIN
          </a>
        </strong>
      </p>
    </Flex>
  );
};

export default Footer;
