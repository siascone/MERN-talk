import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [pic, setPic] = useState()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const history = useHistory()



    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setShow(!show)
    }

    const postDetails = (pics) => {
        setLoading(true)

        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            })
            return;
        }

        // console.log(pics)

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData()
            data.append("file", pics)
            data.append("upload_preset", "MERN-talk")
            data.append("cloud_name", "dytpmvtkf")

            fetch("https://api.cloudinary.com/v1_1/dytpmvtkf/image/upload", {
                method: 'POST',
                body: data
            })
            .then(res => res.json())
            .then((data) => {
                setPic(data.url.toString())
                // console.log(data.url.toString())
                setLoading(false)
            })
            .catch (err => {
                console.log(err)
                setLoading(false)
            })
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            })
            setLoading(false)
            return;
        }
    }

    const submitHandler = async () => {
        setLoading(true)

         if (!name || !email || !password || !confirmPassword) {
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

        if (password !== confirmPassword) {
            toast({
                title: "Passwords Do Not Match",
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

            const { data } = await axios.post("/api/user", { name, email, password, pic }, config);

            toast({
                title: "Registration Successful",
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
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                    placeholder='Enter your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input 
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
            <FormControl id='password' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input 
                        type={show ? "text" : "Password"}
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic'>
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])} 
                />
            </FormControl>
            <Button
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup