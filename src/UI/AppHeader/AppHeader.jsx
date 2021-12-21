import React from 'react'
import { Flex, Heading, useTheme } from '@chakra-ui/react'


const AppHeader = () => {
  const { colors } = useTheme()

  return (
    <Flex
      as="nav"
      flex="1"
      mb={4}
      padding="1.5rem"
      bg={colors.blue[600]}
      color="while"
    >
      <Heading size="md">
        Voice <span style={{ padding: '5px', backgroundColor: colors.blackAlpha[700], borderRadius: '5px' }}>CLUB</span>
      </Heading>
    </Flex>
  )
}

export default AppHeader
