import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = () => {    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const history = useHistory()


    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setShow(!show)
    }

    const submitHandler = async () => {
        setLoading(true)

         if (!email || !password) {
            toast({
                title: "Please Fill in all the Fields",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            setLoading(false)
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            const { data } = await axios.post("/api/user/login", { email, password }, config);

            toast({
                title: "Login Successful",
                status: "success",
                duration: 3000, 
                isClosable: true,
                position: "top"
            })

            localStorage.setItem('userInfo', JSON.stringify(data))

            setLoading(false)

            history.push('/chats')
        } catch (error) {
            console.log(error)
            toast({
                title: "Error Occured :(",
                description: error.response.data.message,
                status: "error",
                duration: 3000, 
                isClosable: true,
                position: "top"
            })
            setLoading(false)
        }
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
                isLoading={loading}
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