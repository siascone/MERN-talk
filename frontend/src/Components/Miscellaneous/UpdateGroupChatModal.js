import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Button,
    useToast,
    Box,
    FormControl,
    Input,
    Spinner,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { selectedChat, setSelectedChat, user } = ChatState()
    const [groupChatName, setGroupChatName] = useState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)

    const toast = useToast()

    const handleAddUser = async (userToAdd) => {
        if (selectedChat.users.find((user) => user._id === userToAdd._id)) {
            toast({
                title: "User already in group!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            })
            return
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only admins can add someone!",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.put(
                "/api/chat/groupadd", 
                {
                    chatId: selectedChat._id,
                    userId: userToAdd._id
                },
                config
            );

            setSelectedChat(data)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            })
            setRenameLoading(false)
        }
    }

    const handleRemove = async (userToRemove) => {
        if (selectedChat.groupAdmin._id !== user._id && userToRemove._id !== user._id) {
            toast({
                title: "Only admins can remove someone!!",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            })
            return
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.put(
                "/api/chat/groupremove",
                {
                    chatId: selectedChat._id,
                    userId: userToRemove._id
                },
                config
            );

            userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data)

            setFetchAgain(!fetchAgain)
            fetchMessages()
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            })
            setRenameLoading(false)
        }
    }


    const handleRename = async () => {
        if (!groupChatName) return 

        try {
            setRenameLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const {data} = await axios.put(
                "/api/chat/rename", 
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName
                }, 
                config
            );

            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            })
            setRenameLoading(false)
        }

        setGroupChatName("")
    }    

    const handleSearch = async (query) => {
        setSearch(query)

        if (!query) {
            return
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.get(`/api/user?search=${search}`, config)

            setLoading(false)
            // console.log(data)
            setSearchResult(data)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-left"
            })
        }
    }

    return (
        <>
            <IconButton 
                onClick={onOpen}
                display={{base: 'flex'}} 
                icon={<ViewIcon />}   
            />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        {selectedChat.chatName}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            w="100%"
                            display="flex"
                            flexWrap="wrap"
                            pb={3}
                        >
                            {selectedChat.users.map(user => (
                                <UserBadgeItem 
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleRemove(user)}
                                />
                            ))}
                        </Box>
                        <FormControl display="flex">
                                <Input 
                                    placeholder='Chat Name'
                                    mb={3}
                                    value={groupChatName}
                                    onChange={(e) => setGroupChatName(e.target.value)}
                                />
                                <Button 
                                    variant="solid"
                                    colorScheme="teal"
                                    ml={1}
                                    isLoading={renameLoading}
                                    onClick={handleRename}
                                >
                                    Update
                                </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder='Add users to group'
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {loading ? (
                            <Spinner size="lg" />
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem 
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red'  onClick={() => handleRemove(user)}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal