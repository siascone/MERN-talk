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
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'


const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { selectedChat, setSelectedChat, user } = ChatState()
    const [groupChatName, setGroupChatName] = useState("")
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)

    const toast = useToast()

    const handleRemove = (user) => {

    }
    const handleRename = (newGroupChatName) => {
        // I AM HERE - #12 @ 44:58
    }    

    const handleSearch = (query) => {

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
                                    coloreScheme="teal"
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