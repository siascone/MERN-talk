import React from 'react'
import { useDisclosure, IconButton, Button, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

const ProfileModal = ({user, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <>
            {children ? (
            <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton 
                    display={{base: 'flex'}}
                    icon={<ViewIcon />}
                    onClick={onOpen}
                />
            )} 

            <Modal size='lg' isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent h='410px'>
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="Work sans"
                        display='flex'
                        justifyContent="center"
                    >
                        {user.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody 
                        display='flex'
                        flexDir='column'
                        alignItems='center'
                        justifyContent='space-evenly'
                    >
                        <Image 
                            borderRadius='full'
                            boxSize='150px'
                            src={user.pic}
                            alt={user.name}
                        />
                        <Text
                            fontSize='2xl'
                            fontFamily="Work sans"
                            p='10px'
                        >
                            Email: {user.email}

                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal