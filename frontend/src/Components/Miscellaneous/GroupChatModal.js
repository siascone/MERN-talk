import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    FormControl,
    Input,
    Box
} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'


const GroupChatModal = ({children}) => {
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const { user, chats, setChats } = ChatState()

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

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            })
            return
        }

        setSelectedUsers([...selectedUsers, userToAdd])
    }

    const handleDelete = (userToRemove) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== userToRemove._id))
    }

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top"
            })
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.post(
                '/api/chat/group', 
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map(user => user._id))
                }, 
                config
            )

            setChats([data, ...chats])
            onClose()
            toast({
                title: "New group chat created",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top"
            })

        } catch (error) {
            toast({
                title: "Failed to Create the Chat :(",
                description: error.response.data,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            })
        }
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                    >
                        <FormControl>
                            <Input
                                placeholder='Chat Name'
                                mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder='Add users eg: Jane, Spencer, Nemo'
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        
                        <Box
                         w='100%'
                         display='flex'
                         flexWrap='wrap'
                        >
                            {selectedUsers.map(user => (
                                <UserBadgeItem key={user._id} user={user} handleFunction={() => handleDelete(user)} />
                            ))}

                        </Box>

                        {loading ? <div>Loading...</div> : (searchResult.slice(0,4).map(user => (
                            <UserListItem 
                                key={user._id} 
                                user={user} 
                                handleFunction={() => handleGroup(user)}/>
                        )))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal