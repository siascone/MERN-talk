import React, {useState} from 'react'
import { Box, Tooltip, Button, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useHistory } from 'react-router-dom'

const SideDrawer = () => {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const { user } = ChatState()
    const history = useHistory()

    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        history.push('/')
    }

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px"
        >
            <Tooltip 
                label="Search User to chat" 
                hasArrow placement='bottom-end'
            >
                <Button variant="ghost">
                    <i className="fas fa-search" />
                    <Text
                        display={{base: "none", md: "flex"}}
                        px="4"
                    >
                        Search User
                    </Text>
                </Button>
            </Tooltip>
            <Text 
                fontSize='2xl'
                fontFamily='Work sans'
            >
                MERN-Talk
            </Text>
            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize='2xl' m={1}/>
                    </MenuButton>
                    {/* <MenuList></MenuList> */}
                </Menu>
                <Menu>
                    <MenuButton 
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                    >
                        <Avatar 
                            size='sm' 
                            cursor='pointer' 
                            name={user.name}
                            src={user.pic}
                        />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user} >
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider />
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>

        </Box>
    )
}

export default SideDrawer