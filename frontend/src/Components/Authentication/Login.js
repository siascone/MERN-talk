import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [show, setShow] = useState(false)


    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setShow(!show)
    }

    const submitHandler = () => {
        
    }

    return (
        <VStack spacing="5px">

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                    value={email}
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input 
                        value={password}
                        type={show ? "text" : "Password"}
                        placeholder='Enter your Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme='red'
                width="100%"
                onClick={() => {
                    setEmail('guest@example.com');
                    setPassword('password')
                }}
            >
                Get Guest user Credentials
            </Button>
        </VStack>
    )
}

export default Login