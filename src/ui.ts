import { createSystem } from 'frog/ui'

export const {
    Box,
    Columns,
    Column,
    Heading,
    HStack,
    Rows,
    Row,
    Spacer,
    Text,
    VStack,
    vars,
    Image,
} = createSystem({
    colors: {
        blue: '#0052FF',
        black: '#000000',
        white: '#FFFFFF'
    },
    fonts: {
        default: [
            {
                name: 'Open Sans',
                source: 'google',
                weight: 400,
            },
            {
                name: 'Open Sans',
                source: 'google',
                weight: 600,
            },
        ],
        wutang: [
            {
                name: 'Micro 5',
                source: 'google',
            },
        ],
    },
})