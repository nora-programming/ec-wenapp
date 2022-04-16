import { NextPage } from 'next'
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { Common } from 'src/layout/common'
import { PurchaseHistoryType } from 'src/type/purchaseHistory'
import { useRequireSignin } from 'src/hooks/useRequireSignin'

const soldProducts: PurchaseHistoryType[] = [
  {
    product: {
      id: 1,
      title: 'Tシャツ',
      description: '洋服です',
      imgUrl: '',
      price: 1000,
    },
    sellerName: 'あんな',
  },
  {
    product: {
      id: 2,
      title: 'ワイシャツ',
      description: '洋服です',
      imgUrl: '',
      price: 1000,
    },
    sellerName: '小次郎',
  },
  {
    product: {
      id: 3,
      title: 'コート',
      description: '洋服です',
      imgUrl: '',
      price: 1000,
    },
    sellerName: 'じろう',
  },
  {
    product: {
      id: 4,
      title: 'ズボン',
      description: '洋服です',
      imgUrl: '',
      price: 1000,
    },
    sellerName: '隆二',
  },
]

const ProductPurchased: NextPage = () => {
  useRequireSignin()
  return (
    <Common>
      <Box mt="48px">
        <Text fontSize="22px" fontWeight="bold" textAlign="center" mb="24px">
          購入した商品
        </Text>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="16px">商品名</Th>
                <Th fontSize="16px">販売者</Th>
                <Th fontSize="16px" isNumeric>
                  金額
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {soldProducts.map((p) => {
                return (
                  <>
                    <Tr>
                      <Td>{p.product.title}</Td>
                      <Td>{p.sellerName}</Td>
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

export default ProductPurchased
