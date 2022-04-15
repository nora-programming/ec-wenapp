import { useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { EmailIcon, UnlockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { Common } from 'src/layout/common'
import { SoldProductType } from 'src/type/soldProduct'

const soldProducts: SoldProductType[] = [
  {
    product: {
      id: 1,
      title: 'Tシャツ',
      description: '洋服です',
      imgUrl: '',
      price: 1000,
    },
    buyerName: 'あんな',
  },
  {
    product: {
      id: 2,
      title: 'ワイシャツ',
      description: '洋服です',
      imgUrl: '',
      price: 1000,
    },
    buyerName: '小次郎',
  },
  {
    product: {
      id: 3,
      title: 'コート',
      description: '洋服です',
      imgUrl: '',
      price: 1000,
    },
    buyerName: 'じろう',
  },
  {
    product: {
      id: 4,
      title: 'ズボン',
      description: '洋服です',
      imgUrl: '',
      price: 1000,
    },
    buyerName: '隆二',
  },
]

const Sales: NextPage = () => {
  return (
    <Common>
      <Box mt="48px">
        <Text fontSize="22px" fontWeight="bold" textAlign="center" mb="24px">
          売上
        </Text>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="16px">商品名</Th>
                <Th fontSize="16px">購入者</Th>
                <Th fontSize="16px" isNumeric>
                  売上
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {soldProducts.map((p) => {
                return (
                  <>
                    <Tr>
                      <Td>{p.product.title}</Td>
                      <Td>{p.buyerName}</Td>
                      <Td isNumeric>{p.product.price}円</Td>
                    </Tr>
                  </>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Common>
  )
}

export default Sales
