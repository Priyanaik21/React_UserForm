// 'use client'

// import { createRecipeContext } from '@chakra-ui/react'

// const { withContext } = createRecipeContext({ key: 'button' })

// // Replace "a" with your framework's link component
// export const LinkButton = withContext('a')
'use client'

import { Button } from '@chakra-ui/react'

// Use the Button component directly instead of LinkButton
export const LinkButton = (props) => <Button as="a" {...props} />
