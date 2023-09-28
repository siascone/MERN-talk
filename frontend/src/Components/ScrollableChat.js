import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameUser, isSameSenderMargin } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'
import { Avatar, Tooltip } from '@chakra-ui/react'

const ScrollableChat = ({ messages }) => {
    const {user} = ChatState()

  return (
    <ScrollableFeed>
        {messages && messages.map((message, idx) => (
            <div style={{display: 'flex'}} key={message._id}>
                {(isSameSender(messages, message, idx, user._id)||
                  isLastMessage(messages, idx, user._id)) && (
                    <Tooltip
                        label={message.sender.name}
                        placement='bottom-start'
                        hasArrow
                    >
                        <Avatar 
                            mt='7px'
                            mr={1}
                            size='sm'
                            cursor='pointer'
                            name={message.sender.name}
                            src={message.sender.pic}
                        />
                    </Tooltip>
                )}
                <span 
                    style={{
                        backgroundColor: `${ message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                        marginLeft: isSameSenderMargin(messages, message, idx, user._id),
                        marginTop: isSameUser(messages, message, idx, user._id) ? 3 : 10,
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%"
                    }}
                >
                    {console.log(isSameSenderMargin(messages, message, idx, user._id))}
                    {message.content}
                </span>
            </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat